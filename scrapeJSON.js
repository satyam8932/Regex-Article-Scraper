const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

// Function to extract articles from a PDF file
function extractArticlesFromPDF(pdfPath) {
    return new Promise((resolve, reject) => {
        const articles = [];
        let currentArticle = null;

        // Read PDF file and extract text
        const dataBuffer = fs.readFileSync(pdfPath);

        pdf(dataBuffer).then(function(pdfData) {
            const articleRegex = /\b((?:Artículo|ARTICULO|Art)\.?\s*\d+[A-Z]?(?:[-. ]|\u00B7|\u2022|\u2024|\u2027|\b)?)\s*(.*?)(?=\b((?:Artículo|ARTICULO|Art)\.?\s*\d+[A-Z]?(?:[-. ]|\u00B7|\u2022|\u2024|\u2027|\b)?)|\bARTICULO\s*\d+[A-Z]?[-. ]?|\bArtículo\s*\d+[A-Z]?[-. ]?|\bArticulo\s*\d+[A-Z]?[-. ]?|\bArtículo\s*\d+[A-Z]?[-. ]?|$)/i;

            pdfData.text.split('\n').forEach(content => {
                const articleMatch = content.match(articleRegex);
                
                if (articleMatch) {
                    // If a new article is found, push the previous one to the articles array
                    if (currentArticle !== null) {
                        articles.push(currentArticle);
                    }

                    // Start a new article object
                    const numberMatch = articleMatch[1].trim().replace(/\s+/g, ' '); // Replace multiple whitespaces with single space
                    const numberWithAlphabet = numberMatch.replace(/^(\D+)(\d+)(.*)$/i, "$1 $2$3");
                    currentArticle = {
                        number: numberWithAlphabet,
                        content: [articleMatch[2].trim()]
                    };
                } else if (currentArticle !== null) {
                    // Add content to the current article
                    currentArticle.content.push(content.trim());
                }
            });

            // Push the last article to the articles array
            if (currentArticle !== null) {
                articles.push(currentArticle);
            }

            resolve(articles);
        }).catch(function(error) {
            reject(error);
        });
    });
}

// Function to convert articles to JSON format
function convertToJSON(articles) {
    return JSON.stringify(articles, null, 4);
}

// Function to process all PDF files in a directory
function processPDFDirectory(inputDirectory, outputDirectory) {
    fs.readdir(inputDirectory, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(inputDirectory, file);
            if (fs.statSync(filePath).isFile() && path.extname(file).toLowerCase() === '.pdf') {
                // Extract articles from the PDF file
                extractArticlesFromPDF(filePath)
                    .then(articles => {
                        const jsonData = convertToJSON(articles);
                        const jsonFileName = path.basename(file, '.pdf') + '.json';
                        const jsonFilePath = path.join(outputDirectory, jsonFileName);

                        // Write the JSON data to a file in the output directory
                        fs.writeFileSync(jsonFilePath, jsonData);
                        console.log(`Extracted articles from ${file} and saved to ${jsonFileName}`);
                    })
                    .catch(error => {
                        console.error(`Error extracting articles from ${file}:`, error);
                    });
            }
        });
    });
}

// Example usage: Provide the paths to the input directory containing the PDF files and the output directory
// const inputDirectory = 'pdf_files';
// const outputDirectory = 'output_json';
// processPDFDirectory(inputDirectory, outputDirectory);

module.exports = processPDFDirectory;
