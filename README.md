![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![](https://img.shields.io/badge/axios-671ddf?&style=for-the-badge&logo=axios&logoColor=white)
![](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![](https://img.shields.io/badge/Knex.js-ff5722?style=for-the-badge&logo=knex&logoColor=white)

# 🛒 Food Market - Smart Grocery Price Comparison App

## 💡 Project Overview
Food Market is an innovative grocery price comparison tool designed to empower shoppers during the current cost-of-living crisis. The app provides real-time market price comparisons, smart shopping list management, and intuitive unit conversion features, helping users make informed decisions and avoid price gouging while grocery shopping.

## ⭐ Key Features & Innovation
- **Market Price Analysis**: Dynamic price comparison system showing how store prices compare to provincial market averages
- **Intelligent Shopping Lists**: Category-organized lists with integrated market price indicators for efficient shopping
- **Smart Unit Conversion**: Instant conversion between lbs, kgs, and grams with percentage difference calculations from market averages
- **Personal Price History**: Unique feature tracking user's purchase history to build personalized price profiles
- **Recent Comparisons**: Quick access to last five price comparisons for easy item-to-item price analysis
- **Location-Specific Data**: Provincial market average prices for accurate local comparisons

## 📸 View Project Screen Shots

- [Compare Page](./src/assets/screenshots/Food%20Market%20-%20Compare%20Page%20-%20Mobile.png)
- [List Page](./src/assets/screenshots/Food%20Market%20-%20List%20Page%20Mobile%20-%20Compare%20Item.png)

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 12.0 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [Git](https://git-scm.com/)

## Getting Started

#### Find Server Here: https://github.com/Ingy10/kyle-ingham-food-market-server

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
2. Create a copy of this file and name it `.env`.
3. Do this for both server and client side.

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

### 4. Migrate Tables and Seed

1. On the server side run:

```bash
npx knex migrate:latest
```

2. Seed the migrated database:

```bash
npx knex seed:run
```

### 5. Run the Application

You'll need to start both the server and client sides of the application.

1. Start the server:

```bash
node --watch server.js
```

This will start the Express server, typically on `http://localhost:8080` (check the console output for the exact URL and replace port number with the one you chose in the server side .env file).

2. In a new terminal window, start the client:

```bash
npm run dev
```

This will start the React development server, typically on `http://localhost:5173`.

### 6. Access the Application

As the project is still in development, open your web browser and visit **`http://localhost:5173/compare/1/alberta`** to view the React frontend. This will simulate a logged in user from Alberta using the app and will use Alberta CPI data for price comparisons along with any prices you log while using the app. The frontend should now be connected to the Express backend. You can use the List icon in the top left corner to navigate to the list page of the application. Check routes in App.jsx to ensure you are using the correct URL.

## Additional Information

- The server runs on port 8080 by default. You can change this in the `.env` file if needed.
- Make sure all required environment variables are properly set in the `.env` file for both the client and server to function correctly.

## Troubleshooting

If you encounter any issues:

1. Ensure all dependencies are installed correctly.
2. Check that your `.env` file is set up properly with all required variables.
3. Make sure no other processes are using the required ports.

For any other problems, please open an issue in the GitHub repository.
