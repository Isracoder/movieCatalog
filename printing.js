const prompt = require("prompt-sync")({ sigint: true });

let  displayCatalog = ()=>{
    console.log("The current available movies are : ")
    obj.forEach(movie => {
        if (movie.Type == 'movie')console.log(movie.Title) ;
    })
    console.log() ;
    console.log("The available tvShows are : ") ;
    obj.forEach(tvShow=> {
        if (tvShow.Type == 'series')console.log(tvShow.Title) ;
    })
    console.log() ;
}
let printMovieInfo = (movieObj)=>{ // updating the movie obj
    if (!movieObj){
        displayCatalog() ;
        let title = prompt("Enter the name of the movie Title you would like to see the details of  : ")
         ;
        title = title.trim().toLowerCase() ;
        obj.forEach(movie => {
            if (movie.Title.toLowerCase() == title){
                // console.log(`found , title ${movie.Title}`) ;
                movieObj = movie ;
            }
        })
        if (!movieObj){
            console.log("There was no movie found with that title. ") ;
            return ;
        }
    }
    console.log("The movie's basic information : ") ;
    console.log(`Title : ${movieObj.Title}`) ;
    console.log(`Release Year : ${movieObj.Year}`) ;
    console.log(`Genre : ${movieObj.Genre}`) ;
    console.log(`Runtime : ${movieObj.Runtime}`) ;
    console.log(`Country ${movieObj.Country}`) ;
    console.log(`Rating : ${movieObj.imdbRating}`) ;
    console.log(`Type : ${movieObj.Type}`) ;

}
let printOptions=(num)=>{
    console.log() ;
    console.log("~~~~~~~~~~~~~~~~~~~~~")
    console.log("Welcome to the Movie Catalog!") ;
    console.log("~~~~~~~~~~~~~~~~~~~~~")
    console.log("Would you like to : ") ;
    console.log("1- Display the catalog") ;
    console.log("2- Manually add a new movie") ;
    console.log("3- Update the details of a movie") ;
    console.log("4- Delete a movie") ;
    console.log("5- Search and Filter") ;
    console.log("6- Fetch a certain movie from the api");
    console.log("7- Print the details of a certain movie") ;
    console.log("8- Exit the catalog") ; 
    num = prompt("What is your choice ? ") ;
    console.log() ;
    return Number(num) ;
}

exports.displayCatalog = displayCatalog ;
exports.printMovieInfo = printMovieInfo ;
exports.printOptions = printOptions ;