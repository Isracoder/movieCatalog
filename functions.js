const prompt = require("prompt-sync")({ sigint: true });
const {printMovieInfo , printOptions , displayCatalog} = require('./printing.js') ;
const {readFile , writeToFile} = require('./fileHandling') ;
// const {printMovieInfo , printOptions , displayCatalog} = require('./printing.js') ;
// const {fetchNewMovieData , fetchData} = require('./apiRequests.js') ;
// const {searchFilter , Search , Filter ,deleteMovie , updateDetails , addNewMovie} = require ('./functions.js') ; 
// import { readFile, writeToFile } from  "./fileHandling.js";
// import { printMovieInfo , printOptions , displayCatalog }
// from "./printing.js";
// import { fetchData , fetchNewMovieData
// } from "./apiRequests.js"
// import { addNewMovie , fetchData , searchFilter , Search , Filter } from "./functions.js";
// export {Search ,searchFilter ,Filter , deleteMovie , updateDetails , addNewMovie}
let searchFilter = ()=>{
    let choice = prompt("Would you like to : 1) Search , 2) Filter : ") ;
    choice = Number(choice) ;
    switch(choice){
        case 1 :
            Search() ;
        break ;
        case 2 : 
            Filter(obj) ;
        break ;
        default : 
        console.log("That was not an option , sorry.") ;
        break; 
    }
}
let Search = ()=>{
    console.log("Would you like to search based on : ") ;
    console.log("1-) Title ") ;
    console.log("2-) Director ") ;
    console.log("3-) Genre ") ;
    let ans = prompt("Enter the number of your choice : ") ;
    ans = Number(ans) ;
    let newArr = [] ;
    if (ans == 1){
        let title = prompt("Enter the title you would like to search for : ") ;
        title = title.trim() ;    
        newArr  = obj.filter(movie => movie.Title.toLowerCase() === title.toLowerCase()) ;
        console.log() ;

    }
    else if (ans == 2){
        let direct = prompt("Enter the name of the director : ") ;
        direct = direct.trim() ;
        newArr = obj.filter(movie => movie.Director.toLowerCase() == direct.toLowerCase()) ;
        console.log() ;
    }
    else if (ans == 3){
        let genNum = prompt("Enter number of genres you would like to search for (any movie with at least one will be included): ") ;
        console.log() ;
        genNum = Number(genNum) ;
        let genres = [] ;
        for (let i = 0; i < genNum; i++){
            let gen = prompt(`Enter the ${i+1}${i+1 == 1 ? "st" : i+1 == 2 ? "nd" : i+1 == 3 ? "rd" : "th"} genre : `) ;
            gen = gen.trim() ;
            genres.push(gen.toLowerCase()) ;
        }
        console.log("The genres you entered are : ") ;
        genres.forEach(genre => console.log(genre)) ;
        console.log() ;
        obj.forEach(movie =>{
            //console.log(movie.Genre.toLowerCase()) ;
            genres.every(genre =>{
                if (movie.Genre.toLowerCase().includes(genre) && newArr) {
                    // cnt++ ;
                    newArr.push(movie) ;
                    return false ;
                }
                return true ;
            })
        })
    }
    else {
        console.log("That was not an option.") ;
        return ;
    }

    if (newArr.length == 0){
        console.log("Unfortunately , we were unable to find anything based on your search criteria.") ;

    }
    else {
        console.log("The titles of the items we found are : ") ;
        newArr.forEach(movie => {
            console.log(`${movie.Title}`) ;
        })
        let secondChoice = prompt("If you would like to filter the search results enter y or yes , if not enter anything else. ") ;
        secondChoice = secondChoice.trim().toLowerCase() ;
        if (secondChoice === 'yes' || secondChoice === 'y')Filter(newArr) ;
        else console.log("You have chosen not to filter.")
    }
}
let Filter=(arr)=>{
    let curDate = new Date() ;
    console.log("You have chosen to filter movies (based on the year) : ")
    let start = prompt("Find all movies after the year : ")  ;
    let end = prompt("And before the year : "); 
    start = Number(start) ;
    end = Number(end) ;
    console.log() ;
    if (isNaN(start) || isNaN(end)){
        console.log("That was not a number :( ") ;
        return ;
    }
    if (start > curDate.getFullYear()){
        console.log("The start date hasn't arrived yet , however these are the movies that are coming soon.")
        arr.forEach(movie => {
            if (movie.Year == 'coming soon'){
                console.log(`${movie.Title}`) ;
            }
        })
    }
    else if (end  <  start){
        console.log("Illogical range (end is less than start)") ;
    }
    else {
        arr.forEach(movie => {
            let years = movie.Year.split('–') ;
            years.forEach(year => year = Number(year)) ;
            if (years.length == 1){
                //console.log(1) ;
                if (years[0] >= start && years[0] <= end)console.log(`${movie.Title} , ${movie.Year}`) ;
            }
            else if (years.length == 2){
                //console.log(2) ;
                //console.log(`${years[0]} , [${years[1]}]`) ;
                if (years[0] >= start && years[1] == '' && end >= curDate.getFullYear()){
                    console.log(`${movie.Title} , ${movie.Year}`)
                }
                else if (years[0] >= start && years[1]!= ''&&years[1] <= end)
                    console.log(`${movie.Title} , ${movie.Year}`) ;
            }
            else {
                console.log("years is empty") ;
            }
        })
    }


}
let deleteMovie=()=>{
    displayCatalog() ;
    let title = prompt("Enter the title of the movie you would like to delete spelled correctly : ") ;
    console.log() ;
    title = title.trim() ;
    console.log(`The title you entered is [${title}]`) ;
    let found = false ;
    obj = obj.filter(movie => {
        
        if (typeof(movie.Title) == "string" && movie["Title"].toLowerCase() !== title.toLowerCase()){
            return movie ;
        }
        else found = true; 
    })
    if (!found)console.log("Sorry , there is no movie or tvShow with that title in our catalog") ;
    else {
        writeToFile() ;
        console.log("Deletion successful. ") ;
    }
}
let updateDetails=()=>{
    displayCatalog() ;
    let title = prompt("Enter the title of the movie you would like to update spelled correctly : ") ;
    console.log() ;
    title = title.trim() ;
    console.log(`The title you entered is [${title}]`) ;
    let found = false ;
    obj.forEach(movie => {
        
        if (typeof(movie.Title) == "string" && movie["Title"].toLowerCase() == title.toLowerCase()){
            found = true ;
            console.log("found") ;
            let items  = ["Title" , "Year" , "Genre" , "Director" ] ;
            console.log("What would you like to edit : ") ;
            for (let i = 0; i < items.length; i++){
                console.log() ;
                console.log(`The current ${items[i]} is ${movie[items[i]]}.`)
                let ans = prompt(`Enter \"yes or y\" if you would like to edit the ${items[i]} , anything else otherwise. `)
                ans = ans.trim() ;
                if (ans.toLowerCase() === 'yes' || ans.toLowerCase() === 'y'){
                    let value = prompt("Enter the value you would like to set it as : ") ;
                    movie[items[i]] = value ;
                    console.log(`The new ${items[i]} is ${movie[items[i]]}`) ;
                }
                else console.log("You have chosen not to edit this attribute.") ;
            }

        }
    })
    if (!found)console.log("Sorry , there is no movie or tvShow with that title in our catalog") ;
    else {
        writeToFile() ;
        console.log("Update successful. ") ;
    }

}

