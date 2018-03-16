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
