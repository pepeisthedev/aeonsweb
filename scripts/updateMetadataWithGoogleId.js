const fs = require('fs');
const path = require('path');

// Paths to your files
const jsonFilePath = '../public/Aeons_Metadata.json'; // Change this to your JSON file path
const csvFilePath = 'IDs.csv'; // Change this to your CSV file path

// Read the CSV file
fs.readFile(csvFilePath, 'utf8', (err, csvContent) => {
    if (err) {
        console.error(`Error reading CSV file: ${err}`);
        return;
    }

    // Parse CSV content into an array of objects { name: number, googleDriveId: string }
    const csvRows = csvContent.trim().split('\n').filter(line => line).map(line => {
        const [name, googleDriveId] = line.split(',');
        return { name: name.trim(), googleDriveId: googleDriveId.trim() };
    });

    // Read the JSON file
    fs.readFile(jsonFilePath, 'utf8', (err, jsonContent) => {
        if (err) {
            console.error(`Error reading JSON file: ${err}`);
            return;
        }

        // Parse JSON content
        let jsonData;
        try {
            jsonData = JSON.parse(jsonContent);
        } catch (err) {
            console.error(`Error parsing JSON file: ${err}`);
            return;
        }

        // Add google_drive_id to the matching objects in the JSON data
        jsonData.forEach(item => {
            const metaName = item.meta.name;
            const matchingRow = csvRows.find(row => row.name === metaName);
            if (matchingRow) {
                item.google_drive_id = matchingRow.googleDriveId;
            }
        });

        // Write the updated JSON back to the file
        fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf8', err => {
            if (err) {
                console.error(`Error writing JSON file: ${err}`);
                return;
            }
            console.log('JSON file updated successfully');
        });
    });
});
