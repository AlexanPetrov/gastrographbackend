const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const transporter = require("./utils/mailTransporter.js");
const authRoutes = require("./routes/auth.js");
const recipeRoutes = require("./routes/recipes.js");
const contactRoutes = require("./routes/contact.js");
const app = express();

require("dotenv").config();

const corsOptions = {
  origin: ["https://brilliant-cuchufli-19cf17.netlify.app"],
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
