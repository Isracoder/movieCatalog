// import { readFile, writeToFile } from  "./fileHandling.js";
// import { printMovieInfo , printOptions , displayCatalog }
// from "./printing.js";
// import { fetchData , fetchNewMovieData
// } from "./apiRequests.js"
// import {Search ,searchFilter ,Filter , deleteMovie , updateDetails , addNewMovie } from "./functions.js";
const fs = require("fs") ;
let readFile = ()=> {
    obj = fs.readFileSync( "project3\\data.json", 'utf-8' ,(error , data)=>{
        if (error){
            console.log(error) ;
            throw error ;
        }
        //obj =  JSON.parse(data) ;
        //console.log(obj) ;
        return JSON.parse(data) ;
        //updateJson() ;
    })
    obj = JSON.parse(obj) ;
    console.log(obj.length) ;
    console.log(typeof obj) ;
}

let writeToFile=()=>{
    fs.writeFileSync("project3\\data.json", JSON.stringify(obj), 'utf8', (err) => {
        if (err) {
            console.log(err);
            throw err;
        }
    })
}

// export   {readFile , writeToFile} ;
exports.readFile  = readFile ;
exports.writeToFile = writeToFile ;