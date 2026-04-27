# ITIS_3200_FinalProject

This project demonstrates SQL injection vulnerabilities in an insecure login page and the prevention mechanisms used to prevent these attacks.
Data is stored as cleartext to demonstrate the compounding risk involved when data encryption and hashing is omitted.

There are 2 separate login pages, a safe one and a vulnerable one. The registration page is designed with safety mechanisms in place.

If SQLi is successful, the response from the database is leaked into the network tab in the browser's inspect element as part of the response body.

To run the local server, npm (Node Package Manger) must be installed (part of node.js).

Windows:
winget install OpenJS.NodeJS.LTS

MacOS:
brew install node

Linux:
sudo apt update
sudo apt install node.js npm

To install dependencies and start the server:
npm i
npm start

AI use disclosure:

Eric: used chatgpt to find an error in get/post commands while troubleshooting server interaction with html pages.
Lane: used ChatGPT to investigate and differentiate between safe and unsafe SQLite query logic and syntax.
