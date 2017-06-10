////////////////////////////////////////////////////////
////////////////////  TRAIN        ////////////////////
///////////////////      SCHEDULE ////////////////////
/////////////////////////////////////////////////////

/* Pseudo Code - by Narin Sundarabhaya

On Page Load:

- render schedule from firebase database

 */

var trainName = "";
var trainDestination = "";
var trainTime = "";
var trainFrequency = "";
var nextArrival = "";
var minutesAway = "";

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
    var trainDiff = 0;
    var trainRemainder = 0;
    var nowUNIX = moment().format("X");
    var remainFreq = "";

    // compute the difference in time from 'now' and the first train, store in var
    trainDiff = nowUNIX - snapshot.val().time;
    console.log("now " + nowUNIX + "trainTime " + snapshot.val().time);
    console.log("Train Difference work? " + trainDiff);
    // get the remainder of time after using 'moderator' with the frequency, store in var
    trainRemainder = snapshot.val().time % snapshot.val().frequency;
    console.log("Remainder: " + trainRemainder);
    // subtract the remainder from the frequency, store in var
    remainFreq = snapshot.val().frequency - trainRemainder;
    console.log("remaining Frequency: " + remainFreq);
    //  format 'timeInMintes' and store in var aka 'make pretty'

    // append to our table of trains, inside tbody, with a new row of the train data
    $("tbody").append(
        "<tr><td>" + snapshot.val().name + "</td>" +
        "<td>" + snapshot.val().destination + "</td>" +
        "<td>" + snapshot.val().time + "</td>" +
        "<td>" + snapshot.val().frequency + "</td>" +
        "<td>" + snapshot.val().nextArrival + "</td>" +
        "<td>" + snapshot.val().minutesAway + "</td>" +
        "<hr /></tr>"
    );
});

// function to call the button event, and store the values in the input form
$("#btn-add").on("click", function(event) {
    event.preventDefault();

    // get & store input values
    trainName = $("#train-name").val().trim();
    trainDestination = $("#train-destination").val().trim();
    // saving time in UNIX value
    trainTime = moment($("#train-time").val().trim(), "HH:mm").format("X");
    trainFrequency = $("#time-freq").val().trim();

    // add to firebase databse
    database.ref().push({
        name: trainName,
        destination: trainDestination,
        time: trainTime,
        frequency: trainFrequency,
        nextArrival: nextArrival,
        minutesAway: minutesAway,
        date_added: firebase.database.ServerValue.TIMESTAMP
    });

    //  alert that train was added
    alert("Train added!");

    //  empty for once submitted
    $("#train-name").val("");
    $("#train-destination").val("");
    $("#train-time").val("");
    $("#time-freq").val("");
});