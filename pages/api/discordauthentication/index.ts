import {NextApiRequest, NextApiResponse} from 'next';
import jwt from 'jsonwebtoken'; // Import JWT library
import {serialize} from 'cookie'; // To set cookies
import {UserdataBase} from "@/pages/api/utils/userdatabase";
import {User} from "@/pages/api/interfaces/User";

const SECRET_KEY = process.env.JWT_SECRET; // Secret key for JWT

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {code} = req.body;

    const CLIENT_ID = process.env.DISCORD_CLIENT_ID!;
    const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET!;
    const REDIRECT_URI = process.env.DISCORD_REDIRECT_URI!;
    const GUILD_ID = process.env.DISCORD_GUILD_ID!;

    if (!SECRET_KEY)
        return res.status(401).json({error: 'NO SECRET SET'});

    try {
        // Step 1: Exchange code for access token
        const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
        const tokenResponse = await fetch('https://discord.com/api/v10/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${credentials}`,
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: REDIRECT_URI,
            }),
        });

        const tokenData = await tokenResponse.json();
        console.log("TOKEN DATA: " + tokenData)
        const {access_token} = tokenData;

        // Step 2: Get Discord user information
        const userResponse = await fetch('https://discord.com/api/users/@me', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        if (!userResponse.ok) {
            const errorBody = await userResponse.text(); // Read the response body
            throw new Error(`Failed to fetch Discord user information: ${errorBody}`);
        }

        const userData = await userResponse.json();

        // Step 3: Get user’s roles in the specific guild (server)
        const memberResponse = await fetch(`https://discord.com/api/users/@me/guilds/${GUILD_ID}/member`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        const memberData = await memberResponse.json();

        let existingUser = await UserdataBase.readUser(userData.id); //We read by id which is discord_id in db
        console.log("EXISTING USER DISCORD ID: " + existingUser?.discord_id)
        console.log("DISCORD ID FROM DISCORD API: " + userData.discord_id)

        if (existingUser == null) {

            const newUser: User = {
                username: userData.username,     // Set `username`
                discord_id: userData.id,         // Set `discord_id`
                roles: memberData.roles,         // Set `roles` array
                available_votes: 3,              // Set `available_votes`
                used_votes: 0,                   // Set `used_votes`
                voted_on: [],               // Set `voted_on` array
                aeons_holder: true
            };

            console.log("NEW USER: " + newUser)

            let success = await UserdataBase.insertUser(
                newUser
            );

            if(!success){
                console.error('Failed to create new user: ', JSON.stringify(newUser));
                res.status(500).json({error: 'Failed to insert user'});
            }
                
        }

        // Generate a JWT containing the user data and roles
        const tokenPayload = {
            id: userData.id,
            username: userData.username,
            roles: memberData.roles,
        };

        const jwtToken = jwt.sign(tokenPayload, SECRET_KEY, {expiresIn: '5d'}); // Generate JWT with 1 hour expiration

        // Set JWT in HTTP-only cookie
        res.setHeader('Set-Cookie', serialize('auth_token', jwtToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 5 * 24 * 60 * 60, // 5 days
            //   maxAge: 3600, // 1 hou
        }));

        // Send the response with the user data
        res.status(200).json({
            username: userData.username,
            roles: memberData.roles,
        });
    } catch (error) {
        console.error('Error during Discord OAuth2:', error);
        res.status(500).json({error: 'Authentication failed'});
    }
}
