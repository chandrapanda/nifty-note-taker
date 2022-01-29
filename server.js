//Required files
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
const { v4: uuid4 } = require('uuid');

//Global variable
var savedNotes = require('./Main/db.json');

//Express usage
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//Local port listening
app.listen(PORT, () =>
console.log(`Example app listening at http://localhost:${PORT}`)
);

//Get HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
  });

app.get('/notes', (req, res) => {
res.sendFile(path.join(__dirname, '/public/notes.html'));
});

//Gets notes from JSON file
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'Main/db.json'));
    console.log(`${req.method} request received to get notes`);
});

//Posts (appends) notes to JSON file
app.post('/api/notes', (req, res) => {
    // Create (persist) data
    console.info(`${req.method} request received to add a note`);

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
        //Adds new note to array
        savedNotes.push(newNote);
        //Writes new note to file
        fs.writeFile('Main/db.json', JSON.stringify(savedNotes), function(err) {
            if (err) throw err;
        });
        //Response data console logged (ERR / NO ERR)
        console.log(response);
        res.status(201).json(response);
      } else {
        res.status(500).json('Error in posting note');
      }
    });

//Deletes notes on button press
app.delete('/api/notes/:id', function (req, res) {
    res.send(`${req.method} request received to delete note`);
    console.log(`${req.method} request received to DELETE note`);

    const id = req.params.id;

    if (id) {
        savedNotes = savedNotes.filter(item => item.id !== id)

        fs.writeFile('Main/db.json', JSON.stringify(savedNotes), function(err) {
            if (err) throw err;
            else {
                console.log(`Note ID: ${id} deleted`);
            }
        });
    }

    });

//When user types anything after / in URL, they are returned to homepage
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});
