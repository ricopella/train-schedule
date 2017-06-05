////////////////////////////////////////////////////////
////////////////////  TRAIN        ////////////////////
///////////////////      SCHEDULE ////////////////////
/////////////////////////////////////////////////////

/* Pseudo Code - by Narin Sundarabhaya

On Page Load:


 */

var trains = {
    data: [
        burlington = {
            destination: "burlington",
            time: "06:00",
            frequency: 60,
        }
    ]
}

// function to display each trains in the table
var renderPage = function() {

    for (i = 0; i < trains.data.length; i++) {

    }

}

// event handler for storing train values
$("#btn-add").on("click", function() {
    var trainName = $("#train-name").val().trim();
    var trainDestination = $("#train-destination").val().trim();
    var trainTime = $("#train-time").val().trim();
    var trainFrequency = $("#time-freq").val().trim();
    // create object & add values from user input
    var trainObj = {};
    trainObj.name = trainName;
    trainObj.destination = trainDestination;
    trainObj.time = trainTime;
    trainObj.frequency = trainFrequency;
    // add to global trains array
    trains.data.push(trainObj);

});

console.log(trains);