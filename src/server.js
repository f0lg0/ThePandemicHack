const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.static('public'));
app.use(express.static('public/charts'));
app.use(express.static('public/data'));



app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/results', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/charts/results.html'));
});

app.get('/upload', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/upload.html'));
});

app.listen(8080);
console.log("Server running at http://localhost:8080");
