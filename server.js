const express = require('express');
const { readFileSync } = require('fs');
const path = require('path');
const { v4: uuid4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(PORT, () =>
console.log(`Example app listening at http://localhost:${PORT}`)
);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
  });

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
  });

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'Main/db.json'));
    console.log(`${req.method} request received to get notes`);
});

app.post('/api/notes', (res, req) => {
    // Create (persist) data
    console.info(`${req.method} request received to add a review`);

    const { title, text } = req.body;
      // If all the required properties are present
      if (title && text) {
        // Variable for the object we will save
        const newNote = {
          title,
          text,
          id: uuid4()
        };
    
        const response = {
          status: 'success',
          body: newNote,
        };
    
        console.log(response);
        res.status(201).json(response);
      } else {
        res.status(500).json('Error in posting note');
      }
    });
  
  app.get('/notes', (req, res) => {
      res.sendFile(path.join(__dirname, 'public/notes.html'))
  });

    //Push
