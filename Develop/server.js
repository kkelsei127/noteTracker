const express = require('express');
const path = require('path');
// Helper method for generating unique ids
// const uuid = require('./helpers/uuid');
let dbjson = require('./db/db.json')
const fs = require('fs')
const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) =>
  res.json(dbjson)
);

app.post('/api/notes', (req, res) => {
  let newNote = {
    title:req.body.title,
    text:req.body.text,
    id:Math.random()
  }
  dbjson.push(newNote)
  fs.writeFileSync('./db/db.json', JSON.stringify(dbjson))
  res.json(dbjson)
}
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
