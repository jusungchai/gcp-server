const express = require('express');
const path = require('path');
const users = require('./routes/users');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');


const app = express();

app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', users);

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// An api endpoint that returns a short list of items
app.get('/api/getList', (req, res) => {
  var list = ["item1", "item2", "item3"];
  res.json(list);
  console.log('Sent list of items');
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.post('/upload', (req, res) => {
  if (req.files === null) return res.status(400).json({ msg: 'No file was uploaded' });
  if (req.files) {
    const file = req.files.file;

    file.mv(`${__dirname}/uploads/${file.name}`, err => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }

      res.json({ fileName: file.name, filePath: `/uploads/${file.name}` })
    })
  }
  
})

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);