const fs = require('fs');
const path = require('path');

function cleanJSONFiles(inputDir, outputDir) {
  // Read all files from the input directory
  fs.readdir(inputDir, (err, files) => {
    if (err) {
      console.error('Error reading input directory:', err);
      return;
    }

    // Iterate through each file in the input directory
    files.forEach(file => {
      // Read the JSON file
      fs.readFile(path.join(inputDir, file), 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          return;
        }

        try {
          // Parse JSON data
          const jsonData = JSON.parse(data);

          // Iterate through each object in the array
          jsonData.forEach(obj => {
            // Check if the object has a 'content' key and if its value is an array
            if (obj.hasOwnProperty('content') && Array.isArray(obj['content'])) {
              // Join the array elements into a single string
              const contentString = obj['content'].join('\n');

              // Remove content between underscore patterns
              obj['content'] = contentString.replace(/_{2,}.*?_{2,}/gs, '').split('\n').filter(Boolean);
            }
          });

          // Write the cleaned JSON back to the file in the output directory
          fs.writeFile(path.join(outputDir, file), JSON.stringify(jsonData, null, 2), err => {
            if (err) {
              console.error('Error writing file:', err);
              return;
            }
            console.log(`JSON file ${file} cleaned and saved successfully!`);
          });
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      });
    });
  });
}

// Example usage:
// const inputDirectory = 'output_json';
// const outputDirectory = 'clean_json';

// cleanJSONFiles(inputDirectory, outputDirectory);

module.exports = cleanJSONFiles;