var cityLat;
var cityLon;
var apiUrl2;
var cityName;
var date;
var temp;
var humidity;
var windspeed;
var weatherIcon;
var uvIndex;
{/* <h3 id="temp">Temp:</h3>
<h3 id="wind">Wind:</h3>
<h3 id="humidity">Humidity:</h3>
<h3 id="uv">UV Index:</h3> */}
var htmlTemp = document.querySelector('#temp');
var htmlWind = document.querySelector('#wind');
var htmlHumidity = document.querySelector('#humidity');
var htmlUv = document.querySelector('#uv');
var myCity = document.querySelector('#myCity');
var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=hong kong&appid=6665733097ff1de29ed2779c3bf3ce43";
var getUserRepos = function () {
    // // format the github api url

    // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

    // make a request to the url
    fetch(apiUrl)
        .then(function (response) {
            // request was successful
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data)
                    cityLat = data.coord.lat;
                    cityLon = data.coord.lon;
                   apiUrl2 = "https://api.openweathermap.org/data/2.5/weather?lat=" + cityLat + "&lon=" + cityLon + "&appid=6665733097ff1de29ed2779c3bf3ce43";
                    fetch(apiUrl2)
                        .then(function (response) {
                            // request was successful
                            if (response.ok) {
                                response.json().then(function (data) {
                                    console.log(data);
                                    cityName = data.name;
                                    date = data.dt + data.timezone;
                                    temp = data.main.temp;
                                    humidity = data.main.humidity;
                                    windspeed = data.wind.speed;
                                    weatherIcon = data.weather.icon;
                                    
                                    var apiUrl3 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&appid=6665733097ff1de29ed2779c3bf3ce43";
                                    fetch(apiUrl3)
                                        .then(function (response) {
                                            // request was successful
                                            if (response.ok) {
                                                response.json().then(function (data) {
                                                    console.log(data);
                                                    uvIndex = data.current.uvi;
                                                    testFunction();
                                                });

                                            } else {
                                                alert('Error: GitHub User Not Found');
                                            }
                                        })
                                });

                            } else {
                                alert('Error: GitHub User Not Found');
                            }
                        })
                });

            } else {
                alert('Error: GitHub User Not Found');
            }
        })
        .catch(function (error) {
            // Notice this `.catch()` getting chained onto the end of the `.then()` method
            alert("Unable to connect to GitHub");
        });
};

var testFunction = function () {
    console.log(cityName);
    var current_datetime = new Date(1970, 0, 1); // Epoch
    current_datetime.setSeconds(date);

    let formatted_date = (current_datetime.getMonth() + 1) + "/" + (current_datetime.getDate()) + "/" + current_datetime.getFullYear()
    console.log(formatted_date)
    var F = 1.8 * (temp - 273) + 32;
    F = parseFloat(F).toFixed(2)
    console.log(F + "F");

    console.log(humidity);
    console.log(windspeed);
    // console.log(weatherIcon);
    console.log(uvIndex);

    myCity.innerHTML = cityName + "  (" + formatted_date +")" ;
    htmlWind.innerHTML = "Wind: " + windspeed + " MPH";
    htmlTemp.innerHTML = "Temp: " + F + "&#8457";
    htmlHumidity.innerHTML = "Humidity: "+humidity+" %";
    htmlUv.innerHTML = "UV Index : " + uvIndex;
}
getUserRepos();

