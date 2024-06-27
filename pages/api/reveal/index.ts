import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

// Define the start date and time
const startTime = new Date('2024-06-27T17:03:50Z');
// Configurable reveal interval in minutes
const revealIntervalMinutes = 1; // Change this value to 1, 8, or any other interval

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

// Function to get the list of images in the aeons folder
function getImagesList() {
    const imagesDir = path.join(process.cwd(), 'aeons');
    return fs.readdirSync(imagesDir).sort();
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

// API handler
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const imagesList = getImagesList();
    const revealedImages = calculateImagesToReveal(imagesList);
    const base64Images = getBase64Images(revealedImages);

    const timeUntilNextReveal = getTimeUntilNextReveal();

    res.status(200).json({ timeUntilNextReveal, images: base64Images });
}
