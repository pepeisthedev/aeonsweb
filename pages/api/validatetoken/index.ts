import { NextApiRequest, NextApiResponse } from 'next';
import { AuthUtil } from '../utils/AuthUtil';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const user = AuthUtil.validateJWT(req);
    if (!user) {
      return res.status(401).json({ isAuthenticated: false, message: 'Unauthorized access. Invalid or missing token.' });
    }

    // If the token is valid, return the user's data
    return res.status(200).json({
      isAuthenticated: true,
      user: {
        username: user.username,
        discriminator: user.discriminator,
        roles: user.roles,
      },
    });
  } catch (err) {
    console.error('JWT validation error:', err);
    return res.status(401).json({ isAuthenticated: false, message: 'Invalid token' });
  }
}
