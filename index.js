var express = require('express');
var app = express();
var figlet = require('figlet');
var fs = require('fs');

app.get('/', function(req, res) {

    fs.readFile('./words.json', 'utf8', function (err, data) {
        if (err) throw err;
        var objw = JSON.parse(data);
        var words = objw.words;
        word = words[Math.floor(Math.random() * words.length)];
        fs.readFile('./fonts.json', 'utf8', function (err, data) {
            if (err) throw err;
            var objf = JSON.parse(data);
            var fonts = objf.fonts;
            font = fonts[Math.floor(Math.random() * fonts.length)];
            figlet.text(word, {
                    'font': font,  
                    'horizontalLayout': 'default',
                    'verticalLayout': 'default'}, 
                function(err, data) {
                    if (err) throw err;

                    var rVal = {};
                    rVal.word = word;
                    rVal.capta = data.split('\n');
                    res.json(rVal);
                });
        });
    });



});

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Listening on port #' + port);
});