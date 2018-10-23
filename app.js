//-----------------VARIBLE AREA--------------------------------//

const numbeo_url = 'https://www.numbeo.com/api/'
const api_key = 'k4teeoitrnme6c'


submitButton = $('#submit-button')
//------------------------------------------------------------//

//-----------------KEVIN--------------------------------------//

function searchForCity(cityList, cityToCheck){
    for(i=0;i<cityList.length;i++){
        if (cityList[i].city.toLowerCase() == cityToCheck.toLowerCase()){
            var longitude = cityList[i].longitude
            var latitude = cityList[i].latitude
            console.log(longitude)
            console.log(latitude)
        }
        // console.log(cityList[i].city)
    }
}

submitButton.click(function(){
    cityName = $("#city-input").val()
    console.log(cityName)
    $.get((numbeo_url + "cities?api_key=" + api_key), function(data){
        //console.log(data.cities.city)
        searchForCity(data.cities, cityName)
        //console.log(jQuery.inArray(cityName, data.cities.city))
    })
})

//--------------------------------------------------------------------//