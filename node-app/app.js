const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const bodyParser = require('body-parser');
var fs = require('fs');
const cors = require('cors');
const csv = require('csv-parser');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({
  uploadDir: './uploads'
});
const mongoose = require('mongoose');
const Order = require('./models/Orders');
// Connect to local database
mongoose.connect('mongodb://localhost:27017/fileUpload', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// On connected
mongoose.connection.on('connected', () => {
  console.log(
    'Connected to database ' + 'mongodb://localhost:27017/fileUpload'
  );
});

// On error
mongoose.connection.on('error', err => {
  console.log('database error' + err);
});

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.post('/api/upload', multipartMiddleware, (req, res) => {
  console.log(req.body, req.files);
  var file = req.files.uploads;
  file.forEach(f => {
    var tempName = f.path.split('\\')[1];
    fs.rename(`uploads/${tempName}`, `uploads/${f.name}`, function(err) {
      if (err) console.log('ERROR: ' + err);
    });
  });
  var results = [];
  fs.createReadStream('uploads/10000_Sales_Records.csv')
    .pipe(csv())
    .on('data', row => {
      results.push(row);
    })
    .on('end', () => {
      console.log(results[1]);
      Order.addResults(results);
      console.log('CSV file successfully processed');
    });

  res.json({
    message: 'File uploaded succesfully.'
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
