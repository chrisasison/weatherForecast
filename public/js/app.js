const searchBar = document.getElementById('locationAddress');
const searchBtn = document.getElementById('searchBtn');
const address = document.querySelector('.location');
const forecast = document.querySelector('.weatherForecast');
const weatherIcon = document.querySelector('.weatherIcon');


function getInfo() {
    fetch('/weather?address=' + searchBar.value).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                console.log(data.error);
            }
            console.log(data);
            address.textContent = data.forecast;
            forecast.textContent = data.weatherData;
            // weatherIcon.textContent = data.icons;
        })
    })
}

searchBtn.addEventListener('click', (e) => {
    if (searchBar.value === '') {
        return console.log('Please enter a location.');
    }
    getInfo()
})

searchBar.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && searchBar.value) {
        getInfo();
    }
})


