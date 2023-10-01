$(document).ready(function() {
    ajaxMethod();
});

function JsonMethod() {
    $.getJSON("team.json", function(data) {
        $.each(data, function(key, value) {
            $("#team").append('<h2>' + value.name + '</h2>');
            $("#team").append('<h5>' + value.position + '</h5>');
            $("#team").append('<p>' + value.bio + '</p>');
        });
    });
}

function ajaxMethod() {
    $("#team").html("Loading...");
    $.ajax({
        url: "team.json",
        type: "GET",
        success: function(data) {
            $("#team").empty();
            $.each(data, function(key, value) {
                $("#team").append('<h2>' + value.name + '</h2>');
                $("#team").append('<h5>' + value.position + '</h5>');
                $("#team").append('<p>' + value.bio + '</p>');
            });
        },
        error: function() {
            $("#team").html("The content could not be retrieved.");
        },
        beforeSend: function() {
            setTimeout(function() {}, 3000);
        }
    });
}
