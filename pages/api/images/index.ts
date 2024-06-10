import fs from 'fs';
import path from 'path';
import type {NextApiRequest, NextApiResponse} from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const imagesDirectory = path.join(process.cwd(), 'public', 'gallery');
        const filenames = fs.readdirSync(imagesDirectory);
        const imageExtensions = ['.webp', '.jpg', '.png', '.jpeg'];
        const images = filenames.filter(name => imageExtensions.some(ext => name.endsWith(ext))).map(name => `/gallery/${name}`);
        res.status(200).json(images);
    }
    catch (e) {
        res.status(500).json({error: 'Unable to read images'});
    }

}
