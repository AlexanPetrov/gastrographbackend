const express = require("express");
const router = express.Router();
const ContactController = require("../controllers/contact.js");

module.exports = (transporter) => {
  router.post("/submit", ContactController(transporter).submitContactForm);
  return router;
};
