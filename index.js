var P = require('p-promise');
var _ = require('underscore');
var request = require('request');
var dloader = require('./dloader.js');

var conf = {
    apiKey: 'AIzaSyCiCzxxePhQjjz-htKYJf4Mho_4JVGDGLc'
}

main();

function main() {
    checkVideos().then(function(videos) {
        for (video in videos)
            dloader.getVideo(videos[video].snippet);
    });
    checkMusics().then(function(musics) {
        for (music in musics)
            dloader.getMusic(musics[music].snippet);
    });
}

function checkVideos() {
    var defer = P.defer();
    request('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLXDnw3RsKGipSuzqXtiQWP8_QMPSnlFgD&key=' + conf.apiKey,
            function(err, response, res) {
                if (err)
                    defer.reject(err);
                else
                    defer.resolve(JSON.parse(res).items);
            });
    return defer.promise;
}

function checkMusics() {
    var defer = P.defer();
    request('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLXDnw3RsKGipVuYoD4WcdzOpy0n3JRgGE&key=' + conf.apiKey,
            function(err, response, res) {
                if (err)
                    defer.reject(err);
                else
                    defer.resolve(JSON.parse(res).items);
            });
    return defer.promise;
}
