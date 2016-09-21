var fs = require('fs');
var P = require('p-promise');

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

function getVideos() {
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

exports.getMusics = getMusics;
exports.getVideos = getVideos;
