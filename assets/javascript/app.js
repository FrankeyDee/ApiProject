//opentable api
var baseOpenTableUrl = 'https://opentable.herokuapp.com/api'  


function listRestaurants (restaurants) {
    console.log(restaurants);
    console.log(restaurants[0].name);
    console.log(restaurants[0].address);
    console.log(restaurants[0].area);
    console.log(restaurants[0].reserve_url);
    // --------------
    console.log(restaurants[1].name);
    console.log(restaurants[1].address);
    console.log(restaurants[1].area);
    console.log(restaurants[1].reserve_url);
    //
    console.log(restaurants[2].name);
    console.log(restaurants[2].address);
    console.log(restaurants[2].area);
    console.log(restaurants[2].reserve_url);
}

// -------

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




//----------------------------------------------------------------------

// ticket master api
function listEvents(events) {
    console.log(events)
    //console.log(url.name)
}
var api = "https://app.ticketmaster.com/discovery/v2/events.json?";
var eventSize = "&size=5";
//var latLong = "&latlong";
//var laArea = "&classificationName=music&dmaId=324"
//var countryCode = "&countryCode=US";
//var eventImages = "&images=5";
//var nameOfEvents = ""
//var venuCity = "&city";
var zip = "postalCode=";
var apiKey = "&apikey=4BGuvHwzMdA9AzDaqHDjGGVAV5oWB8m6";
// ticket master api

//get Ticketmaster info by zip code search//
function getEventsByZip (zipCode) {
    $.ajax({
        type:"GET",
        url: api + zip + zipCode + eventSize + apiKey,
        async:true,
        dataType: "json",
        success: function(ticketmasterResults) {

            $('#ticket-links').html('');

//             // array for ticketMasterResults
// var ticketmasterResults = [listEvents(json._embedded.events[0].name),listEvents(json._embedded.events[1].name),listEvents(json._embedded.events[2].name)];
            // console.log(ticketmasterResults)
            if (ticketmasterResults._embedded && ticketmasterResults._embedded.events) {
                var events = ticketmasterResults._embedded.events
                console.log(ticketmasterResults);
            // console.log(json._embedded.events[0].name);  // output same as 45 below
            // create a loop for name, date and link
                // listEvents(json);
                // ----------------------------------

                // // ticketmasterResults loop
                for (var i = 0; i < events.length; i++) { 
                    var ticket = events[i];
                    var someObj = {
                        name: ticket.name,
                        url: ticket.url,
                        date: ticket.dates.start.localDate,
                        image: ticket.images[3].url,
                    };

                    placeLinkOnDOM(someObj);
                    
                    // console.log(someObj);
                }
            } else {
                // we didn't find events in you area
                console.log('no events in your area');
            }

            // var band = listEvents(json._embedded.events[0].name);
            // var band = listEvents(json._embedded.events[1].name);
            // var band = listEvents(json._embedded.events[2].name);


            // listEvents(json._embedded.events[3].name);
            // listEvents(json._embedded.events[4].name);
            // //-----------------------
            // var musicDates = listEvents(json._embedded.events[0].dates.start.localDate);
            // var musicDates = listEvents(json._embedded.events[1].dates.start.localDate);
            // var musicDates = listEvents(json._embedded.events[2].dates.start.localDate);
            //  // ------------------------------
            // var webPage = listEvents(json._embedded.events[0].url);
            // var webPage = listEvents(json._embedded.events[1].url);
            // var webPage = listEvents(json._embedded.events[2].url);
            // ------------------------------------
             //var ticketLimit = listEvents(json._embedded.events[0].ticketLimit.info);
             //var ticketLimit = listEvents(json._embedded.events[1].ticketLimit.info);
             //var ticketLimit = listEvents(json._embedded.events[2].ticketLimit.info);
            // // ------------------------
            // Parse the response.
            // Do other things.
            // console.log(band);
            // console.log(musicDates);
            // console.log(webPage);


        },
        error: function(xhr, status, err) {
            // This time, we do not end up here!
        }
    });
}

    /**
     * @param {
     *  name: string,
     *  url: string,
     *  date: string,
     * 
     * }
     */
    // passing the name of the band
function placeLinkOnDOM(coolObj){
    // create empty link
    var listLink =  $("<li>");
    var ticketLink = $("<a>").text('Tickets for ' + coolObj.name);

    var ticketImage = coolObj.image;
    listLink.append('<img src="'+ ticketImage + '" width="200" height="150">');
    // document.createElement('a')
    // give link some content
    ticketLink.attr('href',  coolObj.url);
    ticketLink.attr('target', '_blank');
    // add attribute href to link
    listLink.append( ticketLink );
    $('#ticket-links').append(listLink);

    var ticketDate = coolObj.date;
    listLink.append('<br> Date: ' + ticketDate);

    
}

// On click for event information
$(document).ready(function () {

    $("#zip-code-button").on("click", function(event) {
        event.preventDefault();
        var zipCode = $('#zip-code-input').val().trim();

        getRestaurantsByZip(zipCode);

        getEventsByZip(zipCode);

    });

});

// name.name
// name.dates.access.startDateTime
// name.url