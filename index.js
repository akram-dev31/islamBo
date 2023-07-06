// index.js
// where your node app starts

// init project
var express = require('express');
const bodyParser = require('body-parser');
let mongoose = require('mongoose');
require('dotenv').config();


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  let dateParam = req.params.date;
  let date;

  if (!dateParam) {
    date = new Date();
  } else if (/^\d+$/.test(dateParam)) {
    date = new Date(parseInt(dateParam));
  } else {
    date = new Date(dateParam);
  }

  if (isNaN(date)) {
    res.json({ error: "Invalid Date" });
  } else {
    const response = {
      unix: date.getTime(),
      utc: date.toUTCString()
    };
    res.json(response);
  }
});




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

