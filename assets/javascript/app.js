////////////////////////////////////////////////////////
////////////////////  TRAIN        ////////////////////
///////////////////      SCHEDULE ////////////////////
/////////////////////////////////////////////////////

/* Pseudo Code - by Narin Sundarabhaya

On Page Load:


 */

// event handler for storing train values
$("#btn-add").on("click", function() {
    var $trainName = $("#train-name").val().trim();
    var $trainDestination = $("#train-destination").val().trim();
    var $trainTime = $("#train-time").val().trim();
    var $trainFrequency = $("#time-freq").val().trim();

    console.log("name: " + $trainName + " destination: " + $trainDestination + " time: " + $trainTime + " frequency: " + $trainFrequency);
});