const fs = require('node:fs');
const readline = require('readline');

const start = Date.now();
var lines = new Array();

//Stream reader to process input file
var reader = readline.createInterface({
    input: fs.createReadStream('input.txt')
});

//Push column values into their respective arrays
reader.on('line', function(line){
    lines.push(line);
})

//Listen for end of read stream and start calculation.
reader.on('close', calculateAnswer);

function calculateAnswer(){
    var answer = 0;

    console.log(lines);

    for(var i = 1; i<(lines.length-1); i++){
        const lineBefore = lines[i-1];
        const line = lines[i];
        const lineAfter = lines[i+1];
        for(var j=1; j<(line.length-1); j++){
            if(line.substr(j,1) === 'A'){
                if(lineBefore.substr(j-1,3).match(/M.M/) !== null && lineAfter.substr(j-1,3).match(/S.S/) !== null){
                    answer += 1;
                }
                if(lineBefore.substr(j-1,3).match(/S.S/) !== null && lineAfter.substr(j-1,3).match(/M.M/) !== null){
                    answer += 1;
                }
                if(lineBefore.substr(j-1,3).match(/M.S/) !== null && lineAfter.substr(j-1,3).match(/M.S/) !== null){
                    answer += 1;
                }
                if(lineBefore.substr(j-1,3).match(/S.M/) !== null && lineAfter.substr(j-1,3).match(/S.M/) !== null){
                    answer += 1;
                }
            }
        }
    }

    
    //Return the answer
    console.log(`Answer: ${answer} , found in: ${Date.now()-start}ms`);
    
}
