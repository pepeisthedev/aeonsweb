const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const csvFilePath = '../public/gallery/highRezImageMapping.csv'; // path to your CSV file
const metadataFolderPath = '../public/metadata'; // path to your metadata folder
// Read CSV file
const readCSV = async (filePath) => {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
};

const updateJsonFiles = async (csvData) => {
    for (const row of csvData) {
        const fileName = row['File Name'];
        const id = row['ID'];

        const jsonFilePath = path.join(metadataFolderPath, path.basename(fileName, '.png') + '.json');
        console.log(jsonFilePath)

        if (fs.existsSync(jsonFilePath)) {
            const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
            jsonData.external_url = id;

            fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf8');
            console.log(`Updated ${jsonFilePath} with external_url: ${id}`);
        } else {
            console.log(`JSON file for ${fileName} not found.`);
        }
    }
};

// Main function
const main = async () => {
    try {
        const csvData = await readCSV(csvFilePath);
        await updateJsonFiles(csvData);
    } catch (error) {
        console.error('Error:', error);
    }
};

main();
