var showOnPages = ['music', 'songs', 'albums'];

$(document).ready(function () {
    var location = window.location.href;
    var split = location.split('/');
    var currentPage = split[split.length - 2];

    var dontShow = localStorage.getItem('shouldShowFollowPopup') === "false";

    if (!dontShow && showOnPages.includes(currentPage)) {
        toggleModalPopup('follow-popup', true);
    }
});

function dontShowAgain() {
    localStorage.setItem('shouldShowFollowPopup', "false");
    toggleModalPopup('follow-popup', false);
}