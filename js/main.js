// WEB303 Assignment 2


document.querySelectorAll('#content-wrapper a').forEach(function(link) {
    link.addEventListener('click', function(event) {
        event.preventDefault();

        // Hide the content div
        $('#content').hide().html('');

        // Use AJAX to load the content
        var xhr = new XMLHttpRequest();
        xhr.open('GET', this.href);
        xhr.onload = function() {
            if (xhr.status === 200) {
                $('#content').html(xhr.responseText).slideToggle();
            } else {
                console.log('Request failed.  Returned status of ' + xhr.status);
            }
        };
        xhr.send();
    });
});

