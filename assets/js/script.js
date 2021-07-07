var apiKey = "67441c74d353ce8e981d3bf51bb93d38";
var apiURL = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=imperial&q=`;
  
function checkWeather(location) {
    var queryURL = apiURL + location;

    fetch(queryURL)
        .then( function(response){

            // Response?
            console.log(response.status);

            return response.json();
        })
        .then( function(data){

            // Make sure to look at the response in the console and read how 404 response is structured.
            console.log(data);
            
        });
}