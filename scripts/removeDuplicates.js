const fs = require('fs');
const path = require('path');

const filePath = 'IDs.csv'; // Change this to your file path

// Read the file
fs.readFile(filePath, 'utf8', (err, content) => {
    if (err) {
        console.error(`Error reading file: ${err}`);
        return;
    }

    // Split the content into rows
    const rows = content.trim().split('\n');

    // Remove duplicate rows by converting the array to a Set and then back to an array
    const uniqueRows = Array.from(new Set(rows));

    // Sort the rows by the number in the first column
    uniqueRows.sort((a, b) => {
        const numA = parseInt(a.split(',')[0], 10);
        const numB = parseInt(b.split(',')[0], 10);
        return numA - numB;
    });

    // Join the rows back into a single string
    const updatedContent = uniqueRows.join('\n');

    // Write the updated content back to the file
    fs.writeFile(filePath, updatedContent, 'utf8', err => {
        if (err) {
            console.error(`Error writing file: ${err}`);
            return;
        }
        console.log('File updated successfully');
    });
});
