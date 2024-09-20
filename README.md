# React and Express Project

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 12.0 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [Git](https://git-scm.com/)

## Getting Started

### 1. Clone the Repository

#### Client

```bash
git clone https://github.com/Ingy10/kyle-ingham-food-market.git
```

#### Server

```bash
git clone https://github.com/Ingy10/kyle-ingham-food-market-server.git
```

### 2. Set Up Environment Variables

1. In the root directory of the project, you'll find a file named `.env.sample`.
2. Create a copy of this file and name it `.env`:

```bash
cp .env.sample .env
```

3. Open the `.env` file and fill in the required environment variables with your specific values.

### 3. Install Dependencies

Install dependencies for both the server and client:

```bash
# Install server dependencies
npm install

# Install client dependencies
npm install
```

### 4. Run the Application

You'll need to start both the server and client sides of the application.

1. Start the server:

```bash
node --watch server.js
```

This will start the Express server, typically on `http://localhost:8080` (check the console output for the exact URL).

2. In a new terminal window, start the client:

```bash
npm run dev
```

This will start the React development server, typically on `http://localhost:5173`.

### 5. Access the Application

Open your web browser and visit `http://localhost:5173/1/aberta` to view the React frontend. The frontend should now be connected to the Express backend. You can use the List icon in the top left corner to navigate to the list page of the application.

## Additional Information

- The server runs on port 8080 by default. You can change this in the `.env` file if needed.
- Make sure all required environment variables are properly set in the `.env` file for both the client and server to function correctly.

## Troubleshooting

If you encounter any issues:

1. Ensure all dependencies are installed correctly.
2. Check that your `.env` file is set up properly with all required variables.
3. Make sure no other processes are using the required ports.

For any other problems, please open an issue in the GitHub repository.
