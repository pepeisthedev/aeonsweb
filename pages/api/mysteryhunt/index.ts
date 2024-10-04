import crypto from 'crypto';
import {NextApiRequest, NextApiResponse} from "next";

const secretPhrase = "Aeons sold his soul to AgoodDoctor";
const encryptionKey = crypto.createHash('sha256').update('KLSsdLKJS').digest().slice(0, 16); // 16 bytes key
const iv = crypto.randomBytes(16); // 16 bytes IV

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { providedSecret, twitterProfile } = req.body;

    if (!providedSecret) {
        return res.status(404).json({ error: 'Mystery word required' });
    }

    if (providedSecret.toLowerCase() === secretPhrase.toLowerCase()) {
        const encryptedTwitterProfile = encrypt(twitterProfile);
        let twitterLink =
            "https://twitter.com/intent/tweet?text=I%20completed%20the%20Aeons%20x%20Experiment9%20Mystery%20hunt%20%40AeonsBTC%20%40AGoodDoctorBTC%0A%0A%23AeonsxExp9Mystery%0A%0Aproof%20%0A" +
            encryptedTwitterProfile
        res.status(200).json({ postLink: twitterLink});
    } else {
        res.status(404).json({ error: 'Mystery word incorrect' });
    }
}

function encrypt(text: string): string {
    const cipher = crypto.createCipheriv('aes-128-cbc', encryptionKey, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
}


