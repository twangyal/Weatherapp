console.log('hello')

let weather = {
    apiKey: '3479a9bea8684c1f9f9160946231004',
    fetchWeather: function(city) {
        fetch(`http://api.weatherapi.com/v1/forecast.json?key=3479a9bea8684c1f9f9160946231004&q=${city}&days=1&aqi=no&alerts=no`)
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data.location;
        const { temp_c } = data.current;
        const { condition } = data.current;
        const { humidity } = data.current;
        const { feelslike_c } = data.current;
        const { forecastday } = data.forecast;
        const { maxtemp_c, mintemp_c } = data.forecast.forecastday[0].day;
        const { sunrise, sunset, moonrise, moonset } = data.forecast.forecastday[0].astro;
        const { hour } = data.forecast.forecastday[0];

        document.querySelector('.city-name').innerText = name;
        document.querySelector('.current-temp').innerText = temp_c + '°C';
        document.querySelector('.condition').innerText = condition.text;
        document.querySelector('.high-low').innerText = `H:${maxtemp_c}° L:${mintemp_c}°`;
        document.querySelector('.humidity').innerText = `Humidity: ${humidity}%`;
        document.querySelector('.feels-like').innerText = `Feels like ${feelslike_c}°C`;
        document.querySelector('.astro-sun').innerText = `Sunrise: ${sunrise} Sunset: ${sunset}`;
        document.querySelector('.astro-moon').innerText = `Moonrise: ${moonrise} Moonset: ${moonset}`;



        for (let i = 0; i < document.getElementsByClassName('hourly-forecast-cards').length; i++) {
            document.getElementsByClassName('hourly-forecast-cards')[0].remove();
        } 

        let card = document.createElement('div');
        card.classList.add('hourly-forecast-cards');
        document.querySelector('.container').appendChild(card);


        for (let i = 0; i < 24; i++) {
            let container = document.createElement('div');
            container.classList.add('hourly-forecast-container');
            document.querySelector('.hourly-forecast-cards').appendChild(container);

            let info = document.createElement('div');
            info.classList.add('hourly-forecast-info');
            container.appendChild(info);

            let hourlyTime = document.createElement('div');
            hourlyTime.classList.add('hourly-forecast-time');
            hourlyTime.innerText = `${(hour[i].time).substr(hour[i].time.length - 5)} ${i < 12 ? 'AM' : 'PM'}`
            info.appendChild(hourlyTime);

            let hourlyTemp = document.createElement('div');
            hourlyTemp.classList.add('hourly-forecast-temp');
            hourlyTemp.innerText = `${hour[i].temp_c}°C`
            info.appendChild(hourlyTemp);

            let hourlyConditionIcon = document.createElement('div');
            hourlyConditionIcon.classList.add('hourly-forecast-condition-icon');
            hourlyConditionIcon.style.backgroundImage = `url(${hour[i].condition.icon})`
            info.appendChild(hourlyConditionIcon);

            let hourlyCondition = document.createElement('div');
            hourlyCondition.classList.add('hourly-forecast-condition');
            hourlyCondition.innerText = `${hour[i].condition.text}`
            info.appendChild(hourlyCondition);
        }
    },
    searchCity: function() {
        this.fetchWeather(document.querySelector('.search-bar').value)
    }
}

document.querySelector('.search-button').addEventListener("click", function() {
    weather.searchCity();
})

weather.fetchWeather('San Diego');