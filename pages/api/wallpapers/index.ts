import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    // Define the path to the wallpapers folder in the public directory
    const wallpapersDirectory = path.join(process.cwd(), 'public', 'wallpapers');

    // Read the files in the wallpapers directory
    fs.readdir(wallpapersDirectory, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to fetch images' });
        }

      //  console.log('Files:', files);
        // Filter only image files based on extensions (jpg, png, jpeg, svg)
        const images = files.filter((file) => /\.(jpg|jpeg|png|svg|webp)$/.test(file));

        // Return the image filenames
        res.status(200).json({ images });
    });
}


