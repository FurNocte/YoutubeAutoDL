var fs = require('fs');
var P = require('p-promise');
var exec = require('child_process').exec;
var request = require('request');
var dloader = require('./dloader.js');

var conf = {
        apiKey: 'AIzaSyCiCzxxePhQjjz-htKYJf4Mho_4JVGDGLc'
}

function getStatus() {
    return true;
}

function getMusics(index) {
    var defer = P.defer();
    fs.readdir(__dirname + '/musics', function(err, files) {
        if (err)
            defer.reject(err);
        else {
            if (index)
                defer.resolve(files[index]);
            else
                defer.resolve(files);
        }
    });
    return defer.promise;
}

function getMusicById(id) {
    var defer = P.defer();
    dloader.getMusicById(id).then(function(path) {
        defer.resolve(path);
    }).fail(function(err) {
        defer.reject(err);
    });
    return defer.promise;
}

function getVideos(index) {
    var defer = P.defer();
    fs.readdir(__dirname + '/videos', function(err, files) {
        if (err)
            defer.reject(err);
        else {
            if (index)
                defer.resolve(files[index]);
            else
                defer.resolve(files);
        }
    });
    return defer.promise;
}

function getVideoById(id) {
    var defer = P.defer();
    dloader.getVideoById(id).then(function(path) {
        defer.resolve(path);
    }).fail(function(err) {
        defer.reject(err);
    });
    return defer.promise;
}

function refreshList() {
    var defer = P.defer();
    exec('node core/index.js', (error, stdout, stderr) => {
        if (error) {
            error.stderr = stderr;
            defer.reject(error);
        }
        else
            defer.resolve(stdout);
    });
    return defer.promise;
}

//addMusicToList('fQczFltChPE');
function addMusicToList(id) {
    request.post({url: 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=AIzaSyCiCzxxePhQjjz-htKYJf4Mho_4JVGDGLc', form:
        {
            "snippet": {
                "playlistId": "PLXDnw3RsKGipVuYoD4WcdzOpy0n3JRgGE",
                "resourceId": {
                    "kind": "youtube#video",
                    "videoId": "tJYR3WIUeUg"
                }
            }
        }
    }, function(err, response, body) {
        //console.log(response);
        console.log(body);        
    });
}

exports.getStatus = getStatus;
exports.getMusics = getMusics;
exports.getMusicById = getMusicById;
exports.getVideos = getVideos;
exports.getVideoById = getVideoById;
exports.refreshList = refreshList;
