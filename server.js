var express = require("express");

var app = express();

var PORT = 8080;

app.get("/", function(req, res) {
  res.status(200).send("Hello world!!!");
});

app.post("/note", (req, res) => {
  res.status(200).send("Sending note");
});

app.listen(PORT, function() {
  console.log("Server is running on PORT:", PORT);
});
