# Submission Form Application

This project replicates the functionality of Google Forms in a Windows Desktop App. It allows users to view submissions and create new submissions. The backend server is built with Express and TypeScript, providing endpoints for /ping, /submit, and /read.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (version 14.x or later)
- npm
- Visual Studio (for running the Visual Basic frontend)
- Git

## Getting Started

### 1. Windows Desktop App

- Clone the repository
  ```sh
  git clone https://github.com/hardikn13/forms-desktop-app
  ```
- Open the project in Visual Studio.
- Build the project to ensure all dependencies are installed.
- Run the application.

### 2. Backend Server

- Clone the repository:
  ```sh
  git clone https://github.com/hardikn13/forms-desktop-app-backend
  ```
- Navigate to the backend directory:
  ```sh
  cd forms-desktop-app-backend
  ```
- Install dependencies:
  ```sh
  npm install
  ```
- Build the project:
  ```sh
  npm run build
  ```
- Start the server:
  ```sh
  npm start
  ```

## Usage

1.  Windows Desktop App

- Click on "View Submissions" to view existing submissions.
- Click on "Create New Submission" to create a new submission.

2.  Backend Server

- Use /ping to check if the server is running.
- Use /submit to submit new form entries.
- Use /read to read all form entries.

## Troubleshooting

- Check the console for error messages when running `npm start`.
- Verify the server is running on [http://localhost:3000](http://localhost:3000).
