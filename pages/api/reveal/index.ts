import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

// Define the start date and time
const startTime = new Date('2024-06-27T11:15:00Z');

interface State {
    unrevealedImages: string[];
    last5Images: string[];
    revealFirstImage: boolean;
}

// Define the path to the state file
const stateFilePath = path.join(process.cwd(), 'state.json');

// Function to get the time until the next reveal
function getTimeUntilNextReveal() {
    const now = new Date();
    if (now < startTime) {
        // If the current time is before the start time, return the difference in seconds
        return (startTime.getTime() - now.getTime()) / 1000;
    } else {
        const diffInMinutes = (now.getTime() - startTime.getTime()) / 60000;
        const timeUntilNextReveal = 2 - (diffInMinutes % 2);
        return timeUntilNextReveal * 60; // Return time in seconds
    }
}

// Function to get the state
function getState(): State {
    let state: State;
    if (fs.existsSync(stateFilePath)) {
        state = JSON.parse(fs.readFileSync(stateFilePath, 'utf-8'));
    } else {
        const imagesDir = path.join(process.cwd(), 'aeons');
        const images = fs.readdirSync(imagesDir).sort();
        state = { unrevealedImages: images, last5Images: [], revealFirstImage: false };
        fs.writeFileSync(stateFilePath, JSON.stringify(state));
    }
    return state;
}

// Function to update the state
function updateState(state: State): void {
    fs.writeFileSync(stateFilePath, JSON.stringify(state));
}

// Function to reveal the next image
function revealNextImage(state: State) {
    if (state.unrevealedImages.length === 0) return;

    const randomIndex = Math.floor(Math.random() * state.unrevealedImages.length);
    const randomImage = state.unrevealedImages[randomIndex];
    state.unrevealedImages.splice(randomIndex, 1); // Remove the image from the unrevealed images
    state.last5Images.push(randomImage); // Add the image to the last 5 images

    if (state.last5Images.length > 5) {
        state.last5Images.shift(); // Remove the oldest image if there are more than 5 images
    }
    updateState(state); // Update the state
}

// Function to get base64 encoded images
function getBase64Images(state: State) {
    const imagesDir = path.join(process.cwd(), 'aeons');
    return state.last5Images.map(image => {
        const imagePath = path.join(imagesDir, image);
        const data = fs.readFileSync(imagePath);
        return Buffer.from(data).toString('base64');
    });
}

// API handler
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const state = getState();
    const now = new Date();
    let imagesData: string[] = [];

    if (now.getTime() >= startTime.getTime()) {
        // Determine if we should reveal a new image
        const diffInMinutes = (now.getTime() - startTime.getTime()) / 60000;
        const imagesToReveal = Math.floor(diffInMinutes / 2) + 1;

        // Reveal images if needed
        while (state.last5Images.length < imagesToReveal && state.unrevealedImages.length > 0) {
            revealNextImage(state);
        }

        // Get base64 encoded images to return
        imagesData = getBase64Images(state);
    }

    const timeUntilNextReveal = getTimeUntilNextReveal();

    res.status(200).json({ timeUntilNextReveal, images: imagesData });
}
