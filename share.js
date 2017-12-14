function share() {
    var url = encodeURIComponent(location.href);
    window.open('https://tinyurl.com/api-create.php?url=' + url);
}