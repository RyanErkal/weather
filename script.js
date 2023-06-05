var data;
var city;

async function main() {
	const response = await fetch(
		`http://api.weatherapi.com/v1/current.json?key=68ea4bfe614d42859ca22853230506&q=M1&aqi=yes`
	);
	data = await response.json();
	console.log(data);
	//myJSON = JSON.parse(data);
	//console.log(myJSON);
	createLocation(data);
	createWeather(data);
	createAirQuality(data);
	//console.log(data.current.wind_mph);
}

async function newLocation(city) {
	const response = await fetch(
		`http://api.weatherapi.com/v1/current.json?key=68ea4bfe614d42859ca22853230506&q=${city}&aqi=yes`
	);
	data = await response.json();
	console.log(data);
	//myJSON = JSON.parse(data);
	//console.log(myJSON);
	clear();
	createLocation(data);
	createWeather(data);
	createAirQuality(data);
	//console.log(data.current.wind_mph);
}

document.addEventListener("DOMContentLoaded", main);

let input = document.querySelector("input");
input.addEventListener("input", newLocation(input.value));
let body = document.querySelector(".main");

function clear() {
	body.innerHTML = "";
}

createLocation = (data) => {
	locationdiv = document.createElement("div");
	locationdiv.setAttribute("class", "location");
	locationdiv.innerHTML =
		data.location.name +
		", " +
		data.location.region +
		", " +
		data.location.country;
	timediv = document.createElement("div");
	timediv.setAttribute("class", "time");
	timediv.innerHTML = data.location.localtime;
	locationdiv.appendChild(timediv);
	body.appendChild(locationdiv);
};

createWeather = (data) => {
	weatherdiv = document.createElement("div");
	weatherdiv.setAttribute("class", "weather");
	weatherdiv.innerHTML +=
		"<div class='temp'>" + data.current.temp_c + "°C</div>";
	weatherdiv.innerHTML +=
		"<div class='condition'>" + data.current.condition.text + "</div>";
	weatherdiv.innerHTML +=
		"<div class='wind'>Wind: " + data.current.wind_mph + "mph</div>";
	weatherdiv.innerHTML +=
		"<div class='humidity'>Humidity: " + data.current.humidity + "%</div>";
	weatherdiv.innerHTML +=
		"<div class='precip'>Precipitation: " +
		data.current.precip_mm +
		"mm</div>";
	weatherdiv.innerHTML +=
		"<div class='uv'>UV Index: " + data.current.uv + "</div>";
	weatherdiv.innerHTML +=
		"<div class='feelslike'>Feels Like: " +
		data.current.feelslike_c +
		"°C</div>";
	body.appendChild(weatherdiv);
};

createAirQuality = (data) => {
	airqualitydiv = document.createElement("div");
	airqualitydiv.setAttribute("class", "airquality");
	airqualitydiv.innerHTML +=
		"<div class='airquality'>Air Quality: " +
		data.current.air_quality["gb-defra-index"] +
		"</div>";
	body.appendChild(airqualitydiv);
};

/* //Opaque responses are defined as part of the Fetch API, and represent the result of a request made to a remote origin when CORS is not enabled. */
