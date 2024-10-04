import { NextApiRequest, NextApiResponse } from 'next';
import { AuthUtil } from '../utils/AuthUtil';
import { UserdataBase } from '../utils/userdatabase'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const user = AuthUtil.validateJWT(req);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        
        let existingUser = await UserdataBase.readUser(user.id);

        return res.status(200).json(existingUser);
    } catch (err) {
        console.error('Error fetching user:', err);
        return res.status(500).json({ message: 'Unexpected error' });
    }
}
