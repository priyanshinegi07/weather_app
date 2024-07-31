// let xhr = new XMLHttpRequest();
// xhr.onload = function() {
//     console.log(this.response)
// }
// xhr.open("get","https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={7d4e6666f972ccf3dc552c2e43d1d227}")


// const { all } = require("axios")

// import { Chart } from 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.min.js';
const form = document.getElementById("form")
const search = document.getElementsByName("input")
const section = document.getElementById("weather")
const otherDetails = document.getElementById("other-details")
const comapreForm = document.getElementById("compareForm");
const saveButton = document.getElementById("save");
const savedLocationsDropdown = document.getElementById("saved-locations-dropdown");

 form.addEventListener("submit", async (e) =>{
    e.preventDefault()
    removeWeather();
    console.log("e ", e);
    const searchtext = form.children[0].value;
    console.log("search", searchtext)
    
    getWeather(searchtext)
    // const search_text = form
})
saveButton.addEventListener("click", () => {
    const currentLocation = form.children[0].value;
    console.log("updated")

    if (currentLocation) {
        saveLocation(currentLocation);
        updateSavedLocationsDropdown();
    }
})

savedLocationsDropdown.addEventListener("click", (e) => {
    const selectedLocation = e.target.value;
    
    if(selectedLocation) {
        removeWeather();
        getWeather(selectedLocation)
    }
})
function saveLocation(loc) {
    let locations  = JSON.parse(localStorage.getItem("locations")) || [];
    if(locations && !locations.includes(loc)) {
        locations.push(loc);
        localStorage.setItem("locations", JSON.stringify(locations))
    }
}
//use location
function updateSavedLocationsDropdown() {
    let locations  = JSON.parse(localStorage.getItem("locations")) || [];
    savedLocationsDropdown.innerHTML = '<option value = "">Select a location</option>'
    console.log("loc", locations)
    for(let loc of locations) {
        const option = document.createElement("option")
        option.value = loc;
        option.textContent = loc
        savedLocationsDropdown.appendChild(option)
    }
}

// if(save.length != 0)
// save.addEventListener("onclick", (e) => {
//     const searchtext = form.children[0].value;
//     saveLocation(searchtext)
//     let li = document.querySelector("dropdown-item")
//     console.log("li")
//     console.log("li", li)

// })
comapreForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    fetchAndUpdate();
    // updateTable();
})


function getWeather(searchtext) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchtext}&appid=7d4e6666f972ccf3dc552c2e43d1d227&units=metric`
    // https://api.openweathermap.org/data/2.5/weather?q=${searchtext}&appid=7d4e6666f972ccf3dc552c2e43d1d227
    fetch(url, {
        method: "GET"
    })
    .then((res) => {
        console.log(res)
        return res.json();
    })
    .then((result) => {
        // console.log(result)
        displayWeather({result})
    })
    .catch((err) => {
        console.log(err);
    })
}

function getWeatherIcon(temp, condition) {
    if(condition === 'Haze') return 'https://cdn-icons-png.flaticon.com/128/6853/6853978.png'
    if(condition === 'Rain') return  `https://cdn-icons-png.flaticon.com/128/8841/8841317.png`
    if(condition === 'Thunderstorm') return `https://cdn-icons-png.flaticon.com/128/1959/1959321.png`
    else if(temp < 0) return 'https://cdn-icons-gif.flaticon.com/6454/6454998.gif'
    else if (temp >= 0 && temp < 10) 
        return 'https://cdn-icons-gif.flaticon.com/6455/6455024.gif';
    else if (temp >= 10 && temp < 20)
        return 'https://cdn-icons-gif.flaticon.com/17102/17102931.gif';
    else if (temp >= 20 && temp < 30)
        return 'https://cdn-icons-gif.flaticon.com/16939/16939742.gif';
    else
        return 'https://cdn-icons-gif.flaticon.com/17102/17102813.gif';
    
}


function removeWeather() {
    // console.log(parent.firstChild)
    // while(parent.firstChild) {
    //     parent.firstChild.firstChild.remove();
    // }
    console.log("hello1")
    let tempDetails = document.getElementById("temp-details")
    // let weatherDetails = document.getAnimations.getElementById("weather-details")
    if(tempDetails) tempDetails.innerHTML = ""
    // let p = document.getElementsByTagName("p")
    
    // console.log(p)

}

function convertUnixToTime(time) {
    const date = new Date(time * 1000); // Convert to milliseconds
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const seconds = "0" + date.getSeconds();
    return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  }
