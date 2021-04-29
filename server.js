// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date", (req, res, next) => {
  const { date } = req.params;
  const isUnix = (date) => isNaN(Date.parse(date));
  let newDateUnix, newDateUtf;

  if (isUnix(date)) {
    newDateUnix = date;
    newDateUtf = new Date(Number(date)).toString();
    console.log(newDateUtf)
  } else {
    newDateUtf = new Date(date).toString();
    newDateUnix = Date.parse(date);
  }

  res.json({
    unix: newDateUnix,
    utf: newDateUtf,
  });
  next()
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
