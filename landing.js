const numbeo_url = 'https://www.numbeo.com/api/'
const api_key = 'k4teeoitrnme6c'
const walkscore_key = 'ffd1c56f9abcf84872116b4cc2dfcf31'
const weather_key  = '4de3768c62b67fe359758977a3efc069';

$(document).ready(function(){ //might be a problem

    let urlParams = new URLSearchParams(window.location.search);
    var theCity = urlParams.get('city')
    console.log(theCity)
    ///main
    $.get((numbeo_url + "cities?api_key=" + api_key), function(data){  
        searchForCity(data.cities, theCity) 
    })
    $.get((numbeo_url + "indices?api_key=" + api_key + "&query=" + theCity.replace(/\s/g,'')), function(data){
        getStats(data)
    })

    getWeather(theCity)


    function getStats(city){
        $("#stat-box").append(`<p>Index realative to New York City</p>`)
        $("#stat-box").append(`<p>Quality of life Index: ${Math.round(city.quality_of_life_index)}</p>`)
        $("#stat-box").append(`<p>Cost of Living Index: ${Math.round(city.cpi_index)}</p>`)
        $("#stat-box").append(`<p>Rent Index: ${Math.round(city.rent_index)}</p>`)
        $("#stat-box").append(`<p>Crime Index: ${Math.round(city.crime_index)}</p>`)
        $("#stat-box").append(`<p>Healthcare Index: ${Math.round(city.health_care_index)}</p>`)
        
    }
    
    
    function searchForCity(cityList, cityToCheck){ //make more efficent
        let found = false;
        //console.log("in Search for City")
        //console.log(cityToCheck)
        //console.log(cityToCheck.replace(/\s/g,''))
        for(i=0;i<cityList.length;i++){
            if (cityList[i].city.toLowerCase() == cityToCheck.toLowerCase()){
                found = true;
                var longitude = cityList[i].longitude
                var latitude = cityList[i].latitude
                $("#stat-box").append(`<p>Longitude: ${longitude}</p><p>Latitude: ${latitude}</p>`)
                break;
            }
        }
        if (found == false){ //fix error handling
            alert("City Not Found")
        }

        populateTitle(cityToCheck)

    }

    function populateTitle(city){
        $('#title').html(`<h1>${city}</h1>`)
    }

    function getWeather(city){
        
    
        $.ajax({
          url:'http://api.openweathermap.org/data/2.5/weather',
          dataType:'json',
          type:'GET',
          data:{q:city, appid: weather_key, units: 'imperial'},

          success: function(data){
            mainTemp= Math.round(data.main.temp)
            maxTemp = Math.round(data.main.temp_max)
            minTemp = Math.round(data.main.temp_min)
            humidity = data.main.humidity
            wind = Math.round(data.wind.speed)
            lon = data.coord.lon
            lat = data.coord.lat
            let wf = '';
            $.each(data.weather, function(index, val){


              wf += `<h1> ${data.name}</h1>
              </b><div><img src=weatherIcons/${val.icon}.png><p> <div><h3>${mainTemp}&deg;F | ${val.main}</h3></div>
              <div>High: ${maxTemp} | Low: ${minTemp}</div>
              <div>Humidity: ${humidity} %</div>
              <div>Wind: ${wind} mph</div>

              `
              // <div>Lon: ${lon}    Lat: ${lat}
            });

           $("#weather").html(wf);
          }

        })

  
    }


})
