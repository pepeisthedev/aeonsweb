import {NextApiRequest, NextApiResponse} from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    try {

        const metadataDir = path.join(process.cwd(), 'public', 'metadata');

        fs.readdir(metadataDir, (err, files) => {
            if (err) {
                return res.status(500).json({error: 'Unable to read metadata directory'});
            }

            const metadataObj: Record<string, any> = {};
            files
                .filter(file => path.extname(file) === '.json')
                .forEach((file) => {
                    const filePath = path.join(metadataDir, file);
                    const content = fs.readFileSync(filePath, 'utf-8');
                    const jsonContent = JSON.parse(content);
                    metadataObj[jsonContent.name] = jsonContent;
                });

            res.status(200).json(metadataObj);


        });
    } catch (e) {
        res.status(500).json({error: 'Unable to read metadata'});
    }
}
