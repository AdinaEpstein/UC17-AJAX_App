/**
 * Uses AJAX to query an internet data source for zip codes
 * @param {string} zipId The element id that has the zip code
 */
function findZip(zipId) {
    var long = 0;
    var lat = 0;
    // First get the zip code from the HTML textbox
    var zip = document.getElementById(zipId).value;
    // Now make a HTTP request
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (this.readyState === 4) {
            // We got a response from the server!
            if (this.status === 200) {
                // The request was successful!
                var place = JSON.parse(this.responseText);
                lat = place.places[1];
                long = place.places[4];
            }
            else if (this.status === 404) {
                // No postal code found
                displayPlace('{ "error" : "zip" }');
            }
            else {
                console.log("We have a problem...server responded with code: " + this.status);
            }
        }
        else {
            // Waiting for a response...
        }
    };
    // Notice how the URL is appended with the zip code
    var url = "http://api.zippopotam.us/us/" + zip;
    httpRequest.open("GET", url, true);
    httpRequest.send();

    var httpRequest2 = new XMLHttpRequest();
    httpRequest2.onreadystatechange = function () {
        if (this.readyState === 4) {
            // We got a response from the server!
            if (this.status === 200) {
                // The request was successful!
                displayPlace();
            }
            else if (this.status === 404) {
                // No postal code found
                displayPlace('{ "error" : "data" }');
            }
            else {
                console.log("We have a problem...server responded with code: " + this.status);
            }
        }
        else {
            // Waiting for a response...
        }
    };
    // Notice how the URL is appended with the zip code
    var url = "https://api.sunrise-sunset.org/json?lat="+lat+"&lng="+long+"&callback=mycallback";
    httpRequest2.open("GET", url, true);
    httpRequest2.send();
}
/**
 * Displays the zi pcode place given the JSON data
 * @param {string} data JSON data representing place for the given zip code
 */
function displayPlace(data) { //*****change display sunset/sunrise times
    var place = JSON.parse(data);
    if (place.error === "zip") {
        document.getElementById("place").className = "alert alert-warning";
        document.getElementById("place").innerHTML = "No place matches that zip code."
    }
    else if (place.error === "data") {
         document.getElementById("place").className = "alert alert-warning";
        document.getElementById("place").innerHTML = "Sunrise and Sunset data is not available for this zip"
    }
    else {
        document.getElementById("place").className = "alert alert-success";
        document.getElementById("place").innerHTML = "Sunrise: " + result.sunrise + "Sunset: " + result.sunset;
    }
}
