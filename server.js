if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

var express = require("express");
var sendSMS = require("./send_sms");

var app = express();

app.get("/", function(req, res) {
  res.status(200).send("Hello world!!!");
});

app.post("/note", (req, res) => {
  const { text, phoneNumber } = req.body;
  sendSMS(text, phoneNumber);
  res.status(200).send("Sending note");
});

app.listen(process.env.PORT || 8080, function() {
  console.log("Server is running on PORT:", process.env.PORT || PORT);
});
