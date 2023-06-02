const prompt = require("prompt-sync")({ sigint: true });
const fs = import("fs") ;
// export {fetchData , fetchNewMovieData} ;
const {readFile , writeToFile} = require('./fileHandling.js') ;
const {printMovieInfo , printOptions , displayCatalog} = require('./printing.js') ;
// const {fetchNewMovieData , fetchData} = require('./apiRequests.js') ;
// const {searchFilter , Search , Filter ,deleteMovie , updateDetails , addNewMovie} = require ('./functions.js') ;
var {config} = require('./config.js') ;
let myKey = config.MY_KEY ;

async function fetchData(str){
    // console.log("in fetch data") ;
    try {
        // console.log(`http://www.omdbapi.com/?${str}&apikey=503bd9bc`) ;
        let response =  await fetch(
        `http://www.omdbapi.com/?${str}&apikey=${myKey}`) ;
        // console.log("am i done ?") ;
        if (response.ok){
            let search = await response.json() ;
            // console.log(search) ;
            obj.push(search) ;
            writeToFile() ;
            printMovieInfo(search) ;
            search = undefined ;
            return true ;
        }
        else {
            console.log("uh-oh something went wrong") ;
        }
        console.log("done waiting") ;
        
        
    }
    catch(e){
        console.log(e) ;
        console.log("Uh-oh an error occured while trying to fetch data") ;
        return false;
    }

}

async function fetchNewMovieData(){
    console.log("Choose the movie details you would like to provide : ") ;
    console.log("1-) Imdb Id ") ;
    console.log("2-) Movie title ") ;
    let num = prompt("Enter the number of your choice : ") ;
    let res = -1 ;
    num = Number(num) ;
    switch(num){
        case 1 : 
            let id = prompt("Enter the imdb id : ") ;
            res = await fetchData(`i=${id}`) ;
            
        break; 
        case 2 : 
            let name = prompt("Enter the title : ")
            name = name.split(" ").join('+') ;
            res = await fetchData(`t=${name}`) ;
        break ;
        default : 
        console.log("That was not an option. ") ;
        break; 
    }
    // console.log("out of switch") ;
    if (res == -1){
        console.log("Invalid data entry") ;
        return false ;
    }
    else if (res == true){
        console.log("Added to the database") ;
        return true ;

    }
    else {

        console.log("returned incorrectly") ;
        return false ;
    }
    

}


exports.fetchData = fetchData ;
exports.fetchNewMovieData = fetchNewMovieData ;