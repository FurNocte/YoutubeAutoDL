var express = require('express');
var api = require('./core/api.js');

var app = express();
// API
app.get('/api/refresh', function(req, res) {
    api.refreshList().then(function(r) {
        res.status(200).json(r);
    }).fail(function(err) {
        res.status(503).json(err);
    });
});

app.get('/api/musics', function(req, res) {
    api.getMusics().then(function(list) {
        res.status(200).json(list);
    }).fail(function(err) {
        res.status(503).json(err);
    });
});

app.get('/api/musics/:id', function(req, res) {
    api.getMusics(req.params.id).then(function(name) {
        res.status(200).json(name);
    }).fail(function(err) {
        res.status(503).json(err);
    });
});

app.get('/api/videos', function(req, res) {
    api.getVideos().then(function(list) {
        res.status(200).json(list);
    }).fail(function(err) {
        res.status(503).json(err);
    });
});

app.get('/api/videos/:id', function(req, res) {
    api.getVideos(req.params.id).then(function(list) {
        res.status(200).json(list);
    }).fail(function(err) {
        res.status(503).json(err);
    });
});


// UI
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/ui/index.html');
});

app.get('*', function(req, res) {
    var path = req.path.replace(/%20/g, ' ');
    res.sendFile(__dirname + '/ui' + path);
});

app.listen(8080);
