loadPage();

function loadPage() {
    getMusics();
    getVideos();
}

function getMusics() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", 'http://127.0.0.1:8081/api/musics', false); // false for synchronous request
    xhttp.send(null);
    var list = JSON.parse(xhttp.responseText);
    for (var item in list) {
        $('#list_musics').append('<a href="./musics/'+ list[item] + '" download>' + list[item] + '</a><br/>');
    }
}

function getVideos() {
    xhttp = new XMLHttpRequest();
    xhttp.open("GET", 'http://127.0.0.1:8081/api/videos', false); // false for synchronous request
    xhttp.send(null);
    var list = JSON.parse(xhttp.responseText);
    for (var item in list) {
        $('#list_videos').append('<a href="./videos/'+ list[item] + '" download>' + list[item] + '</a><br/>');
    }
}
