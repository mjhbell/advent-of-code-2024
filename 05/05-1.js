const fs = require('node:fs');
const readline = require('readline');

const start = Date.now();
var rulesLoaded = false;
var updatesLoaded = false;
var inputRules = new Array();
var inputUpdates = new Array();
var goodUpdates = [];

//Stream reader to process input-rules file
var readerRules = readline.createInterface({
    input: fs.createReadStream('input-rules.txt')
});

//Stream reader to process input-updates file
var readerUpdates = readline.createInterface({
    input: fs.createReadStream('input-updates.txt')
});

readerRules.on('line', function(line){
    inputRules.push(line.split('|'));
})

readerUpdates.on('line', function(line){
    inputUpdates.push(line.split(','));
})

//Listen for end of read stream and start calculation.
readerRules.on('close', () => {
    rulesLoaded = true;
    if(updatesLoaded === true){
        calculateAnswer();
    }
});

//Listen for end of read stream and start calculation.
readerUpdates.on('close', () => {
    updatesLoaded = true;
    if(rulesLoaded === true){
        calculateAnswer();
    }
});

function calculateAnswer(){
    
    var answer = 0;

    for(var i=0; i<inputUpdates.length; i++){

        var updateGood = true;
        const inputUpdate = inputUpdates[i];

        for(var j=0; j<inputUpdate.length; j++){

            const currentPage = inputUpdate[j];

            for(var k=0; k<inputRules.length; k++){

                if(inputRules[k][0] === currentPage){
                    const checkPage = inputRules[k][1]

                    for(var m=0; m<j; m++){

                        if(inputUpdate[m] === checkPage){
                            updateGood = false;
                        }
                    
                    }

                }
            }

        }

        if(updateGood === true){
            goodUpdates.push(inputUpdates[i]);
        }
    }

    for(var i=0; i< goodUpdates.length; i++){
        const goodUpdate = goodUpdates[i];
        const middlePosition = ((goodUpdate.length+1)/2)-1;
        const middle = goodUpdate[middlePosition];
        answer += parseInt(middle);
    }

    //Return the answer
    console.log(`Answer: ${answer} , found in: ${Date.now()-start}ms`);

}