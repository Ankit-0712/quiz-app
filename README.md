# Quiz App

This is a React-based quiz application with gamification features. The quiz fetches data from an API using a proxy server to handle CORS issues.

## Features
- Interactive UI with animations (Framer Motion)
- Multiple-choice questions
- API-based quiz data retrieval
- Answer validation with instant feedback
- Progress tracking
- Responsive design

---

## Installation

### 1. Clone the Repository
```sh
git clone https://github.com/yourusername/quiz-app.git
cd quiz-app
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Install Framer Motion (for animations)
```sh
npm install framer-motion
```

---

## Running the App

### 1. Start the Proxy Server
Before running the React app, start the proxy server (`proxy.js`) to avoid CORS issues:
```sh
node proxy.js
```
This will start the proxy server on port `5000`.

### 2. Run the React App
```sh
npm start
```
This will start the development server and open the app in your default browser.

---

## Proxy Setup
A `proxy.js` file is used to fetch API data while avoiding CORS issues. The React app makes requests to `http://localhost:5000`, which the proxy forwards to the actual API.

### Example of `proxy.js`:
```js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://actual-api.com', // Replace with the actual API URL
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
  })
);

app.listen(5000, () => {
  console.log('Proxy server running on http://localhost:5000');
});
```

### How It Works:
- The React app makes requests to `http://localhost:5000/api/...`
- The proxy forwards the request to `https://actual-api.com/...`
- This bypasses CORS restrictions

---

## Useful Commands
| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm start` | Run the React app |
| `node proxy.js` | Start the proxy server |
| `npm run build` | Build the app for production |

---

## Deployment
To deploy the project, build it first:
```sh
npm run build
```
Then, deploy the `build/` folder to a hosting service like Vercel, Netlify, or Firebase.

---

## License
This project is licensed under the MIT License.

Happy coding! 🚀


