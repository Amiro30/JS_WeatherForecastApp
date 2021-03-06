
let appId = '05b9617826391d2a8dcd32bcfac800e4'  //API KEY HERE
let units = 'metric'
let searchMethod;

function getSearchMethod(searchTerm){
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm){
        searchMethod='zip';
    }else{
        searchMethod='q';
    }
}

function searchWeather(searchTerm){
    getSearchMethod(searchTerm);
    fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(res =>{
        return res.json();
    }).then(res =>{
        init(res);
    })
}


function init(resultFromServer){
    switch (resultFromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage='url("./images/clear.jpg")';
            break;
    
        case 'Clouds':
            document.body.style.backgroundImage='url("./images/cloudy.jpg")';
            break;
        case 'Thunderstorm':
            document.body.style.backgroundImage='url("./images/storm.jpg")';
        break;
        
        case 'Snow':
            document.body.style.backgroundImage='url("./images/snow.jpg")';   
        break;
        
        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            document.body.style.backgroundImage='url("./images/rain.jpg")'; 
            break;
                
        default:  
            break;
    }

    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let temperatureElement = document.getElementById('temperature');
    let humidityElement = document.getElementById('humidity');
    let windSpeedElement = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('cityHeader');
    let weatherIcon = document.getElementById('documentIconImg');

    let day1 = document.getElementById('day1');
    let day2 = document.getElementById('day2');
    let day3 = document.getElementById('day3');
    
    //TODO Make date and 5 days forecast here
    //var date1 = moment(Date1).format('L');


    day1.innerHTML = 'DAY_1' + Math.floor(resultFromServer.main.temp) + '&#176C' + ' Winds ' + Math.floor(resultFromServer.wind.speed) + ' m/s';
    day2.innerHTML = 'DAY_1' + Math.floor(resultFromServer.main.temp) + '&#176C' + ' Winds ' + Math.floor(resultFromServer.wind.speed) + ' m/s';
    day3.innerHTML = 'DAY_1' + Math.floor(resultFromServer.main.temp) + '&#176C' + ' Winds ' + Math.floor(resultFromServer.wind.speed) + ' m/s';

    weatherIcon.src='https://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';

    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() +resultDescription.slice(1);

    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176C';
    windSpeedElement.innerHTML = 'Winds ' + Math.floor(resultFromServer.wind.speed) + ' m/s'
    cityHeader.innerHTML = resultFromServer.name + ', ' +resultFromServer.sys.country;
    humidityElement.innerHTML = 'Humidity level ' + resultFromServer.main.humidity + '%';


    setPositionForWeatherInfo();
    console.log(resultFromServer);

}

function setPositionForWeatherInfo(){
    let weatherContainer =document.getElementById('weatherContainer');
    let daysContainer =document.getElementById('daysContainer');
    
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;

    weatherContainer.style.left =  `calc(50% - ${weatherContainerWidth/2}px)`;
    weatherContainer.style.top =  `calc(50% - ${weatherContainerHeight/1.3}px)`;
    weatherContainer.style.visibility = 'visible';

    daysContainer.style.left =  `50px`;;
    daysContainer.style.bottom =  '50px';
    daysContainer.style.visibility = 'visible';
}

document.getElementById('searchBtn').addEventListener('click',() =>{
    let searchTerm=document.getElementById('searchInput').value;
    if (searchTerm)
        searchWeather(searchTerm);
})

