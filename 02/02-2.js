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
    console.log(`Answer: ${answer} , found in: ${Date.now()-start}ms`); //318
}

function safetyCheck(report){

    var safe = report.length;
    console.log(report);

    for(var j=0; j<report.length; j++){

        //Generate different report combinations and test each
        const miniReport = report.toSpliced(j,1);

        Loop:
        for(var i=0; i<(miniReport.length-1); i++){

            if(i > 0){
                //increase then decrease
                if(miniReport[i-1] > miniReport[i] && miniReport[i] < miniReport[i+1]){
                    safe = safe - 1;
                    break Loop;
                }

                //decrease then increase
                if(miniReport[i-1] < miniReport[i] && miniReport[i] > miniReport[i+1]){
                    safe = safe - 1;
                    break Loop;
                }
            }

            if(Math.abs(miniReport[i] - miniReport[i+1]) > 3 || Math.abs(miniReport[i] - miniReport[i+1]) < 1){
                safe = safe - 1;
                break Loop;
            }

        }
    }
    
    //If no report combination is safe, that report is not safe
    if(safe <= 0){
        return 0;
    }else{
        return 1;
    }

}