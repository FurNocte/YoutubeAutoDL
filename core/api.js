var fs = require('fs');
var P = require('p-promise');
var exec = require('child_process').exec;

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

exports.getMusics = getMusics;
exports.getVideos = getVideos;
exports.refreshList = refreshList;
