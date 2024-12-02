const fs = require('node:fs');
const readline = require('readline');

const start = Date.now();

//Globals to store column data
var reports = new Array();

//Stream reader to process input file
var reader = readline.createInterface({
    input: fs.createReadStream('input.txt')
});

//Push column values into their respective arrays
reader.on('line', function(line){
    const report = line.split(' ').map(function(item) {
        return parseInt(item);
    });
    reports.push(report);
})

//Listen for end of read stream and start calculation.
reader.on('close', calculateAnswer);

function calculateAnswer(){

    const noOfReports = reports.length;
    var answer = 0;

    for(var i=0; i<noOfReports; i++){
        answer += safetyCheck(reports[i]);
    }

    //Return the answer
    console.log(`Answer: ${answer} , found in: ${Date.now()-start}ms`); //246
}

function safetyCheck(report){
    
    const reportLength = report.length;
    var safe = 1;

    for(var i=0; i<(reportLength-1); i++){

        if(i > 0){
            //increase then decrease
            if(report[i-1] > report[i] && report[i] < report[i+1]){
                safe = 0;
            }

            //decrease then increase
            if(report[i-1] < report[i] && report[i] > report[i+1]){
                safe = 0;
            }
        }

        if(Math.abs(report[i] - report[i+1]) > 3 || Math.abs(report[i] - report[i+1]) < 1){
            safe = 0;
        }
    }
    
    return safe;

}