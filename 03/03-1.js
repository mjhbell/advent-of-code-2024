const fs = require('node:fs');
const readline = require('readline');

const start = Date.now();

var instructions = new Array();

//Stream reader to process input file
var reader = readline.createInterface({
    input: fs.createReadStream('input.txt')
});

//Push column values into their respective arrays
reader.on('line', function(line){
    const mulMatch = /mul\([0-9]{1,3},[0-9]{1,3}\)/g;
    const instructionsLine = line.match(mulMatch);
    instructions.push(...instructionsLine);
})

//Listen for end of read stream and start calculation.
reader.on('close', calculateAnswer);

function calculateAnswer(){
    var answer = 0;
    for(var i=0; i<instructions.length; i++){
        const instruction = instructions[i];
        const instructionAnswer = mul(instruction);
        answer += instructionAnswer;
    }

    //Return the answer
    console.log(`Answer: ${answer} , found in: ${Date.now()-start}ms`); //166630675

}

function mul(instruction){
    const numMatch = /[0-9]{1,3}/g;
    const nums = instruction.match(numMatch);
    const instructionAnswer = parseInt(nums[0]) * parseInt(nums[1]);
    return instructionAnswer;
}