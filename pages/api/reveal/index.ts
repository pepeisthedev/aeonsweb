import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

const startTime = new Date('2024-07-10T08:17:20Z');
const revealIntervalMinutes = 1; // Change this value to 1, 8, or any other interval
const imagesToReturn = 3;
let traitsList: string[];


const initializeData = new Promise<void>((resolve, reject) => {
    try {
            getImageTraits();
            resolve();
    } catch (error) {
        reject(error);
    }
});


// Function to get the time until the next reveal
function getTimeUntilNextReveal() {
    const now = new Date();
    if (now < startTime) {
        // If the current time is before the start time, return the difference in seconds
        return (startTime.getTime() - now.getTime()) / 1000;
    } else {
        const diffInMinutes = (now.getTime() - startTime.getTime()) / 60000;
        const timeUntilNextReveal = revealIntervalMinutes - (diffInMinutes % revealIntervalMinutes);
        return timeUntilNextReveal * 60; // Return time in seconds
    }
}

function getImageTraits() {
    const metadataDir = path.join(process.cwd(), 'public/metadata/nft');
    traitsList = fs.readdirSync(metadataDir)
        .filter(file => path.extname(file) === '.html')
        .sort((a, b) => {
            // Extract the numeric part of the file name, convert to number, and compare
            const numA = parseInt(a.split('.')[0], 10);
            const numB = parseInt(b.split('.')[0], 10);
            return numA - numB;
        });
}

function extractDataFromHtml(fileName: string) {
    const filePath = path.join(process.cwd(), 'public/metadata/nft', fileName);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const tMatch = fileContent.match(/t=([-\d,]+)/);
    const oMatch = fileContent.match(/o=([-\d,]+)/);
    const uMatch = fileContent.match(/u=(\d+)/);

    const t = tMatch ? tMatch[1].split(',').map(Number) : [];
    const o = oMatch ? oMatch[1].split(',').map(Number) : [0, 1, 2, 3, 4, 5, 6];
    const u = uMatch ? parseInt(uMatch[1], 10) : -1;

    if (t.length > 0) {
        while (t.length < 7) {
            t.push(-1);
        }
     }

    return { t, o, u };
}

// Function to calculate the images to reveal based on elapsed time
function calculateTraitsToReveal(images: string[]) {
    const now = new Date();
    if (now < startTime) {
        return [];
    }

    const diffInMinutes = (now.getTime() - startTime.getTime()) / 60000;
    const imagesToRevealCount = Math.min(Math.floor(diffInMinutes / revealIntervalMinutes) + 1, images.length);
    const startIndex = Math.max(0, imagesToRevealCount - imagesToReturn);

    return images.slice(startIndex, imagesToRevealCount);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await initializeData;
    } catch (error) {
        console.error('Error during initialization:', error);
        res.status(500).json({ error: 'Server is not ready yet' });
        return;
    }

    const revealedTraits = calculateTraitsToReveal(traitsList);
    const extractedData = revealedTraits.map(fileName => {
        return { fileName, ...extractDataFromHtml(fileName) };
    });

    const timeUntilNextReveal = getTimeUntilNextReveal();

    res.status(200).json({ timeUntilNextReveal, traits: extractedData });
}