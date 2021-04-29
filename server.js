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

app.get("/api/", (req, res, next) => {
  let actualDate = new Date();
  let unixDate = Date.parse(actualDate);
  res.json({
    unix: unixDate,
    utc: actualDate.toUTCString(),
  });
  next();
});

app.get("/api/:date", (req, res, next) => {
  const { date } = req.params;
  const isUnix = (date) => isNaN(Date.parse(date));
  let newDateUnix, newDateUtf;

  if (!/[0-9]/.test(date) && new Date(date).toString() === "Invalid Date") {
    console.log(date);
    res.json({
      error: "Invalid Date",
    });
  } else {
    if (isUnix(date)) {
      newDateUnix = Number(date);
      newDateUtf = new Date(Number(date)).toUTCString();
    } else {
      newDateUtf = new Date(date).toUTCString();
      newDateUnix = Number(Date.parse(date));
    }

    res.json({
      unix: newDateUnix,
      utc: newDateUtf,
    });
  }

  next();
});
// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
