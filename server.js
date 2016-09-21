var express = require('express');
var api = require('./core/api.js');

var app = express();
// Routes
app.get('/api/musics', function(req, res) {
    api.getMusics().then(function(list) {
        res.send(list);  
    }).fail(function(err) {
        res.send(err);
    });
});

app.get('/api/musics/:id', function(req, res) {
    api.getMusics(req.params.id).then(function(name) {
        res.send(name); 
    }).fail(function(err) {
        res.send(err);
    });
});

app.get('/api/videos', function(req, res) {
    api.getVideos().then(function(list) {
        res.send(list);  
    }).fail(function(err) {
        res.send(err);
    });
});

app.listen(8081);
