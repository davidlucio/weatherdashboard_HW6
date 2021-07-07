/** API INFO LISTED FIRST **/

var apiKey = "67441c74d353ce8e981d3bf51bb93d38";
var apiURL = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=imperial&q=`;
var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&units=imperial&q=`;

function checkWeather(location) {
    var queryURL = apiURL + encodeURIComponent(location);

    fetch(queryURL)
        .then( function(response){
            if(response.status == 200){
                // CITY FOUND, LOADING DATA
                $("input#cityname").val("");
                response.json().then( function(data){
                    displayCurrentWeather(location, data);
                })
            }
            else{
                // CITY NOT FOUND
                alert("No city by that name was found");
            }
        });

}

function checkForecast(location) {
    var queryURL = forecastURL + encodeURIComponent(location);

    fetch(queryURL)
        .then( function(response){
            if(response.status == 200){
                // CITY FOUND, LOADING DATA
                $("input#cityname").val("");
                response.json().then( function(data){
                    displayCurrentForecast(location, data);
                })
            }
            else{
                // CITY NOT FOUND
                alert("No city by that name was found");
            }
        });

}

/** DISPLAY FUNCTIONALITY **/
var weatherWidget = $("#weatherwidget");
var historyWidget = $("#searchhistory");

function displayCurrentWeather(city, data){
    
    weatherWidget.removeClass('nocity');

    var currentReport = weatherWidget.find('#currentcity');
    var fiveDayForecast = weatherWidget.find('#forecast');
    
    currentReport.find('h3').text(data.name);
    currentReport.find('#displayWeather span').text(data.weather[0].main);
    currentReport.find('#displayTemp span').text(data.main.temp);
    currentReport.find('#displayWind span').text(data.wind.speed);
    currentReport.find('#displayHumidity span').text(data.main.humidity);

    // SAVE TO LOCAL STORAGE?

    // Populate the forecast area
    checkForecast(data.name);
}

function displayCurrentForecast(city, data){

    console.log(data);

}

/** Form Submission & Button Handling **/

$( "form#searchbycity").submit(function( event ) {
    event.preventDefault();
    var cityName = $(this).find("#cityname").val();
    if(cityName != ""){
        checkWeather(cityName)
    }
    else{
        console.log("Error: Empty Request");
    }
});


$("button.history").click( function(){

    var historyCity = $(this).name();
    console.log(`History button pressed: ${historyCity}`);

});

// INCOMPLETE!