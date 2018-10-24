submitButton = $('#submit-button')

submitButton.click(function(){
    cityName = $("#city-input").val()
    console.log(cityName)

    window.location = `landing.html?city=${cityName}`
        
    })
