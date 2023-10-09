/*
    Assignment #4
    {Your name here}
*/

$(function () {
    // your code here

    $(function () {
        // Check if geolocation is supported
        if (!navigator.geolocation) {
            $('#locationhere').html('Geolocation is not supported by your browser');
            return;
        }
    
        function success(position) {
            var latitude  = position.coords.latitude;
            var longitude = position.coords.longitude;
    
            $('#locationhere').html('<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>');
    
            // Check local storage
            var storedLocation = localStorage.getItem('location');
            if (storedLocation) {
                var parsedLocation = JSON.parse(storedLocation);
                var distance = calcDistanceBetweenPoints(latitude, longitude, parsedLocation.latitude, parsedLocation.longitude);
                distance = distance / 1000; // convert to kilometers
                $('#locationhere').append('<p>Welcome back! You traveled ' + distance.toFixed(2) + ' km since your last visit.</p>');
            } else {
                $('#locationhere').append('<h2>Welcome to the page for the first time!</h2>');
            }
    
            // Store current location in local storage
            localStorage.setItem('location', JSON.stringify({latitude: latitude, longitude: longitude}));
        }
    
        function error() {
            $('#locationhere').html('Unable to retrieve your location');
        }
    
        navigator.geolocation.getCurrentPosition(success, error);
    });




    // DO NOT EDIT ANY CODE IN THIS FUNCTION DEFINTION
    // function to calculate the distance in metres between two lat/long pairs on Earth
    // Haversine formula - https://en.wikipedia.org/wiki/Haversine_formula
    // Aren't those cool variable names? Yah gotta love JavaScript
    function calcDistanceBetweenPoints(lat1, lon1, lat2, lon2) {
        var toRadians = function (num) {
            return num * Math.PI / 180;
        }
        var R = 6371000; // radius of Earth in metres
        var φ1 = toRadians(lat1);
        var φ2 = toRadians(lat2);
        var Δφ = toRadians(lat2 - lat1);
        var Δλ = toRadians(lon2 - lon1);

        var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return (R * c);
    }
});


