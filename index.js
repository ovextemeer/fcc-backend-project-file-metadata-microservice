var express = require('express');
var cors = require('cors');
require('dotenv').config()

// import libraries
const multer = require('multer');
const upload = multer();
// import libraries

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// start building project here
app.post("/api/fileanalyse", upload.single("upfile"), function (req, res) {
  if (req.file !== undefined) {
    res.json({
      "name": req.file.originalname,
      "type": req.file.mimetype,
      "size": req.file.size
    });
  } else {
    console.log("No file chosen");
  }
});
// end building project here

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
