const apiKey ='6fda455e9b0abc5e95602f973bc79506';
const url = 'https://api.openweathermap.org/data/2.5/weather';

const getData = async (city) => {
    try {
        const response = await fetch(`${url}?q=${city || 'Natal'}&lang=pt_br&appid=${apiKey}` )
        const data = await response.json()
        console.log(data)
        insertHtml(data)
       

    } catch(e) {
        console.error(e)
    }
}

const insertHtml = async (data) => {
    const nome = data.name
    const state = data.sys.country
    const temp = converterTemp(data.main.temp)
    const tempMax = converterTemp(data.main.temp_max)
    const tempMin = converterTemp(data.main.temp_min)
    const umidade = data.main.humidity
    const wind = data.wind.speed
    const weather = data.weather[0].description
    const imgWeather = data.weather[0].icon
   
    document.getElementById('nome').textContent = nome + ', ' + state;
    document.getElementById('temp').textContent = temp.toFixed(1) + '°C';
    document.getElementById('temp-max').textContent = tempMax.toFixed(1) + '°C';
    document.getElementById('temp-min').textContent = tempMin.toFixed(1) + '°C';
    document.getElementById('umidade').textContent = umidade + '%';
    document.getElementById('wind').textContent = wind + ' Km/h';
    document.getElementById('weather').textContent = weather
    document.getElementById('img-weather').src = `https://openweathermap.org/img/wn/${imgWeather}.png`
}

function converterTemp(kelvin) {
    const celsius = kelvin - 273.15;

    return celsius;
  }

insertHtml()
getData()




const getCity = () => {
    let city = document.getElementById('search').value;
    console.log(city)
    getData(city)
    
}

const btnSearch = document.getElementById('btn-search');
btnSearch.addEventListener('click', getCity)


   



