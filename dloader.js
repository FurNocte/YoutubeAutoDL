var youtubedl = require('youtube-dl');
var fs = require('fs');

function getVideo(videoSnippet) {
    var url = videoSnippet.resourceId.videoId;
    var title = videoSnippet.title;
    var video = youtubedl('http://www.youtube.com/watch?v=' + url,
            // Optional arguments passed to youtube-dl.
            ['-f bestvideo+bestaudio'],
            // Additional options can be given for calling `child_process.execFile()`.
            { cwd: __dirname });

    // Will be called when the download starts.
    video.on('info', function(info) {
        console.log('Download started');
        console.log('filename: ' + info._filename);
        console.log('size: ' + info.size);
    });

    video.pipe(fs.createWriteStream('./videos/' + title + '.mp4'));
}

function getMusic(musicSnippet) {
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
    });

    video.pipe(fs.createWriteStream('./musics/' + title + '.m4a'));
}

exports.getVideo = getVideo;
exports.getMusic = getMusic;
