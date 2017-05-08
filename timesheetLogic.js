
// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed


//=============Initialize Firebase====================
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBKw5eWvW6rPwAsQkp2mw0UXDx3qvqmXkU",
    authDomain: "homeworktrain.firebaseapp.com",
    databaseURL: "https://homeworktrain.firebaseio.com",
    projectId: "homeworktrain",
    storageBucket: "homeworktrain.appspot.com",
    messagingSenderId: "101159148786"
  };
  firebase.initializeApp(config);


//variable for firebase database
var database = firebase.database();





//==================User Click ==========================

$("#add-employee-btn").on("click", function(event) {
	event.preventDefault();



//grab user input
var trainName = $("#employee-name-input").val().trim();
var trainDestination = $("#role-input").val().trim();
var trainStartTime = $("#start-input").val().trim();
var trainFrequency = $("#rate-input").val().trim();


//temporary object for holding employee data
var newEmp = {
	name: trainName,
	role: trainDestination,
	start: trainStartTime,
	rate: trainFrequency
};

//uploads to the database
database.ref().push(newEmp);

//logs everything to console
console.log(newEmp.name);
console.log(newEmp.start);
console.log(newEmp.role);
console.log(newEmp.rate);

//Alert
alert("Train Time successfully added");

//Clears all of the text boxes
$("#employee-name-input").val("");
$("role-input").val("");
$("start-input").val("");
$("rate-input").val("");

});





//============DATABASE REF AND APPEND ================================
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().role;
  var trainStartTime = childSnapshot.val().start;
  var trainFrequency = childSnapshot.val().rate;


  // Employee Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainStartTime);
  console.log(trainFrequency);

  // Prettify the train start
  var trainStartPretty = moment.unix(trainStartTime).format("HH:mm");

  //==============Calculate next arrival=================================

  //First Time 
  var trainFirstConverted = moment(trainStartTime, "HH:mm").subtract(1, "years");
  console.log("Train Start Time Minutes Value: " + trainStartTime);


  //Current Time
  var currentTime = moment().subtract(1, "years");
  	console.log("Current Time is: " + currentTime);


  //Difference between the times
  var diffTime = moment().diff(moment(trainFirstConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  //Time Apart
  var tRemainder = diffTime % trainFrequency;
  console.log("Remainder : " + tRemainder)

  //Minutes until Train
  var tMinutesTillTrain = trainFrequency = tRemainder;
  console.log("Minutes Till Train: " + tMinutesTillTrain);

  //next train 
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("Arrival Time: " + moment(nextTrain).format("hh:mm"));


  var empMonths = moment().diff(moment.unix(trainStartTime, "X"), "months");
  console.log(empMonths);

  // Calculate the minutes away
  var empBilled = empMonths * trainFrequency;
  console.log(empBilled);

  // Add each train's data into the table
  $("#employee-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainStartPretty + "</td><td>" + trainFrequency + "</td><td>" + nextTrain + "</td></tr>" + tMinutesTillTrain + "</td></tr>");
});
