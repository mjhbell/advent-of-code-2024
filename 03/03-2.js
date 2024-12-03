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
    const mulMatch = /mul\([0-9]{1,3},[0-9]{1,3}\)|don\'t\(\)|do\(\)/g;
    const instructionsLine = line.match(mulMatch);
    instructions.push(...instructionsLine);
})

//Listen for end of read stream and start calculation.
reader.on('close', calculateAnswer);

function calculateAnswer(){
    var answer = 0;
    var doBool = true;

    //console.log(instructions);

    for(var i=0; i<instructions.length; i++){

        //check if this might be a "do"
        if(instructions[i].startsWith('do')){
            doBool = true;
        }
        //override if a "don't"
        if(instructions[i].startsWith('don')){
            doBool = false;
        }
        //if "do" process valid "mul"
        if(doBool === true && instructions[i].startsWith('mul') === true){
            const instruction = instructions[i];
            const instructionAnswer = mul(instruction);
            answer += instructionAnswer;
        }
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