const numbeo_url = 'https://www.numbeo.com/api/'
const api_key = 'k4teeoitrnme6c'
const walkscore_key = 'ffd1c56f9abcf84872116b4cc2dfcf31'
const weather_key  = '4de3768c62b67fe359758977a3efc069';
const yelp_apiKey = "GJ_RZBfY4WW8w2Vs4xd45U4KM751aG4PQsfYJB9d5nH3X-UvQgNKl53AxblclXsLu4-YpEkBIQB1qfABJl0ekLGnOcLQrHcRYo5fDF8w4GklXkKZ8ax_8ZPfqQXOW3Yx"
const walkscore_url= `http://api.walkscore.com/score?format=json`
const homeAway_apiKey = "MDcwNTJiYjAtY2EwZC00MWFkLWI1NDYtOWQ3MWFlOTFhN2Rm"

$(document).ready(function(){ //might be a problem

    
    let urlParams = new URLSearchParams(window.location.search);
    var theCity = urlParams.get('city')
    // console.log(theCity)
    ///-------------------------------main-----------------------------------//
    
    $.ajax({
        type: 'GET',
        url: numbeo_url + "cities?api_key=" + api_key,
        headers: {
            'Content-Type': 'application/javascript', 
            "Access-Control-Allow-Origin":"*"   
        },
        crossDomain: true,
        
        
        
    }).then(function(data){
        console.log("HEYYYYYY" + data)
        searchForCity(data.cities, theCity)
    })


    $.ajax({
        type: 'GET',
        url: (numbeo_url + "indices?api_key=" + api_key + "&query=" + theCity.replace(/\s/g,'')),
        headers: {
            'Content-Type': 'application/javascript',
            "Access-Control-Allow-Origin":"*"
        },
        crossDomain: true
    }).then(function(data){
        getStats(data)
    })
    
    // $.get((numbeo_url + "cities?api_key=" + api_key), function(data){  
    //     searchForCity(data.cities, theCity) 
    // }) 
    // $.get((numbeo_url + "indices?api_key=" + api_key + "&query=" + theCity.replace(/\s/g,'')), function(data){
    //     getStats(data)
    // })

    // getWifi(theCity)
    // getWorkspaces(theCity)
    // getRooms(theCity)

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
                //$("#stat-box").append(`<p>Longitude: ${longitude}</p><p>Latitude: ${latitude}</p>`)
                break;
            }
        }
        if (found == false){ //fix error handling
            alert("City Not Found")
        }

        populateTitle(cityToCheck)
        getWalkscore(longitude,latitude,cityToCheck)
        getMap(longitude,latitude)
        getWeather(theCity, longitude, latitude)
    }

    function populateTitle(city){
        $('#title').html(`<h1>${city}</h1>`)
    }

    function getWeather(city, lon, lat){
        
    
        $.ajax({
          url:'http://api.openweathermap.org/data/2.5/weather',
          dataType:'json',
          type:'GET',
          data:{lon:lon, lat:lat, appid: weather_key, units: 'imperial'},

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


              wf += `
              <div><img src=weatherIcons/${val.icon}.png><p> <div><h3>${mainTemp}&deg;F | ${val.main}</h3></div>
              <div>High: ${maxTemp} | Low: ${minTemp}</div>
              <div>Humidity: ${humidity} %</div>
              <div>Wind: ${wind} mph</div>

              `
              // <div>Lon: ${lon}    Lat: ${lat}
            });
            $("#weather").html(`<h1>Weather</h1>`)
           $("#weather").append(wf);
          }

        })

  
    }

    function getWifi(city){
        
        foodList = $('#coffee')
        
        cityLocation = city
        //returnBtn = $('#returnBtn')
        fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=wifi&limit=5&location=${cityLocation}&categories=coffee`, {
        headers: {
            Authorization: `Bearer ${yelp_apiKey}`
            }
            }).then(function(response){
                console.log(response)
            return response.json()
            }).then(function(businesses){
                displayCoffeeShops(businesses)
        })
        


        function displayCoffeeShops(businessData){
            let businessArray = businessData.businesses
            var businessInfo = businessArray.map(function(business){

            coffee.insertAdjacentHTML('beforeend', `
            <div class="carousel-item">
            <div id="products" class="row">
                <div class="item  col-xs-4 col-lg-12">
                    <div class="thumbnail">
                        <img class="group-image" src="${business.image_url}" alt="" />
                    <div class="caption">
                        <h6>${business.name}</h6>
                    <div class="inner-item-text">${business.location.address1}</div>
                    <div class="inner-item-text">${business.location.city},${business.location.state}</div><br>
                    <div class="row">
               <div class="col-xs-12 col-md-6">
                 <p class="lead">
                 Reviews: ${business.review_count}<br>
                 Rating: ${business.rating}</p>
               </div>
               <div class="col-xs-12 col-md-6">
                 <a class="btn btn-success" href="${business.url}"><strong>Yelp</strong></a>
               </div>
             </div>
           </div>
         </div>
         </div>
         <div>`) 
            
            }) 

    }

        
    }

    function getWorkspaces(city){
        workspaces = $('#workspace')
        cityLocation = city

        fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=shared workspace&location=${cityLocation}&limit=5&sort_by=review_count`, {
        headers: {
        Authorization: `Bearer ${yelp_apiKey}`
        }
        }).then(function(response){
        console.log(response)
        return response.json()
        }).then(function(businesses){
            displaySharedWork(businesses)
        })

        function displaySharedWork(businessData){
            let businessArray = businessData.businesses
            var businessInfo = businessArray.map(function(business){

            workspace.insertAdjacentHTML('beforeend', `
            <div class="carousel-item">
            <div id="products" class="row">
                <div class="item  col-xs-4 col-lg-12">
                    <div class="thumbnail">
                        <img class="group-image" src="${business.image_url}" alt="" />
                        <div class="caption">
                            <h6>${business.name}</h6>
                            <div class="inner-item-text">${business.location.address1}</div>
                            <div class="inner-item-text">${business.location.city},${business.location.state}</div><br>
                            <div class="row">
                            <div class="col-xs-12 col-md-6">
                 <p class="lead">
                    Reviews: ${business.review_count}<br>
                    Rating: ${business.rating}</p>
               </div>
               <div class="col-xs-12 col-md-6">
                 <a class="btn btn-success" href="${business.url}"><strong>Yelp</strong></a>
               </div>
             </div>
           </div>
         </div>
         </div>
         <div>`) 
              
            }) 

        }
    }


    function getRooms(city){
        
        cityLocation = city

        fetch(`https://ws.homeaway.com/public/search?q=${cityLocation}&maxBedrooms=1&maxNightlyPrice=100&pageSize=6&imageSize=LARGE`, {
    headers: {
    Authorization: `Bearer ${homeAway_apiKey}`
        },
    dataType: 'JSONP'    
     }).then(function(response){
       console.log(response)
       return response.json()
     }).then(function(listings){
       displayListings(listings)
     })

        function displayListings(listingData){
            let businessArray = listingData.entries
            var businessInfo = businessArray.map(function(homes){

            rooms.insertAdjacentHTML('beforeend', `
            <div class="carousel-item">
            <div id="products" class="row">
            <div class="item  col-xs-4 col-lg-12">
            <div class="thumbnail">
            <img class="group-image1" src="${homes.thumbnail.uri}" alt="" />
            <div class="caption1">
         <h6>${homes.headline}</h6>
         <p class="inner-item-text1">
         ${homes.description}</p>
         <p class="inner-item-text1">
         ${homes.accommodations}</p>
         <div class="row" id="home_info">
           <div class="col-xs-12 col-md-6">
             <p class="lead1">
             $${homes.priceQuote.averageNightly}</p>
           </div>
           <div class="col-xs-12 col-md-6">
             <a class="btn btn-success" href="${homes.listingUrl}"><strong>HomeAway</strong></a>
           </div>
         </div>
       </div>
     </div>
     </div>
         <div>`) 
              
            }) 

        }
    }


    function getWalkscore(long, lat, city){
        $.get((walkscore_url + "&address=" + city + '&lat=' + lat + '&lon=' + long + '&transit=1&bike=1&wsapikey=' + walkscore_key), function(data){
            console.log(data)
            $('#walkPic').html(`<img src=${data.logo_url}>`)
            $('#walkInfo').html(`<p>Walk Score rating: ${data.walkscore} (${data.description})</p><p>Bikeablility: ${data.bike.score} (${data.bike.description})</p> <p>Transit: ${data.transit.score} (${data.transit.description})</p>`)
        }) 

    }

    function getMap(lon, lat){
        $('#theMap').html(`<h1>City Map:</h1><div id="map" class="map"></div>
        <script type="text/javascript">
          var map = new ol.Map({
            target: 'map',
            layers: [
              new ol.layer.Tile({
                source: new ol.source.OSM()
              })
            ],
            view: new ol.View({
              center: ol.proj.fromLonLat([${lon}, ${lat}]),
              zoom: 10
            })
          });
        </script>`)
    }

})

