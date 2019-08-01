$( document ).ready(function() {

//connecting to Opentable API
var queryURL = 'https://opentable.herokuapp.com/api';

$.ajax({
    url: queryURL,
    method: 'GET'
}).then(function(response){
    console.log(response);
})
});
