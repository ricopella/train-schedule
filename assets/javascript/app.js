////////////////////////////////////////////////////////
////////////////////  TRAIN        ////////////////////
///////////////////      SCHEDULE ////////////////////
/////////////////////////////////////////////////////

/* Pseudo Code - by Narin Sundarabhaya

On Page Load:

- render schedule in localStorage




 */


// Initialize Firebase
var config = {
    apiKey: "AIzaSyDRc8WHqEiPmt5eZgB_HxRygGA31dqHKPg",
    authDomain: "train-schedule-bd950.firebaseapp.com",
    databaseURL: "https://train-schedule-bd950.firebaseio.com",
    projectId: "train-schedule-bd950",
    storageBucket: "train-schedule-bd950.appspot.com",
    messagingSenderId: "236709814864"
};
firebase.initializeApp(config);

// Assign the reference to the database to a variable named 'database'
var database = firebase.database();


database.ref().on("value", function(snapshot) {

    // If firebase has train stored
    if (snapshot.child("trainObject").exists()) {

        // function to display each train in the table

        $("tbody").append(
            "<tr><td>" + snapshot.val().name + "</td>" +
            "<td>" + snapshot.val().destination + "</td>" +
            "<td>" + snapshot.val().time + "</td>" +
            "<td>" + snapshot.val().frequency + "</td><hr /></tr>"
        )
    } else {
        $("#table-data").html("<h2>No Current Trains Scheduled</h2>");
    };

}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
});

// function to call the button event, and store the values in the input form
var storeTrain = function(event) {

    event.preventDefault();

    // get & store input values
    var trainName = $("#train-name").val().trim();
    var trainDestination = $("#train-destination").val().trim();
    var trainTime = $("#train-time").val().trim();
    var trainFrequency = $("#time-freq").val().trim();

    var trainObj = {};
    trainObj.name = trainName;
    trainObj.destination = trainDestination;
    trainObj.time = trainTime;
    trainObj.frequency = trainFrequency;

    // add to firebase databse
    database.ref().set({
        trainObject: trainObj,
    });
    console.log("this should work3");


    //  empty for once submitted
    $("#train-name").clear();
    $("#train-destination").clear();
    $("#train-time").clear();
    $("#time-freq").clear();
};

$(document).ready(function() {
    $("#btn-add").on("click", storeTrain);
});