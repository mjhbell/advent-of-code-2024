const fs = require('node:fs');
const readline = require('readline');

const start = Date.now();
var rulesLoaded = false;
var updatesLoaded = false;
var inputRules = new Array();
var inputUpdates = new Array();
var badUpdates = [];

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

//var noOfUpdates = 10;
readerUpdates.on('line', function(line){
    //if(noOfUpdates > 0){
        inputUpdates.push(line.split(','));
    //}
    //noOfUpdates = noOfUpdates-1;
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

    //Sort rules array
    inputRules.sort();

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

        if(updateGood === false){
            badUpdates.push(inputUpdates[i]);
        }
    }

    for(var i=0; i<badUpdates.length; i++){
        const badUpdate = badUpdates[i];
        for(var j=0; j<inputRules.length; j++){
            const inputRule = inputRules[j];
            for(var k=0; k<badUpdate.length; k++){
                if(badUpdate[k] === inputRule[1]){
                    for(var m=(k+1); m<badUpdate.length; m++){
                        if(badUpdate[m] === inputRule[0]){
                            array_move(badUpdate,m,k);
                        }
                    }
                }
            }
        }
    }

    for(var i=0; i< badUpdates.length; i++){
        const badUpdate = badUpdates[i];
        const middlePosition = ((badUpdate.length+1)/2)-1;
        const middle = badUpdate[middlePosition];
        answer += parseInt(middle);
    }

    //Return the answer
    console.log(`Answer: ${answer} , found in: ${Date.now()-start}ms`);

}

//This function stack overflow - https://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another
function array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
};
