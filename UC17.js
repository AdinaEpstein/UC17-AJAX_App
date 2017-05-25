function findCarrier(numId) {
    // First get the phone number from the HTML textbox
    var num = document.getElementById(numId).value;
    // Now make a HTTP request
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (this.readyState === 4) {
            // We got a response from the server!
            if(this.status === 200) {
                // The request was successful!
                displayCarrier(this.responseText);
            } else if (this.status === 404){
                // No postal code found
                displayCarrier('{ "carrier" : "none" }');
            } else {
                console.log("We have a problem...server responded with code: " + this.status);
            }
        } else {
            // Waiting for a response...
        }
    };

    var url = "http://apilayer.net/api/validate?access_key=4cf5d799a3b182b9344b75f4c942b47a&number=" +  num + "&country_code=&format=1";
    httpRequest.open("GET", url, true);
    httpRequest.send();
}

function displayCarrier(data){
    var place = JSON.parse(data);
    var carrier = place.carrier;
    if(place.carrier === "none") {
        document.getElementById("place").className = "alert alert-warning";
        document.getElementById("place").innerHTML = "No carrier matches that number."
    } else {
        document.getElementById("place").className = "alert alert-success";
        document.getElementById("place").innerHTML = place.carrier;
    }
}
