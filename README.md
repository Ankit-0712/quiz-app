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



### How It Works:
- The React app makes requests to `http://localhost:5000/api/...`
- The proxy forwards the request to `https://actual-api.com/...`
- This bypasses CORS restrictions

---


## ScreenShots
![image alt](https://github.com/Ankit-0712/quiz-app/blob/master/Screenshot%20(4).png?raw=true)
![image alt](https://github.com/Ankit-0712/quiz-app/blob/master/Screenshot%20(5).png?raw=true)

## Video demo 
https://drive.google.com/file/d/12iJR_AjIolilJme1Mdkdcq8oDLxvgHxI/view?usp=sharing

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


