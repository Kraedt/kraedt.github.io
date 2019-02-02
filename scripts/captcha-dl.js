var downloadUrl = "";

function requestDownload(songId, dlUrl) {
    $("input[name='id']").val(songId);
    downloadUrl = dlUrl;

    var clientId = getClientId();
    $("input[name='clientId']").val(clientId);

    $("#dl-form").submit();
}

$(document).ready(function() {
    $("#dl-form").submit(function(e) {
        if (sessionStorage.getItem("receivedSuccess") === "true")
            return true;

        e.preventDefault();

        captchaCompleteAutoForm = "#dl-form";

        $.ajax({
            type: "POST",
            crossDomain: true,
            url: downloadUrl,
            data: $("#dl-form").serialize(),
            success: function(response) {
                if (response.startsWith("Error")){
                    alert(response);
                }
            },
            error: function(err) {
                console.log("Error: " + JSON.stringify(err));
                toggleModalPopup('captcha-popup', true);
                return false;
            }
        });
    });
});