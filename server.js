const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const transporter = require("./utils/mailTransporter.js");
const authRoutes = require("./routes/auth.js");
const recipeRoutes = require("./routes/recipes.js");
const contactRoutes = require("./routes/contact.js");
const app = express();

require("dotenv").config();

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self'; img-src 'self'; style-src 'self' 'unsafe-inline';"
  );
  next();
});

const corsOptions = {
  origin: [
    "http://localhost:3001",
    "http://127.0.0.1:3001",
    "https://alexanpetrov.github.io/gastrograph",
    "https://alexanpetrov.github.io",
  ],
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app.use(cors(corsOptions));
app.use(express.json());

const connectionString = process.env.DB_URI;
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB Atlas!");
});

app.use("/auth", authRoutes);
app.use("/recipes", recipeRoutes);
app.use("/contact", contactRoutes(transporter));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Local Connection to MongoDB
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
//   origin: ["http://localhost:3001", "http://127.0.0.1:3001"],
//   credentials: true,
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
// };

// app.use(cors(corsOptions));
// app.use(express.json());

// const connectionString = "mongodb://localhost:27017/gastrographdb";
// mongoose.connect(connectionString, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "MongoDB connection error:"));
// db.once("open", () => {
//   console.log("Connected to local MongoDB database!");
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
