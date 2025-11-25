# NASA APOD Explorer

A full-stack web application that allows users to explore NASA's Astronomy Picture of the Day (APOD). This project fetches data from the NASA API and presents it in a beautiful, responsive interface.

## 🚀 Features

- **Daily APOD**: View the Astronomy Picture of the Day with its explanation.
- **Gallery Mode**: Browse a collection of recent APOD images.
- **Date Picker**: Select any specific date to view the APOD for that day.
- **Caching**: Server-side caching to minimize API calls and improve performance.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## 🛠️ Tech Stack

### Frontend
- **React (v19)**: UI library for building the interface.
- **Vite**: Fast build tool and development server.
- **Tailwind CSS (v4)**: Utility-first CSS framework for styling.
- **React Router DOM**: For client-side routing.
- **Axios**: For making HTTP requests.
- **React Query**: For data fetching and state management.

### Backend
- **Node.js**: Runtime environment.
- **Express**: Web framework for the server.
- **Axios**: For fetching data from the NASA API.
- **LRU Cache**: For caching API responses to avoid hitting rate limits.
- **Dotenv**: For environment variable management.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** (Node Package Manager)

You will also need a **NASA API Key**. You can get one for free at [api.nasa.gov](https://api.nasa.gov/).

## ⚙️ Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd nasa-apod-explorer
    ```

2.  **Install Backend Dependencies**
    ```bash
    cd server
    npm install
    ```

3.  **Install Frontend Dependencies**
    ```bash
    cd ../client
    npm install
    ```

## 🔐 Configuration

1.  Navigate to the `server` directory.
2.  Create a `.env` file in the `server` directory.
3.  Add the following variables:

    ```env
    PORT=5000
    NASA_API_KEY=your_nasa_api_key_here
    NASA_BASE_URL=https://api.nasa.gov/planetary/apod
    ```

    *Replace `your_nasa_api_key_here` with your actual NASA API key.*

## 🏃‍♂️ Running the Project

To run the application, you need to start both the backend server and the frontend client.

### 1. Start the Backend Server
Open a terminal, navigate to the `server` directory, and run:

```bash
cd server
npm run dev
```
*The server will start on `http://localhost:5000`.*

### 2. Start the Frontend Client
Open a **new** terminal, navigate to the `client` directory, and run:

```bash
cd client
npm run dev
```
*The client will start (usually on `http://localhost:5173`). Open this URL in your browser.*

## 📂 Project Structure

```
nasa-apod-explorer/
├── client/                 # Frontend React Application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components (Home, Gallery, etc.)
│   │   ├── services/       # API service functions
│   │   └── ...
│   ├── package.json
│   └── ...
├── server/                 # Backend Express Application
│   ├── controllers/        # Request handlers
│   ├── routes/             # API route definitions
│   ├── services/           # Business logic (NASA API integration)
│   ├── index.js            # Entry point
│   ├── package.json
│   └── ...
└── README.md               # Project Documentation
```

## 📡 API Endpoints (Backend)

-   `GET /api/apod/today`: Fetches today's APOD.
-   `GET /api/apod/date/:date`: Fetches APOD for a specific date (YYYY-MM-DD).
-   `GET /api/apod/recent`: Fetches a list of recent APODs.
