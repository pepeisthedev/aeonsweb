import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import type { NextApiRequest, NextApiResponse } from 'next';

interface CsvRow {
    'Discord ID': string;
    VIP: string;
    FCFS: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { address } = req.body;

    // Check if address is empty
    if (!address) {
        return res.status(404).json({ error: 'Wallet address is required' });
    }

    const results: CsvRow[] = [];

    fs.createReadStream(path.join(process.cwd(), 'data', 'whitelist.csv'))
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            const VIPRecord = results.find((r) => r.VIP === address);
            const FCFSRecord = results.find((r) => r.FCFS === address);

            if (VIPRecord || FCFSRecord) {
                let VIP = '0';
                let FCFS = '0';

                if (VIPRecord) {
                    VIP = '1';
                    FCFS = '1';
                } else if (FCFSRecord) {
                    FCFS = '1';
                }

                res.status(200).json({ VIP, FCFS });
            } else {
                res.status(404).json({ error: 'Wallet not found' });
            }
        });
}