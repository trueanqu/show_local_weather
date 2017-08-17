$(document).ready(function () {

    getLocation();
});

var weatherApiBaseUrl = "https://fcc-weather-api.glitch.me/api/current?";
var currentTempC;
var currentTempF;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeather);
    } else console.log("Couldn't get access to geolocation.");
}

function getWeather(position) {
    var apiRequestUrl = weatherApiBaseUrl + "lon=" + position.coords.longitude + "&lat=" + position.coords.latitude;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            showWeather(data);
        }
    };
    xhttp.open("GET", apiRequestUrl, true);
    xhttp.send();
}

function showWeather(weatherData) {
    $("#city").text(weatherData.name);
    $("#icon").append('<img src="' + weatherData.weather[0].icon + '" alt="weather_icon"/>');
    currentTempC = weatherData.main.temp;
    currentTempF = (weatherData.main.temp * 9 / 5 ) + 32;
    $("#tempC").html(currentTempC + "<a class='units'> °C</a>");
    $("#tempF").html(currentTempF + "<a class='units'> °F</a>").attr("hidden", true);
    addUnitsSwitcher();
    $("#weather-main").text(weatherData.weather[0].main + " (" + weatherData.weather[0].description + ").");
}

function addUnitsSwitcher() {
    $(".units").on("click", function () {
        if (!$("#tempF").attr("hidden")) {
            $("#tempF").attr("hidden", true);
            $("#tempC").attr("hidden", false);
        } else {
            $("#tempF").attr("hidden", false);
            $("#tempC").attr("hidden", true);
        }
    });
}
