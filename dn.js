// jQuery
// Fetch
// Axios

const walkaility_api = "http://api.walkscore.com/score?format=json&apikey=ffd1c56f9abcf84872116b4cc2dfcf31"


let walkability = document.getElementById("walkability")
let listCity = document.getElementById("listCity")
let btnSubmitCity = document.getElementById(btnSubmitCity)



// btnSend.addEventListener('click', function() {

//     let titleValue = titleTextBox.value
//     let bodyValue = bodyTextBox.value
//     let userIdValue = parseInt(userIdTextBox.value) // parse string to an int

//     // Sending JSON to the server as the data
//     $.post(POST_URL, { title: titleValue, body: bodyValue, userId: userIdValue }, function(data) {
//         console.log(data)
//     })

// })

// function displayMovies(movies) {

//     let movieItems = movies.Search.map(function(movie) {
//         return `<li>
//       <label>${movie.Title}</label>
//       <img src="${movie.Poster}"></img>
//       </li>`

//     })

//     moviesList.innerHTML = movieItems.join('')
// }

// // this function uses jQuery for networking request
// function performRequestUsingjQueryLibrary() {

//     // $.get is going to make a GET request
//     $.get(MOVIES_URL, function(data) {
//         displayMovies(data)
//     })

// }

// //performRequestUsingjQueryLibrary()



// // XMLHttpRequest is the plain vanilla JS class to perform network requests
// function performRequestUsingXMLHttpRequest() {

//     // create an object of XMLHttpRequest
//     var request = new XMLHttpRequest()

//     request.onload = function() {

//         // responseText contains the response as a String
//         console.log(this.responseText)

//         // convert string into a JSON object
//         let movies = JSON.parse(this.responseText)

//         let movieItems = movies.Search.map(function(movie) {
//             return `<li>
//         <label>${movie.Title}</label>
//         <img src="${movie.Poster}"></img>
//         </li>`

//         })

//         moviesList.innerHTML = movieItems.join('')

//     }

//     // open the request as a GET request
//     request.open("GET", "http://www.omdbapi.com/?s=Batman&page=2&apikey=564727fa")
//     request.send()
// }

//performRequestUsingXMLHttpRequest()