import "./App.css";

import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Join from "./pages/join.jsx";
import About from "./pages/about.jsx";
import Home from "./pages/home.jsx";
import Recipes from "./pages/recipes.jsx";
import NotFound from "./pages/notfound.jsx";
import Contact from "./pages/contact.jsx";

import NavBar from "./components/NavBar.jsx";

import ResetPassword from "./components/ResetPassword.jsx";
import NewPassword from "./components/NewPassword.jsx";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App-class">
        <NavBar />
        <div id="App-id">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/recipes"
              element={
                <Recipes isLoggedIn={isLoggedIn} onLogout={handleLogout} />
              }
            />
            <Route
              path="/recipes/:recipeId"
              element={
                <Recipes isLoggedIn={isLoggedIn} onLogout={handleLogout} />
              }
            />
            <Route
              path="/join"
              element={
                <Join setIsLoggedIn={setIsLoggedIn} onLogin={handleLogin} />
              }
            />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/new-password/:token" element={<NewPassword />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const transporter = require("./utils/mailTransporter.js");
// const authRoutes = require("./routes/auth.js");
// const recipeRoutes = require("./routes/recipes.js");
// const contactRoutes = require("./routes/contact.js");
// const app = express();

// require("dotenv").config();

// const corsOptions = {
//   origin: [
//     "http://localhost:3001",
//     "http://127.0.0.1:3001",
//     "https://alexanpetrov.github.io/gastrograph",
//     "https://alexanpetrov.github.io",
//     "https://alexanpetrov.github.io/gastrograph/reset-password",
//     "https://alexanpetrov.github.io/gastrograph/about",
//     "https://alexanpetrov.github.io/gastrograph/recipes",
//     "https://alexanpetrov.github.io/gastrograph/join",
//     "https://alexanpetrov.github.io/gastrograph/contact",
//   ],
//   credentials: true,
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
// };

// app.use(cors(corsOptions));
// app.use(express.json());

// const connectionString = process.env.DB_URI;
// mongoose.connect(connectionString, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "MongoDB connection error:"));
// db.once("open", () => {
//   console.log("Connected to MongoDB Atlas!");
// });

// app.use("/auth", authRoutes);
// app.use("/recipes", recipeRoutes);
// app.use("/contact", contactRoutes(transporter));

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: "Something went wrong!" });
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
