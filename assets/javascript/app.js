//opentable api
var baseOpenTableUrl = 'https://opentable.herokuapp.com/api'  

function getRestaurantsByZip (zip) {
    $.ajax({
        url: baseOpenTableUrl + "/restaurants?zip=" + zip,
        method: 'GET'
    })
    .then(function (response) {
        showOpenTableresults(response.restaurants);
        listRestaurants(response.restaurants);
    })

}

// ticket master api
function listEvents(events) {
    console.log(events)
    //console.log(url.name)
}
var api = "https://app.ticketmaster.com/discovery/v2/events.json?";
var eventSize = "&size=5";
var zip = "postalCode=";
var apiKey = "&apikey=4BGuvHwzMdA9AzDaqHDjGGVAV5oWB8m6";

//get Ticketmaster info by zip code search
function getEventsByZip (zipCode) {
    $.ajax({
        type:"GET",
        url: api + zip + zipCode + eventSize + apiKey,
        async:true,
        dataType: "json",
        success: function(ticketmasterResults) {

            $('#ticket-links').html('');

            if (ticketmasterResults._embedded && ticketmasterResults._embedded.events) {
                var events = ticketmasterResults._embedded.events
                //console.log(ticketmasterResults);
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
                    
                }
            } else {
                // we didn't find events in you area
                alert('no events in your area');
            }



        },
        error: function(xhr, status, err) {
            // This time, we do not end up here!
        }
    });
}

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
// Show showOpenTableresults of restaurants on page
function showOpenTableresults(tableArr) {
    var $table = $( "<table></table>" );
    var length = 0;
    if( tableArr.length < 5 ) {
        length = tableArr.length
    } else {
        length = 5;
    }
    for ( var i = 0; i < length; i++ ) {
        var row = tableArr[i];
        var $line = $( "<tr></tr>" );
        $line.append( $( "<img src='" + row.image_url + "'/>" ) );
        $line.append( $( "<td>" + row.name + "</td>" ) );
        $line.append( $( "<td>" + row.address + "</td>" ) );
        $line.append( $( "<td> </td>" ) ).append("<a target='_blank' href='"+ row.reserve_url + "'>Make a Reservation</a>");
        
        $table.append( $line );
    }
    $table.appendTo( $( "#open-table" ) );

    
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

