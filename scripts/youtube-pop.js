var toggled = false;

function toggleYoutubeEmbed() {
    toggled = !toggled;

    var e = document.getElementById("youtube-embed");
    e.style.display = toggled ? "initial" : "none";
}