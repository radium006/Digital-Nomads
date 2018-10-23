//-----------------VARIBLE AREA--------------------------------//

const numbeo_url = 'https://www.numbeo.com/api/'
const api_key = 'k4teeoitrnme6c'
const walkscore_key = 'ffd1c56f9abcf84872116b4cc2dfcf31'


submitButton = $('#submit-button')
//------------------------------------------------------------//

//-----------------KEVIN--------------------------------------//

function searchForCity(cityList, cityToCheck){
    let found = false;
    for(i=0;i<cityList.length;i++){
        if (cityList[i].city.toLowerCase() == cityToCheck.toLowerCase()){
            found = true;
            let longitude = cityList[i].longitude
            let latitude = cityList[i].latitude
            console.log(cityList[i].country)
            console.log(longitude)
            console.log(latitude)
        }
    }
    if (found == false){
        alert("City Not Found")
    }    
}

submitButton.click(function(){
    cityName = $("#city-input").val()
    console.log(cityName)
    $.get((numbeo_url + "cities?api_key=" + api_key), function(data){
        //console.log(data.cities)
        searchForCity(data.cities, cityName)
        //console.log(jQuery.inArray(cityName, data.cities.city))
    })
})

//--------------------------------------------------------------------//