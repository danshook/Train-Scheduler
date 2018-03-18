// Initialize Firebase
var config = {
  apiKey: "AIzaSyChS6q_AnSekpGi7qJxzaaItcHpUPD5ymw",
  authDomain: "train-scheduler-d7cfb.firebaseapp.com",
  databaseURL: "https://train-scheduler-d7cfb.firebaseio.com",
  projectId: "train-scheduler-d7cfb",
  storageBucket: "train-scheduler-d7cfb.appspot.com",
  messagingSenderId: "851069447994"
};
firebase.initializeApp(config);

var database = firebase.database();

// Button for adding Trains
$("#submit").on("click", function(event) {
  event.preventDefault();
  console.log("button works");

  // Grabs user input
  var trainName = $("#name")
    .val()
    .trim();
  var destination = $("#destination")
    .val()
    .trim();
  var trainTime = moment(
    $("#time")
      .val()
      .trim(),
    "HH/mm"
  ).format("X");
  var frequency = $("#frequency")
    .val()
    .trim();

  // Creates local "temporary" object for holding input data
  var newTrain = {
    name: trainName,
    destination: destination,
    time: trainTime,
    frequency: frequency
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);

  // Alert
  alert("New Train successfully added");

  // Clears all of the text-boxes
  $("#name").val("");
  $("#destination").val("");
  $("#time").val("");
  $("#frequency").val("");
});

// Create Firebase event for adding New to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  console.log("SNAPSHOT: " + childSnapshot.val());

  // Store everything into a variable.
  var nTrain = childSnapshot.val().name;
  var tDestination = childSnapshot.val().destination;
  var tTime = childSnapshot.val().time;
  var tFrequency = childSnapshot.val().frequency;

  // Train Info
  console.log("NEWTRAIN: " + nTrain);
  console.log("DEST: " + tDestination);
  console.log("FREQ: " + tFrequency);
  console.log("TIME: " + tTime);

  $("#train-table > tbody").append(
    "<tr><td>" +
      nTrain +
      "</td><td>" +
      tDestination +
      "</td><td>" +
      tFrequency +
      "</td><td>" +
      moment(nextArrival).format("HH:mm") +
      "</td><td>" +
      tTime +
      "</td><td>" +
      "" +
      "</td></tr>"
  );
  // First Train Time
  var tTimeConverted = moment(tTime, "HH:mm").subtract(1, "years");
  console.log("CONVERTED TIME " + tTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME " + moment(currentTime).format("HH:MM"));

  // Difference between the times
  var timeDifference = moment().diff(moment(tTimeConverted), "minutes");
  console.log("TIME DIFFERENCE " + timeDifference);

  var timeApart = timeDifference % tFrequency;
  console.log("TIME APART " + timeApart);

  var minutesAway = tFrequency - timeApart;
  console.log("MINUTES AWAY " + minutesAway);

  var nextArrival = moment().add(minutesAway, "minutes");
  console.log("NEXT ARRIVAL " + moment(nextArrival).format("HH:mm"));

  // tArrival = moment().add(tMinutes, “m”).format(“hh:mm A”);
});
