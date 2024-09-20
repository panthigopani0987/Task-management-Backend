const fs = require('fs');
const csvParser = require('csv-parser');
const { Parser } = require('json2csv');

// CSV parsing
const parseCSV = (filePath) => {
    return new Promise((resolve, reject) => {
        const tasks = [];
        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (row) => {
                tasks.push(row);
            })
            .on('end', () => {
                resolve(tasks);
            })
            .on('error', reject);
    });
};

// CSV exporting
const exportToCSV = (data) => {
    const fields = ['title', 'description', 'dueDate', 'priority', 'status', 'assignedUsers'];
    const json2csvParser = new Parser({ fields });
    return json2csvParser.parse(data);
};

module.exports = {
    parseCSV,
    exportToCSV
}