let addNewMovie=()=>{
    console.log("You have chosen to add a new movie and provide all necessary information. ") ;
    let title = prompt("Enter the movie title : ") ;
    let drct = prompt("Enter the name of the Director : ") ;
    let yr = prompt("Enter the release year : ") ;
    yr = Number(yr) ;
    let genre = prompt("Enter the genre : ") ;
    let type = prompt ("Enter the type as \"movie\" or \"tv series\" (if entered incorrectly the defualt value is movie) : ") ;
    if (type != 'movie' && type != 'tv series')type = 'movie' ;
    let curDate = new Date() ;
    if (yr < 1900 || yr > curDate.getFullYear() + 5 ){
        console.log("Invalid Year , unable to add.Can only add movies from 1900 up to five years from now. ")
    }
    else {
        if (yr <= curDate.getFullYear() + 5 && yr > curDate.getFullYear())yr = "coming soon" ;
        let movie = {
            Title : title , 
            Director : drct , 
            Year : yr ,
            Genre : genre , 
            Type : type ,
        }
        obj.push(movie) ;
        writeToFile() ;
        console.log("Written to file") ;
    }

}
exports.searchFilter = searchFilter ;
exports.Search = Search ;
exports.Filter = Filter ;
exports.deleteMovie =  deleteMovie ;
exports.updateDetails = updateDetails ;
exports.addNewMovie = addNewMovie ;
