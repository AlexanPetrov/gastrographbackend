const Contact = require("../models/Contact.js");

module.exports = (transporter) => {
  return {
    submitContactForm: async (req, res) => {
      const { name, email, message } = req.body;

      try {
        const newContact = new Contact({ name, email, message });
        await newContact.save();

        const mailOptions = {
          from: process.env.SENDER_EMAIL,
          to: process.env.RECEIVER_EMAIL,
          subject: "New Contact Submission",
          text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error(error);
            return res.status(500).send("Error sending email.");
          }
          console.log("Email sent: " + info.response);
          res.status(200).send("Submission successful.");
        });
      } catch (error) {
        console.log("Error in submitContactForm:", error);
        res
          .status(500)
          .json({ message: "Error saving contact form submission." });
      }
    },
  };
};
