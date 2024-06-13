# Regex Articles Scraper

A Node.js project that scrapes articles from Spanish PDF documents using regular expressions (regex). This project extracts articles formatted as `Article 1 - {article content}` and performs data cleaning using regex or an API like OpenAI's GPT or Gemini. Contributions are welcome, especially for enhancing parsing capabilities and adding a UI.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features
- Extracts articles from Spanish PDF documents using regex.
- Cleans data using regex and optionally OpenAI or Gemini API.
- Easy to extend with new regex patterns for different parsing needs.
- Potential for adding a UI for better usability.

## Technology
- **Node.js**: Backend runtime environment.
- **JavaScript**: Programming language used for the project.
- **Regex**: Regular expressions for extracting and cleaning data.
- **OpenAI/Gemini API** (optional): For advanced data cleaning and processing.

## Installation
1. **Clone the repository:**
    ```bash
    git clone https://github.com/satyam8932/regex-articles-scraper.git
    cd regex-articles-scraper
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

## Usage
1. **Place your PDF documents in the `pdf_files` directory.**

2. **Run the scraper:**
    ```bash
    npm run scrape
    ```

3. **Check the output in the `output_json` directory.**

## Contributing
Contributions are welcome! Follow these steps to contribute:

1. **Fork the repository.**
2. **Clone your fork:**
    ```bash
    git clone https://github.com/satyam8932/regex-articles-scraper.git
    cd spanish-regex-articles-scraper
    ```
3. **Create a new branch:**
    ```bash
    git checkout -b feature/new-feature
    ```
4. **Make your changes.**
5. **Commit your changes:**
    ```bash
    git commit -m "Add new feature"
    ```
6. **Push to your fork:**
    ```bash
    git push origin feature/new-feature
    ```
7. **Open a pull request.**

### Adding New Regex Patterns
To add new regex patterns for parsing, follow these steps:

1. **Locate the section in the code where articles are parsed.**
2. **Add your new regex pattern to the existing ones.**
3. **Ensure your pattern works correctly with the provided PDF samples.**
4. **Submit a pull request with your changes.**

## License
This project is licensed under the MIT License. 
