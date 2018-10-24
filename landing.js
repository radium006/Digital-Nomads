const numbeo_url = 'https://www.numbeo.com/api/'
const api_key = 'k4teeoitrnme6c'
const walkscore_key = 'ffd1c56f9abcf84872116b4cc2dfcf31'


$(document).ready(function(){ //might be a problem

    let urlParams = new URLSearchParams(window.location.search);
    var theCity = urlParams.get('city')
    console.log(theCity)

    $.get((numbeo_url + "cities?api_key=" + api_key), function(data){  
        searchForCity(data.cities, theCity) 
    })
    $.get((numbeo_url + "indices?api_key=" + api_key + "&query=" + theCity), function(data){
        getStats(data)
    })


    function getStats(city){
        $("#stat-box").append(`<p>Quality of life Index: ${city.quality_of_life_index}</p>`)
        $("#stat-box").append(`<p>Cost of Living Index: ${city.cpi_index}</p>`)
        $("#stat-box").append(`<p>Rent Index: ${city.rent_index}</p>`)
        $("#stat-box").append(`<p>Crime Index: ${city.crime_index}</p>`)
        
    }
    
    
    function searchForCity(cityList, cityToCheck){ //make more efficent
        let found = false;
        console.log("in Search for City")
        for(i=0;i<cityList.length;i++){
            if (cityList[i].city.toLowerCase() == cityToCheck.toLowerCase()){
                found = true;
                let longitude = cityList[i].longitude
                let latitude = cityList[i].latitude
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

})
