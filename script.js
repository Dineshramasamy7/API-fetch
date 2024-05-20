function change() {
  fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => {
      let result = "";
      data.forEach((country) => {
        if (country.capitalInfo && country.capitalInfo.latlng) {
          result += `
            <div class="cards">
              <h2>${country.name.common}</h2>
              <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
              <p>Region: <span>${country.region}</span></p>
              <p>Capital: <span>${country.capital}</span></p>
              <p>Country Code: <span>${country.altSpellings[0]}</span></p>
              <p>LatLng: <span>${country.capitalInfo.latlng}</span></p>
              <button type="button" onclick="btnFun(${country.capitalInfo.latlng[0]}, ${country.capitalInfo.latlng[1]}, '${country.name.common}')" class="btn">Click for Weather</button>
            </div>`;
        }
      });
      document.querySelector(".container").innerHTML = result;
    });
}

change();

let overlay = document.querySelector(".overlay");
let modal = document.querySelector(".top");

function btnFun(lat, lon, countryName) {
  console.log(`Latitude: ${lat}, Longitude: ${lon}, Country: ${countryName}`);
  overlay.style.display = "block";
  modal.style.display = "block";
  weather(lat, lon, countryName);
}

function weather(lat, lon, countryName) {
  console.log(`Fetching weather for Latitude: ${lat}, Longitude: ${lon}, Country: ${countryName}`);
  const apiKey = "d62e82edade6f1da68d3ccd2aada531d"; 
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then((res) => res.json())
    .then((data) => {
      console.log(`Weather data received: `, data);
      const weatherDetails = `
        <div class="top-over">
          <div class="top-one">
            <h2>Weather Update: <span>${countryName}</span></h2>
            <span class="close" onclick="closeModal()">X</span>
          </div>
          <div class="top-two">
            <img src="weather-img.jpeg" alt="Weather Image">
            <div class="top-two-in">
              <p>Description: <span>${data.weather[0].description}</span></p>
              <p>Temp: <span>${data.main.temp}°C</span></p>
              <p>Humidity: <span>${data.main.humidity}%</span></p>
              <p>Wind Speed: <span>${data.wind.speed} m/s</span></p>
            </div>
          </div>
        </div>`;
      modal.innerHTML = weatherDetails;
      document.querySelector(".close").addEventListener("click", closebtn);
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
    });
}

function closebtn() {
  overlay.style.display = "none";
  modal.style.display = "none";
}
