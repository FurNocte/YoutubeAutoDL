var ffmpeg = require('ffmpeg');
var fs = require('fs');

function convert(input, output) {
    try {
        var process = new ffmpeg(input);
        process.then(function (video) {
            video.fnExtractSoundToMP3(output, function (error, file) {
                if (!error) {
                    console.log('Audio file: ' + file);
                    fs.unlink(input);
                }
            });
        }, function (err) {
            console.log('Error: ' + err);
        });
    } catch (e) {
        console.log(e.code);
        console.log(e.msg);
    }
}

exports.convert = convert;
