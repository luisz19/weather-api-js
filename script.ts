const apiKey : string ='6fda455e9b0abc5e95602f973bc79506';
const url : string = 'https://api.openweathermap.org/data/2.5/weather';

const getData = async (city : string) : Promise<any> => {
    try {
        const response = await fetch(`${url}?q=${city || 'Natal'}&lang=pt_br&appid=${apiKey}` )
        const data = await response.json()
        console.log(data)
        insertHtml(data)
       

    } catch(e) {
        console.error(e)
    }
}

// INTERFACE: forma de definir a estrutura de um objeto, especificando quais propriedades ele deve ter

interface Data  {
    name: string;
    country: string;
    
    sys: {
        country: string;
    }; //quando há : data.sys.country, fazer assim
    main: {
        temp: number;
        temp_max: number;
        temp_min: number;
        humidity: number;
    } 
    
    wind: {
        speed: number;
    }
    
    weather: {
        description: string;
        icon: string;
    }[]; //precisa especificar que é um array
    

}

//Promise<void> é usada em funções assíncronos
const insertHtml = async (data: Data): Promise<void> => {
    const nome : string = data.name
    const state : string = data.sys.country
    const temp  : number = converterTemp(data.main.temp)
    const tempMax : number = converterTemp(data.main.temp_max)
    const tempMin : number = converterTemp(data.main.temp_min)
    const umidade : number= data.main.humidity
    const wind : number = data.wind.speed
    const weather : string = data.weather[0].description
    const imgWeather : string = data.weather[0].icon

    const imgWeatherElement = document.getElementById('img-weather') as HTMLImageElement; //quando utliza o .src dá problema, por isso fazer. Várias vezes será utilizado o o HTMLalgumacoisa nesse caso
   
    // a ! é para indicar que com certeza o valor retornado não será nulo.

    document.getElementById('nome')!.textContent = nome + ', ' + state;
    document.getElementById('temp')!.textContent = temp.toFixed(1) + '°C';
    document.getElementById('temp-max')!.textContent = tempMax.toFixed(1) + '°C';
    document.getElementById('temp-min')!.textContent = tempMin.toFixed(1) + '°C';
    document.getElementById('umidade')!.textContent = umidade + '%';
    document.getElementById('wind')!.textContent = wind + ' Km/h';
    document.getElementById('weather')!.textContent = weather;
    if (imgWeatherElement) imgWeatherElement.src = `https://openweathermap.org/img/wn/${imgWeather}.png`;
}

function converterTemp(kelvin : number) {
    const celsius = kelvin - 273.15;

    return celsius;
  }

const getCity = (): void => {
    
    const searchElement = document.getElementById('search') as HTMLInputElement;
    let city: string = searchElement ? searchElement.value : '';
    console.log(city)
    getData(city)
    
}

const btnSearch = document.getElementById('btn-search') as HTMLButtonElement;
btnSearch.addEventListener('click', getCity)


   



