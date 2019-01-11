var downloadUrl = "";

function requestDownload(songId, dlUrl) {
    $("input[name='id']").val(songId);
    downloadUrl = dlUrl;
    $("#dl-form").submit();
}

$(document).ready(function() {
    $("#dl-form").submit(function(e) {
        if (receivedSuccess)
            return true;

        e.preventDefault();
        var clientId = getClientId();
        $("input[name='clientId']").val(clientId);

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
                toggleCaptchaPopup(true);
                return false;
            }
        });
    });
});