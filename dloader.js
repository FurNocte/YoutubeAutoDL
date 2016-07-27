var youtubedl = require('youtube-dl');
var fs = require('fs');

function getVideo(videoSnippet) {
    fs.access(__dirname + '/videos/', function(err) {
        if (err) {
            fs.mkdir(__dirname + '/videos/', function() {
                getVideo(videoSnippet);
            });
            return;
        }
        var url = videoSnippet.resourceId.videoId;
        var title = videoSnippet.title;
        var extension = '';
        var video = youtubedl('http://www.youtube.com/watch?v=' + url,
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
            video.pipe(fs.createWriteStream(__dirname + '/videos/' + title + extension));
        });
    });
}

function getMusic(musicSnippet) {
    fs.access(__dirname + '/musics/', function(err) {
        if (err) {
            fs.mkdir(__dirname + '/musics/', function() {
                getMusic(musicSnippet);
            });
            return;
        }
        var url = musicSnippet.resourceId.videoId;
        var title = musicSnippet.title;
        var video = youtubedl('http://www.youtube.com/watch?v=' + url,
                // Optional arguments passed to youtube-dl.
                ['-f 140'],
                // Additional options can be given for calling `child_process.execFile()`.
                { cwd: __dirname });

        // Will be called when the download starts.
        video.on('info', function(info) {
            console.log('Download started');
            console.log('filename: ' + info._filename);
            console.log('size: ' + info.size);
            video.pipe(fs.createWriteStream(__dirname + '/musics/' + title + '.m4a'));
        });
    });
}

exports.getVideo = getVideo;
exports.getMusic = getMusic;
