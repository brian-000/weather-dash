var cityLat;
var cityLon;
var apiUrl2;
var cityName;
var date;
var temp;
var div;
var humidity;
var windspeed;
var weatherIcon;
var uvIndex;
var myArray = [];
var testing = 0;
var button1;
var searchForm = document.querySelector('#search-city');
var htmlTemp = document.querySelector('#temp');
var htmlWind = document.querySelector('#wind');
var htmlHumidity = document.querySelector('#humidity');
var htmlUv = document.querySelector('#uv');
var myCity = document.querySelector('#myCity');
var displayFuture = document.querySelector('#display-future');
var submitBtn = document.querySelector('#submitBtn');
var userInput = document.querySelector("#userInput");
var value;
var storedCities = [];
var getUserRepos = function () {

    const elements = document.getElementsByClassName("five-day");
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
    userInput.setAttribute("id", "userInput");
    city = document.querySelector("#userInput").value;


    // make a request to the url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=6665733097ff1de29ed2779c3bf3ce43";
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
                                                    console.log(uvIndex);
                                                    for (var i = 1; i < 6; i++) {
                                                        myArray[i] = data.daily[i];
                                                    }
                                                    testFunction();
                                                });

                                            } else {
                                                alert('Error: ');
                                            }
                                        })
                                });

                            } else {
                                alert('Error: ');
                            }
                        })
                });

            } else {
                alert('Error:');
            }
        })
        .catch(function (error) {
            // Notice this `.catch()` getting chained onto the end of the `.then()` method
            alert("Unable to connect");
        });


};

var testFunction = function () {
    // console.log("asdasdasdasdasdasdasd"+temp);
    storedCities.push(cityName);
    console.log(storedCities);
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
    myCity.innerHTML = cityName + "  (" + formatted_date + ")";
    htmlWind.innerHTML = "Wind: " + windspeed + " MPH";
    htmlTemp.innerHTML = "Temp: " + F + "&#8457";
    htmlHumidity.innerHTML = "Humidity: " + humidity + " %";
    htmlUv.innerHTML = "UV Index : " + uvIndex;


    if (uvIndex < 2) {
        htmlUv.setAttribute("class", "uvIndexGreen");
    }
    if (uvIndex > 2 && uvIndex < 5) {
        htmlUv.setAttribute("class", "uvIndexYellow");
    }
    if (uvIndex > 5 && uvIndex < 10) {
        htmlUv.setAttribute("class", "uvIndexRed");
    }
    for (var i = 1; i < 6; i++) {

        console.log(myArray[i]);
        div = document.createElement("div");
        div.setAttribute("class", "five-day");
        div.setAttribute("id", "five-day");
        var p1 = document.createElement("h2");
        var current_datetime = new Date(1970, 0, 1); // Epoch
        current_datetime.setSeconds(myArray[i].dt);
        let formatted_date = (current_datetime.getMonth() + 1) + "/" + (current_datetime.getDate()) + "/" + current_datetime.getFullYear()
        // console.log(formatted_date)
        p1.innerHTML = formatted_date;
        div.appendChild(p1);

        var p5 = document.createElement("img");
        p5.setAttribute("src", "http://openweathermap.org/img/wn/" + myArray[i].weather[0].icon + ".png");
        div.appendChild(p5);

        var p2 = document.createElement("h3");
        var F = 1.8 * (myArray[i].temp.day - 273) + 32;
        F = parseFloat(F).toFixed(2)
        p2.innerHTML = "Temp: " + F + "&#8457";
        div.appendChild(p2);

        var p3 = document.createElement("h3");
        p3.innerHTML = "Wind: " + myArray[i].wind_speed + "MPH";
        div.appendChild(p3);

        var p4 = document.createElement("h3");
        p4.innerHTML = "Humidity: " + myArray[i].humidity + "%";
        div.appendChild(p4);

        displayFuture.appendChild(div);


        
    }
    const elements = document.getElementsByClassName("top-city");
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
    for (var i = 0; i < storedCities.length; i++) {
        button1 = document.createElement("div");
        button1.innerHTML = storedCities[i];
        button1.setAttribute("class", "top-city");
        searchForm.appendChild(button1);

        
    }

}


submitBtn.addEventListener("click", getUserRepos);


// button1.addEventListener("click", myFunc);
// var myFunc = function(){
//     button1.getAttribute("class");
//     console.log(button1.innerHTML);

// }


