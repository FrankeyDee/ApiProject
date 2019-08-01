$( document ).ready(function() {

    //arrays and variables
var restaurants = [
    'placeholder 1', 'placeholder 2', 'placeholder 3'
]

//connecting to Opentable API
    var queryURL = 'https://opentable.herokuapp.com/api';

    $.ajax({
        ///need to modify Line 13 with correct search query URL
        url: queryURL,
        method: 'GET'
    }).then(function(response){
        console.log(response);
})









});
