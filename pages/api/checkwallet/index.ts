import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import type { NextApiRequest, NextApiResponse } from 'next';

interface CsvRow {
    VIP: string;
    FCFS: string;
}

let VIPs: Record<string, CsvRow> = {};
let FCFSs: Record<string, CsvRow> = {};

const readCSV = new Promise<void>((resolve, reject) => {
    fs.createReadStream(path.join(process.cwd(), 'data', 'whitelist.csv'))
        .pipe(csv())
        .on('data', (data: CsvRow) => {
            if (data.VIP) {
                VIPs[data.VIP] = data;
            }
            if (data.FCFS) {
                FCFSs[data.FCFS] = data;
            }
        })
        .on('end', resolve)
        .on('error', reject);
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await readCSV;

    const { address } = req.body;

    // Check if address is empty
    if (!address) {
        return res.status(404).json({ error: 'Wallet address is required' });
    }

    let VIP = '0';
    let FCFS = '0';

    if (VIPs[address]) {
        VIP = '1';
        FCFS = '1';
    } else if (FCFSs[address]) {
        FCFS = '1';
    }

    if (VIP === '1' || FCFS === '1') {
        res.status(200).json({ VIP, FCFS });
    } else {
        res.status(404).json({ error: 'Wallet not found' });
    }
}