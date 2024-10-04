// utils/AuthUtil.ts
import jwt from 'jsonwebtoken';
import { NextApiRequest } from 'next';
import cookie from 'cookie';

const SECRET_KEY = process.env.JWT_SECRET;

export interface UserPayload {
  username: string;
  id: string;
  discriminator: string;
  roles: string[];
}

export class AuthUtil {
  // Method to validate the JWT and return the decoded user data
  static validateJWT(req: NextApiRequest): UserPayload | null {
    try {
      if (!SECRET_KEY) {
        console.error('No JWT secret key set in environment variables.');
        return null;
      }

      // Parse cookies from the request headers
      const { auth_token } = cookie.parse(req.headers.cookie || '');

      if (!auth_token) {
        console.error('No auth token found in request cookies.');
        return null;
      }

      // Verify the JWT token using the secret key
      const decoded = jwt.verify(auth_token, SECRET_KEY) as UserPayload;

      return typeof decoded === 'object' ? decoded : null;
    } catch (err) {
      console.error('JWT validation error:', err);
      return null;
    }
  }
}
