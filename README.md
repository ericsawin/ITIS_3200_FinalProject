# ITIS_3200_FinalProject

This project demonstrates SQL injection vulnerabilities in an insecure login page, and the prevention mechanisms used to prevent these attacks.

There are 2 separate login pages, a safe one and a vulnerable one.

If SQLi is successfull, the database is leaked into the network tab in the browser's inspect element.

To run the local server, npm must be installed (part of node.js).

Windows:
winget install OpenJS.NodeJS.LTS

MacOS:
brew install node

Linux:
sudo apt update
sudo apt install node.js npm

To start the server:
npm start

AI use discolosure:

Eric: used chatgpt to find an error in get/post commands while troubleshooting server interaction with html pages.
