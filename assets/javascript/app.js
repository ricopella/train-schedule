////////////////////////////////////////////////////////
////////////////////  TRAIN        ////////////////////
///////////////////      SCHEDULE ////////////////////
/////////////////////////////////////////////////////

/* Pseudo Code - by Narin Sundarabhaya

On Page Load:

- render schedule in localStorage




 */

// global variables
var trains = {
    data: []
}

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

// function to display each train in the table
var renderPage = function() {

    for (i = 0; i < trains.data.length; i++) {
        $("tbody").append(
            "<tr><td>" + trains.data[i].name + "</td>" +
            "<td>" + trains.data[i].destination + "</td>" +
            "<td>" + trains.data[i].time + "</td>" +
            "<td>" + trains.data[i].frequency + "</td>" + "<hr /></tr>"
        )
    }
    console.log("render page: " + trains.data);
};

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
    // update HTML on submit
    renderPage();

    $("#train-name").empty();
    $("#train-destination").empty();
    $("#train-time").empty();
    $("#time-freq").empty();
    console.log("button click: " + trains.data);
});

console.log("global: " + trains.data);

// on page load, render trains in localStorage
renderPage();