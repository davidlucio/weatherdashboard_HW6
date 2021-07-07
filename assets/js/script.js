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
                    displayCurrentWeather(data);
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
                    displayCurrentForecast(data);
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

function displayCurrentWeather(data){
    
    weatherWidget.removeClass('nocity');
    var currentReport = weatherWidget.find('#currentcity');
    
    currentReport.find('h3').text(data.name + "     (" + moment().format("M/D/YYYY") + ")");
    currentReport.find('#displayWeather span').text(data.weather[0].main);
    currentReport.find('#displayTemp span').text(data.main.temp);
    currentReport.find('#displayWind span').text(data.wind.speed);
    currentReport.find('#displayHumidity span').text(data.main.humidity);

    // SAVE TO LOCAL STORAGE
    setSearchHistory(data.name)

    // Populate the forecast area
    checkForecast(data.name);
}

function displayCurrentForecast(data){

    var fiveDayForecast = weatherWidget.find('#forecast');
    var dayCounter = 1;

    for(i=7; i<=39; i+=8){
        var forecastReport = fiveDayForecast.find(`.forecast-day#day${dayCounter}`);

        forecastReport.find('h4').text( moment.unix( data.list[i].dt ).format("M/D/YYYY") );
        forecastReport.find('.forecast-skies span').text(data.list[i].weather[0].main);
        forecastReport.find('.forecast-temp span').text(data.list[i].main.temp);
        forecastReport.find('.forecast-wind span').text(data.list[i].wind.speed);
        forecastReport.find('.forecast-humid span').text(data.list[i].main.humidity);

        dayCounter++;
    }

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

function getSearchHistory(){

    var historyBlock = $("aside #searchhistory");
    var weatherHistory = JSON.parse( localStorage.getItem("weatherhistory") );
    historyBlock.html("");

    if(weatherHistory !== null){
        historyBlock.addClass("has-history");
        for(i=0; i<weatherHistory.length; i++){
            var newButton = `<button class="history btn-block" name="${weatherHistory[i]}">${weatherHistory[i]}</button>`;
            historyBlock.append(newButton);
        }
    }

    $("button.history").click( function(){
        var historyCity = $(this).attr("name");
        checkWeather(historyCity);
    });

}

function setSearchHistory(location){

    var weatherHistory = JSON.parse( localStorage.getItem("weatherhistory") );

    // Add it ONLY if it doesn't exist...
    if(weatherHistory !== null ){

        if( weatherHistory.includes( location ) ){
            // It already exists. Do nothing.
        }
        else{
            // It doesn't exist yet. Push it.
            weatherHistory.push(location);
        }
        
    }
    else{
        // There is no localstorage yet. Create it.
        weatherHistory = [location];
    }

    localStorage.setItem( "weatherhistory", JSON.stringify(weatherHistory) );

    // Repopulate the left-hand search bar.
    getSearchHistory();
}

getSearchHistory();