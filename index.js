const cleanJSONFiles = require('./cleanJSON');
const scrapeJSON = require('./scrapeJSON');
const fs = require('fs');



// First Creating all the directories for storing output files

// For output_json directory 

const outputJSONDirectory = 'output_json';

// Check if the directory exists
fs.access(outputJSONDirectory, fs.constants.F_OK, (err) => {
  if (err) {
    // Directory doesn't exist, create it
    fs.mkdir(directory, (err) => {
      if (err) {
        console.error('Error creating directory:', err);
        return;
      }
      console.log('Directory created successfully:', directory);
    });
  } else {
    // Directory exists
    console.log('Directory already exists:', directory);
  }
});

// For clean_json directory

const cleanJSONDirectory = 'clean_json';

// Check if the directory exists
fs.access(cleanJSONDirectory, fs.constants.F_OK, (err) => {
  if (err) {
    // Directory doesn't exist, create it
    fs.mkdir(directory, (err) => {
      if (err) {
        console.error('Error creating directory:', err);
        return;
      }
      console.log('Directory created successfully:', directory);
    });
  } else {
    // Directory exists
    console.log('Directory already exists:', directory);
  }
});



// Provide PDF files directory
pdfFilesDirectory = "pdf_files";


// Executing the Scripts one By one 
// scrapeJSON(pdfFilesDirectory,outputJSONDirectory);

// cleanJSONFiles(outputJSONDirectory,cleanJSONDirectory);

// Done














