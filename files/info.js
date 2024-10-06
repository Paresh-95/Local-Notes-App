const fs = require('fs');
const path = require('path');

// Directory to store the temp files
const dir = '.';

// Topics array
const topics = [
    'Artificial Intelligence', 'Web Development', 'Data Science',
    'Cybersecurity', 'Cloud Computing', 'Blockchain', 'Internet of Things',
    'Quantum Computing', '5G Networks', 'Augmented Reality'
];

// Helper function to generate random string
function randomString(length = 8) {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Function to create temp files with random names and data
function createFiles() {
    // Create directory if it doesn't exist
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    topics.forEach((topic, index) => {
        // Generate random file name
        const fileName = `${randomString()}.txt`;
        const filePath = path.join(dir, fileName);

        // Generate random data related to the topic
        let data = `Topic: ${topic}\nHere is some interesting data about ${topic}.\n`;
        data += Array.from({ length: 20 }, () => randomString(5)).join(' ') + '\n';

        // Write to the file
        fs.writeFileSync(filePath, data, 'utf8');
        console.log(`Created file: ${fileName}`);
    });
}

// Run the function
createFiles();
