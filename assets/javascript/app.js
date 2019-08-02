var baseOpenTableUrl = 'https://opentable.herokuapp.com/api';

function listRestaurants (restaurants) {
    console.log(restaurants);
}

function getRestaurantsByZip (zip) {
    $.ajax({
        ///need to modify Line 13 with correct search query URL
        url: baseOpenTableUrl + "/restaurants?zip=" + zip,
        method: 'GET'
    })
    .then(function (response) {
        listRestaurants(response.restaurants);
    })
}

function listEvents(events) {
    console.log(events)
}

function getEventsByZip (zip) {
    $.ajax({
        type:"GET",
        url:"https://app.ticketmaster.com/discovery/v2/events.json?dates.localDate&postalCode=" 
        + zip + "&apikey=4BGuvHwzMdA9AzDaqHDjGGVAV5oWB8m6",
        async:true,
        dataType: "json",
        success: function(json) {
            // console.log(json);
            listEvents(json._embedded.events)
            // Parse the response.
            // Do other things.
        },
        error: function(xhr, status, err) {
            // This time, we do not end up here!
        }
    });
}

$(document).ready(function () {

    $("#zip-code-button").on("click", function(event) {
        event.preventDefault();
        var zipCode = $('#zip-code-input').val().trim();

        getRestaurantsByZip(zipCode);

        getEventsByZip(zipCode);

    });

});