function displayWeather(data) {
    // document.createElement("div")
    console.log("data ", data)
    // console.log(data);
    const {main}= data.result
    console.log("main", main)
    
    // const details = document.createElement("div");
    // details.setAttribute("class", "temp-details");
    //setting location temp and feelsLike
    

    const details = document.getElementById("temp-details")
    const temp = document.createElement("p");
    const feelsLike = document.createElement("p");
    const place = document.createElement("h3")
    temp.innerHTML= `${main.temp}&deg;C`
    feelsLike.innerHTML = `Feels Like ${main.feels_like}&deg;C`
    place.innerHTML = data.result.name
    details.append(place)
    details.appendChild(temp)
    details.appendChild(feelsLike)
    // console.log(1)
    //setting icon weather condition
    const weather = document.getElementById("weather-details")
    let img = document.getElementById("icon")
    const iconSrc = getWeatherIcon(temp.innerHTML, data.result.weather[0].main);
    img.src = iconSrc;

    // const description = (document.createElement("p"))
    // description.innerHTML = (data.result.weather[0].main)
    // weather.appendChild(description)
    // console.log(2)

    //managing three cards : humidity wind ans sunrise/sunset
    document.getElementById("humid").src = 'https://cdn-icons-png.flaticon.com/128/5664/5664987.png'
    const p = (document.getElementById("h"));
    p.innerHTML = `${main.humidity}%`
    // humidity.innerHTML = "%"
    
    document.getElementsByClassName("humidity")[0].append(p)

    document.getElementById("wind").src = 'https://cdn-icons-png.flaticon.com/128/9424/9424565.png'
    const wind = (document.getElementById("w").innerHTML = `${data.result.wind.speed}m/s`);
    // document.getElementsByClassName("wind-speed")[0].append(`${wind}m/s`)


    document.getElementById("sun").src = 'https://cdn-icons-png.flaticon.com/128/2584/2584049.png'
    const sunriseSunset = document.getElementById("s");
    const sunrise = convertUnixToTime(data.result.sys.sunrise)
    const sunset = convertUnixToTime(data.result.sys.sunset)
    sunriseSunset.innerHTML = `Sunrise : ${sunrise}am<br> Sunset : ${sunset}pm`
    // document.getElementsByClassName("sunrise")[0].append(sunriseSunset)
    let allImgs = document.querySelectorAll("img")
    for(img of allImgs) {
    
        img.onload = function() {
            this.style.width = '100px';
            this.style.height = '100px';
            this.style.display = 'block'; // Display the image after it is loaded
        };
    }
    function showWeatherDetails() {
        const weatherDetailsContainer = document.querySelector('#weather');
        weatherDetailsContainer.classList.add('show'); // This will trigger the CSS to display divs
        const otherDetailsContainer = document.querySelector('#other-details');
        otherDetailsContainer.classList.add('show'); // This will trigger the CSS to display divs
    }
    
    showWeatherDetails();
    section.append(details);
    
    console.log(otherDetails)

}

async function updateWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7d4e6666f972ccf3dc552c2e43d1d227&units=metric`;
    const response = await fetch(url);
    
    const data = await response.json();

    return data;
}

async function fetchAndUpdate() {
    const city1 = comapreForm.children[1].value
    const city2 = comapreForm.children[3].value
    if(city1 === '' || city2 === '') {
        window.alert("Please enter the name of both the places")
    }
    const dataCity1 = await updateWeather(city1);
    const dataCity2 = await updateWeather(city2);
    updateTable(dataCity1, dataCity2);
    
}
function updateTable(data1, data2) {
    
    // Update the table with the data from both cities
    console.log("data1", data1)
    document.getElementsByTagName("th")[1].innerText = data1.name
    document.getElementsByTagName("th")[2].innerText = data2.name
    // document.getElementById("city-2").innerText = data2.name
    document.getElementById('temp-city1').innerText = data1.main.temp + '°C';
    document.getElementById('temp-city2').innerText = data2.main.temp + '°C';
    
    document.getElementById('weather-city1').innerText = data1.weather[0].main;
    document.getElementById('weather-city2').innerText = data2.weather[0].main;
    
    document.getElementById('clouds-city1').innerText = data1.clouds.all + '%';
    document.getElementById('clouds-city2').innerText = data2.clouds.all + '%';
    
    document.getElementById('humidity-city1').innerText = data1.main.humidity + '%';
    document.getElementById('humidity-city2').innerText = data2.main.humidity + '%';
    const weatherDetailsContainer = document.querySelector('#table-container');

    weatherDetailsContainer.classList.add('show');
    // console.log(document.getElementsByTagName("tr"))
}

