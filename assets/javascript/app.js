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
    var minutesTillArrival = "";
    var nextTrainTime = "";
    var frequency = snapshot.val().frequency;

    // compute the difference in time from 'now' and the first train using UNIX timestamp, store in var and convert to minutes
    trainDiff = moment().diff(moment.unix(snapshot.val().time), "minutes");
    console.log("Difference in time " + trainDiff + " seconds");
    // get the remainder of time by using 'moderator' with the frequency & time difference, store in var
    trainRemainder = trainDiff % frequency;
    console.log("Remainder: " + trainRemainder);
    // subtract the remainder from the frequency, store in var
    minutesTillArrival = frequency - trainRemainder;
    console.log("Minutes Till Next Train: " + minutesTillArrival);
    // add minutesTillArrival to now, to find next train & convert to standard time format
    nextTrainTime = moment().add(minutesTillArrival, "m").format("hh:mm A");
    console.log("Next Train Time: " + nextTrainTime);



    // append to our table of trains, inside tbody, with a new row of the train data
    $("#table-data").append(
        "<tr><td>" + snapshot.val().name + "</td>" +
        "<td>" + snapshot.val().destination + "</td>" +
        "<td>" + frequency + "</td>" +
        "<td>" + minutesTillArrival + "</td>" +
        "<td>" + nextTrainTime + "</td>" +
        "<hr /></tr>"
    );
});

// function to call the button event, and store the values in the input form
$("#btn-add").on("click", function(event) {
    event.preventDefault();

    // get & store input values
    trainName = $("#train-name").val().trim();
    trainDestination = $("#train-destination").val().trim();
    trainTime = moment($("#train-time").val().trim(), "HH:mm").subtract(1, "years").format("X");
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