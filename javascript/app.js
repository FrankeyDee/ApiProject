var baseOpenTableUrl = 'https://opentable.herokuapp.com/api';

function doSmthWithRestaurants (restaurants) {
    // do smth
}

function getRestaurantsByZip (zip) {
    $.ajax({
        ///need to modify Line 13 with correct search query URL
        url: baseOpenTableUrl + "/restaurants?zip=" + zip,
        method: 'GET'
    }).then(function (response) {
        doSmthWithRestaurants(response.restaurants);
        console.log(response.restaurants);
    })
}

$(document).ready(function () {

    $("#zip-code-button").on("click", function(event) {
        event.preventDefault();
        var zipCode = $('#zip-code-input').val().trim();
        getRestaurantsByZip(zipCode);
    });

});
