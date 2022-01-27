const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));

app.listen(PORT, () =>
console.log(`Example app listening at http://localhost:${PORT}`)
);

app.get('/', (req, res) => {
    res.send('Navigate to /send or /routes');
});

app.get('/api/notes', (req, res) => {
    //send the file 'notes.html' 
    res.json(/*send note data*/);
});

app.post('/api/notes', (res, req) => {
    // Create (persist) data

    //Push
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
});