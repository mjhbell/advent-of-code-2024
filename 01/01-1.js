const fs = require('node:fs');
const readline = require('readline');

const start = Date.now();

//Globals to store column data
var array1 = new Array();
var array2 = new Array();

//Stream reader to process input file
var reader = readline.createInterface({
    input: fs.createReadStream('input.txt')
});

//Push column values into their respective arrays
reader.on('line', function(line){
    const arrLine = line.split('   ');
    array1.push(arrLine[0]);
    array2.push(arrLine[1]);
})

//Listen for end of read stream and start calculation.
reader.on('close', calculateAnswer);

function calculateAnswer(){
    //Sort both arrays
    array1.sort();
    array2.sort();

    //Initialise answer variable
    var answer = 0;

    //Only calculate array length once.
    const arrayLength = array1.length;

    //Itterate through arrays compiling the answer
    for(var i=0; i<arrayLength; i++){
        const val1 = array1[i];
        const val2 = array2[i];
        if(val1 >= val2){
            answer = answer + (val1 - val2);
        }else{
            answer = answer + (val2 - val1);
        }
    }

    //Return the answer
    console.log(`Answer: ${answer} , found in: ${Date.now()-start}ms`);
}