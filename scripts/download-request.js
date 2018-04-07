
var popupName = "wait-popup";
var formName = "hidden-form";
var downloadSite = "http://download.kraedt.com/download/ping";

var gotResponse = false;

function onDownloadRequest() {
    sendWakeup();

    // Wait some time (in ms) before showing the popup and sending the request, incase the download server is already active
    setTimeout(function (){
        if (!gotResponse)
        {
            toggleWaitPopup(true);
        }
    }, 2000);
}

function sendWakeup() {
    gotResponse = false;

    $.ajax({
        type: "POST",
        url: downloadSite,
        crossDomain: true,
        data: "hello world",
        success: function () {
            gotResponse = true;
            toggleWaitPopup(false);
        }
    })
}

function toggleWaitPopup(show) {
    document.getElementById(popupName).style.display = show ? "initial" : "none";
}