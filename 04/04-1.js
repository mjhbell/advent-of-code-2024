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
    generateLineCombos();
    console.log(lines);
    var answer = 0;

    for(var i=0; i<lines.length; i++){
        const line = lines[i];
        const matches = line.match(/XMAS/g);
        if(matches !== null){
            answer += matches.length;
        }
        const matchesReverse = line.match(/SAMX/g);
        if(matchesReverse !== null){
            answer += matchesReverse.length;
        }
    }

    //Return the answer
    console.log(`Answer: ${answer} , found in: ${Date.now()-start}ms`);
    
}

function generateLineCombos(){
    var width = lines[0].length;
    var rows = lines.length;
    var diagonals1 = [];
    var diagonals2 = [];
    const pad = ' ';


    for(var i=0; i<lines.length; i++){
        const diagonal = pad.repeat(i) + lines[i] + pad.repeat(lines[i].length - i);
        diagonals1.push(diagonal);
    }

    for(var i=0; i<lines.length; i++){
        const diagonal = pad.repeat(lines[i].length - i)+ lines[i] + pad.repeat(i);
        diagonals2.push(diagonal);
    }

    console.log(diagonals1);
    console.log(diagonals2);

    
    //Vertical lines
    for(var i=0; i<width; i++){
        var newLine = '';
        for(var j=0; j<rows; j++){
            newLine += lines[j].substr(i,1);
        }
        lines.push(newLine);
    }
    width = diagonals1[0].length;
    rows = diagonals1.length;
    //Diagonal1 lines
    for(var i=0; i<width; i++){
        var newLine = '';
        for(var j=0; j<rows; j++){
            newLine += diagonals1[j].substr(i,1);
        }
        lines.push(newLine);
    }
    width = diagonals2[0].length;
    rows = diagonals2.length;
    //Diagonal2 lines
    for(var i=0; i<width; i++){
        var newLine = '';
        for(var j=0; j<rows; j++){
            newLine += diagonals2[j].substr(i,1);
        }
        lines.push(newLine);
    }

}