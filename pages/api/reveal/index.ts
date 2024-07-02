import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';
import csv from 'csv-parser';

const startTime = new Date('2024-07-02T17:35:50Z');
const revealIntervalMinutes = 15; // Change this value to 1, 8, or any other interval
let ids: Map<string, string>;
let imagesList: string[];


const initializeData = new Promise<void>((resolve, reject) => {
    try {
        getIdsFromCsv().then(() => {
            getImagesList();
            resolve();
        });
    } catch (error) {
        reject(error);
    }
});

async function getIdsFromCsv() {
    ids = new Map();

    return new Promise((resolve, reject) => {
        fs.createReadStream('aeons/highRezImageMapping.csv')
            .pipe(csv())
            .on('data', (row) => {
                ids.set(row['File Name'], row['ID']);
            })
            .on('end', () => {
                resolve(ids);
            })
            .on('error', reject);
    });
}

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

function getImagesList() {
    const imagesDir = path.join(process.cwd(), 'aeons');
    imagesList = fs.readdirSync(imagesDir).filter(file => path.extname(file) === '.png').sort();
}

// Function to calculate the images to reveal based on elapsed time
function calculateImagesToReveal(images: string[]) {
    const now = new Date();
    if (now < startTime) {
        return [];
    }

    const diffInMinutes = (now.getTime() - startTime.getTime()) / 60000;
    const imagesToRevealCount = Math.min(Math.floor(diffInMinutes / revealIntervalMinutes) + 1, images.length);
    const startIndex = Math.max(0, imagesToRevealCount - 5); // Start index to ensure only last 5 images are shown

    return images.slice(startIndex, imagesToRevealCount);
}

// Function to get base64 encoded images
function getBase64Images(images: string[]) {
    const imagesDir = path.join(process.cwd(), 'aeons');
    return images.map(image => {
        const imagePath = path.join(imagesDir, image);
        const data = fs.readFileSync(imagePath);
        return Buffer.from(data).toString('base64');
    });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await initializeData;
    } catch (error) {
        console.error('Error during initialization:', error);
        res.status(500).json({ error: 'Server is not ready yet' });
        return;
    }

    const revealedImages = calculateImagesToReveal(imagesList);
    const base64Images = getBase64Images(revealedImages);
    const imagesData = revealedImages.map((imageName, index) => {
        const id = ids.get(`${imageName}`);
        return { imageName, id, base64Image: base64Images[index] };
    });

    const timeUntilNextReveal = getTimeUntilNextReveal();

    res.status(200).json({ timeUntilNextReveal, images: imagesData });
}