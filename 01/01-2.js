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

    //Only calculate array lengths once
    const array1Length = array1.length;
    const array2Length = array2.length;
    var array2Position = 0;

    //Itterate through arrays compiling the answer
    //Track position in Array2 to avoid wasteful recursion.
    for(var i=0; i<array1Length; i++){
        var count = 0;
        for(var j=array2Position; j<array2Length; j++){
            if(array1[i] === array2[j]){
                count = count + 1;
            }
            if(array2[j] > array1[i]){
                array2Position = j;
                break;
            }
        }
        if(count > 0){
            answer = answer + (array1[i] * count);
        }
    }

    //Return the answer
    console.log(`Answer: ${answer} , found in: ${Date.now()-start}ms`);
}