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

// 2. Button for adding Trains
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
    "DD/MM/YY"
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
});
