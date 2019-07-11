'use strict';

let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');

// require and use "multer"...
let multer = require('multer');
let app = express();

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
let upload = multer({ storage: storage })

app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));

app.use('/public', express.static(process.cwd() + '/public'));


app.get('/', (req, res) => {
     res.sendFile(`${process.cwd()}/views/index.html`);
  });

app.get('/hello', (req, res) => {
  res.json({greetings: "Hello, API"});
});

// setup uploading function
app.route('/api/fileanalyse')
.post(upload.single('upfile'),(req, res) => {
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: `${Number.parseFloat(req.file.size/1000.0).toFixed(2)}kB`,
  })
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js is listening on port 3000');
});
