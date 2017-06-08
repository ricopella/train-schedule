////////////////////////////////////////////////////////
////////////////////  TRAIN        ////////////////////
///////////////////      SCHEDULE ////////////////////
/////////////////////////////////////////////////////

/* Pseudo Code - by Narin Sundarabhaya

On Page Load:

- render schedule from firebase database

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


database.ref().on("child_added", function(snapshot) {

    console.log("the child_added data", snapshot.val());

    //  create local variables to store the data from firebase

    // compute the difference in time from 'now' and the first rain, store in var
    // get the remainder of time after using 'mod' with the frequency, store in var
    // subtract the remainder from the frequency, store in var

    //  format 'timeInMintes' and store in var aka 'make pretty'

    // If firebase has train stored
    if (snapshot.child("trainObject").exists()) {

        // append to our table of trains, inside tbody, with a new row of the train data
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
    //  EDIT PARSE INTO UNIX TIMESTAMP w/ MOMENT
    var trainTime = $("#train-time").val().trim();
    var trainFrequency = $("#time-freq").val().trim();

    var trainObj = {};
    trainObj.name = trainName;
    trainObj.destination = trainDestination;
    trainObj.time = trainTime;
    trainObj.frequency = trainFrequency;

    // add to firebase databse
    database.ref().push({
        trainObject: trainObj,
    });
    console.log("this should work3");

    //  alert that train was added


    //  empty for once submitted
    $("#train-name").val("");
    $("#train-destination").val("");
    $("#train-time").val("");
    $("#time-freq").val("");
};

// on page load - ready the event handler function
$(document).ready(function() {
    $("#btn-add").on("click", storeTrain);
});