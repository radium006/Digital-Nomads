# Digital-Nomads

Frontend application designed to return city information for those considering relocation.

This was a purely front-end project done as an assignment for DigitalCrafts Coding Bootcamp in Houston, TX. The goal of the assignment was to demonstrat our ability to utilize RESTful API calls to create an information front-end user experience. 

The basic concept was inspired by web-developers who live a nomadic lifestyle by working and living in cities on a short term basis. The idea was to give these individuals a one stop informational site that will return information that they would find useful when deciding where to locate to.

Upon searching for a (ideally major metropoloitan) city the site will return several informational boxes:

1. A statistical informational box with indexes (realative to New York City) such as Cost of Living, Quality of Life, Average Rent and Crime Rate idexes (realative to New York City). 
2. A box containing a city map.
3. A box with a walkability, bikeability, and a public trasit score of the downtown area. 
4. A box displaying the current weather.
5. A simple flights/loging travel widget.

In addition, The site will return information sourced from Yelp and HomeAway on local coffee shops, shared workspaces, and potential lodging optios.

# Use of the site

As this project was purely a front-end project, a server was not used to make the API calls. As such there is an CORS issue when using this site. To circumvent this a CORS extension for your browser is needed. 

https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en

Live link to site: http://digitalnomads.surge.sh

Upon loading the main index.html page of the site, use the search box to type in a city of your choice using city name first followed by the state or province abbreviation (when applicable). 

Example: <b>Houston, TX</b> or <b>Belgrade</b> will produce accurate results

<i>NOTE: Some cities (particularly from undeveloped countries) may not have availible information and will cause the information boxes to render null. Use major metropolitan cities to get accurate results.</i>

From there the user will be redirected to the queried city's information page!


<h2 style="text-align:center;">SCREENSHOT OF HOME LANDING PAGE:</h3>
<a href="http://tinypic.com?ref=1zmfgxf" target="_blank"><img src="http://i66.tinypic.com/1zmfgxf.png" border="0" alt="Image and video hosting by TinyPic"></a>


<h2 style="text-align:center;">SCREENSHOT OF CHICAGO'S INFO PAGE:</h3>
<a href="http://tinypic.com?ref=16m3zpv" target="_blank"><img src="http://i63.tinypic.com/16m3zpv.png" border="0" alt="Image and video hosting by TinyPic"></a>
