import {NextApiRequest, NextApiResponse} from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    try {

        const traitsFilePath = path.join(process.cwd(), 'public', 'availableTraits.json');

        fs.readFile(traitsFilePath, 'utf-8', (err, data) => {
            if (err) {
                res.status(500).json({error: 'Unable to read traits file'});
                return;
            }

            res.status(200).json(JSON.parse(data));
        });
    } catch (e) {
        res.status(500).json({error: 'Unable to read traits'});
    }
}
