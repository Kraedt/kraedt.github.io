var captchaCompleteAutoForm = "";

function getClientId() {
    var clientId = sessionStorage.getItem("clientId");

    if (!clientId || clientId.length === 0) {
        clientId = generateGuid();
        sessionStorage.setItem("clientId", clientId);
    }

    return clientId
}

function toggleModalPopup(id, value) {
    var i = "#" + id;
    $("#" + id)[0].style.display = value ? 'block' : 'none';
}

function autoSubmitCaptchaForm() {
    $("#captcha-form").submit();
}

window.onload = function () {
    const devSecret = "6LfUd4gUAAAAAPSaalhetzFMPD-rflobF69-FxDS";
    const prodSecret = "6LePdYgUAAAAAHtrf48MGpVTLTUERCj1h6296ynv";

    var key = location.hostname === "localhost" || location.hostname === "127.0.0.1"
        ? devSecret
        : prodSecret;

    var loadCaptcha = function(){
        captchaContainer = grecaptcha.render('captcha', {
            'sitekey' : key,
            'callback': autoSubmitCaptchaForm,
            'theme': 'dark'
        });
        document.getElementById("captcha").classList.add("div-center-fixed");
    }
    loadCaptcha();

    window.onclick = function(event) {
        if (event.target == document.getElementById("captcha-popup")) {
            toggleModalPopup('captcha-popup', false);
        }
    }
}

function generateGuid() {
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}