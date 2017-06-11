var youtubedl = require('youtube-dl');
var request = require('request');
var fs = require('fs');

var conf = {
    apiKey: 'AIzaSyCiCzxxePhQjjz-htKYJf4Mho_4JVGDGLc'
}

function getVideo(videoSnippet) {
    fs.exists(__dirname + '/videos/', function(exists) {
        if (!exists) {
            fs.mkdir(__dirname + '/videos/', function() {
                getVideo(videoSnippet);
            });
            return;
        }
        var url = videoSnippet.resourceId.videoId;
        var title = videoSnippet.title.replace(/ /g, '_').split('');
        title = title.map(function(el) {
            if (el.charCodeAt(0) < 48 || (el.charCodeAt(0) > 57 && el.charCodeAt(0) < 65) || el.charCodeAt(0) > 122)
                return '';
            else
                return el;
        });
        title = title.join().replace(/,/g, '');
        console.log(title);
        var extension = '';
        var video = youtubedl('http://www.youtube.com/watch?v=' + url,
                // Optional arguments passed to youtube-dl.
                ['-f best'],
                // Additional options can be given for calling `child_process.execFile()`.
                { cwd: __dirname,
                maxBuffer: 250000*1024});

        // Will be called when the download starts.
        video.on('info', function(info) {
            extension = info._filename.match(/\..{3,4}$/)[0];
            console.log('Download started');
            console.log('filename: ' + info._filename);
            console.log('size: ' + info.size);
            video.pipe(fs.createWriteStream(__dirname + '/videos/' + title + extension));
        });
    });
}

function getMusic(musicSnippet) {
    fs.exists(__dirname + '/musics/', function(exists) {
        if (!exists) {
            fs.mkdir(__dirname + '/musics/', function() {
                getMusic(musicSnippet);
            });
            return;
        }
        var url = musicSnippet.resourceId.videoId;
        var title = musicSnippet.title.replace(/ /g, '_').split('');
        title = title.map(function(el) {
            if (el.charCodeAt(0) < 48 || (el.charCodeAt(0) > 57 && el.charCodeAt(0) < 65) || el.charCodeAt(0) > 122)
                return '';
            else
                return el;
        });
        title = title.join().replace(/,/g,'');
        console.log(title);
        var music = youtubedl('http://www.youtube.com/watch?v=' + url,
                // Optional arguments passed to youtube-dl.
                ['-f 140'],
                // Additional options can be given for calling `child_process.execFile()`.
                { cwd: __dirname,
                maxBuffer: 250000*1024});

        // Will be called when the download starts.
        music.on('info', function(info) {
            console.log('Download started');
            console.log('filename: ' + info._filename);
            console.log('size: ' + info.size);
            music.pipe(fs.createWriteStream(__dirname + '/musics/' + title + '.m4a'));
        });
    });
}

function getVideoByUrl(url) {
    var id = url.match(/watch\?v=(?=([a-z|0-9]*))/i)[1];
    request('https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + id + '&key=' + conf.apiKey,
            function(err, response, res) {
                if (err)
                    return err;
                else {
                    res = JSON.parse(res);
                    var videoSnippet = res.items[0].snippet;
                    var title = videoSnippet.title;
                    var extension = '';
                    var video = youtubedl('http://www.youtube.com/watch?v=' + id,
                            // Optional arguments passed to youtube-dl.
                            ['-f best'],
                            // Additional options can be given for calling `child_process.execFile()`.
                            { cwd: __dirname });

                    // Will be called when the download starts.
                    video.on('info', function(info) {
                        extension = info._filename.match(/\..{3,4}$/)[0];
                        console.log('Download started');
                        console.log('filename: ' + info._filename);
                        console.log('size: ' + info.size);
                        video.pipe(fs.createWriteStream('/tmp/' + title + extension));
                    });
                }
            });
}

function getMusicByUrl(url) {
    var id = url.match(/watch\?v=(?=([a-z|0-9]*))/i)[1];
    request('https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + id + '&key=' + conf.apiKey,
            function(err, response, res) {
                if (err)
                    return err;
                else {
                    res = JSON.parse(res);
                    var videoSnippet = res.items[0].snippet;
                    var title = videoSnippet.title;
                    var video = youtubedl('http://www.youtube.com/watch?v=' + id,
                            // Optional arguments passed to youtube-dl.
                            ['-f 140'],
                            // Additional options can be given for calling `child_process.execFile()`.
                            { cwd: __dirname });

                    // Will be called when the download starts.
                    video.on('info', function(info) {
                        console.log('Download started');
                        console.log('filename: ' + info._filename);
                        console.log('size: ' + info.size);
                        video.pipe(fs.createWriteStream('/tmp/' + title + '.m4a'));
                    });
                }
            });
}

exports.getVideo = getVideo;
exports.getMusic = getMusic;
exports.getVideoByUrl = getVideoByUrl;
exports.getMusicByUrl = getMusicByUrl;
