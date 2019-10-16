//when dom is loaded, do the below:
//reference the stopwatch js to call the event listener and functions at the top
window.onload = function() {
  $("#start").on("click", start);
  $("#next").on("click", next);
  $("#restart").on("click", restart);
};
$("#questions").hide();

let questionsArray = ["question1", "question2", "quetion3", "question4"];
let answersArray = [
  { answer0: ["option1", "option2", "option3", "option4"] },
  { answer1: ["option1", "option2", "option3", "option4"] },
  { answer2: ["option1", "option2", "option3", "option4"] },
  { answer3: ["option1", "option2", "option3", "option4"] }
];
let time = 10;
let clockRunning = false;

//for (i = 0; i < 20; i++) {
//    var radioBtn = $('<input type="radio" name="rbtnCount" />');
//    radioBtn.appendTo('#target');
function writeQuestions(question) {
  $("#question").append(question);
}

function writeOptions(options) {
  let radioBtn = $('<input type="radio" name="rbtnCount" />');
  radioBtn.appendTo("#questions");
}
function timer(time) {
  setInterval(function() {
    if (!clockRunning && time > 0) {
      time--;
      console.log(time);
    }
  }, 1000);
  return;
}

function start() {
  //hide the start and restart button, show the questions form
  $("#start").hide();
  $("#restart").hide();
  $("#questions").show();

  //start timer
  timer(time);
  writeQuestions(questionsArray[0]);
  writeOptions(answersArray.answer0);
}

if (time === 0) {
  next();
}

//user for loop for the next function? checkout the slideshow activity
function next() {
  time = 10;
  $("#start").hide();
  $("#restart").hide();
  $("#questions").show();
  timer(time);
  writeQuestions(questionsArray[1]);
  writeOptions(answersArray.answer1);
}

//Show the question and its selections with checkboxes
//Show the button of "next"
//Question- can I use for loop
