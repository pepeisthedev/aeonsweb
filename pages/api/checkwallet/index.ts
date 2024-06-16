import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import type { NextApiRequest, NextApiResponse } from 'next';

interface CsvRow {
    'Discord ID': string;
    Address: string;
    VIP: string;
    FCFS: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { address } = req.body;
    const results: CsvRow[] = [];

    fs.createReadStream(path.join(process.cwd(), 'data', 'whitelist.csv'))
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            const record = results.find((r) => r.Address === address);
            if (record) {
                const VIP = record.VIP === '1' ? '1' : '0';
                const FCFS = VIP === '1' ? '1' : record.FCFS === '1' ? '1' : '0';
                res.status(200).json({ VIP, FCFS });
            } else {
                res.status(404).json({ error: 'Address not found' });
            }
        });
}