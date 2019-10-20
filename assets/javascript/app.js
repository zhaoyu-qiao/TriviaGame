//when dom is loaded, do the below:
//reference the stopwatch js to call the event listener and functions at the top
window.onload = function () {
    $("#start").on("click", start);
    $("#next").on("click", next);
    $("#restart").on("click", restart);
};
$("#questions").hide();
$("#results").hide();

/*let questionsArray = ["question1", "question2", "quetion3", "question4"];
let answersArray = [
  { answer0: ["option1", "option2", "option3", "option4"] },
  { answer1: ["option1", "option2", "option3", "option4"] },
  { answer2: ["option1", "option2", "option3", "option4"] },
  { answer3: ["option1", "option2", "option3", "option4"] }
];*/

let currentQuestionIndex = 0;
let correctAnswersCount = 0;
let incorrectAnswersCount = 0;
let unAnseredCount = 0;
let time = 10;
let clockRunning = false;
let countDown;


let questions = [{
    question: "what is the color of sky?",
    answers: ["kjhjkh", "blue", "dgfdzg", "dsgdsg"],
    correctAns: "blue",
    wrongImage: "",
    correctImage: ""
}, {
    question: "what is the color of cat?",
    answers: ["kjhjkh", "grey", "dgfdzg", "dsgdsg"],
    correctAns: "grey",
    wrongImage: "",
    correctImage: ""
}, {
    question: "what is the color of banana?",
    answers: ["kjhjkh", "yellow", "dgfdzg", "dsgdsg"],
    correctAns: "yellow",
    wrongImage: "",
    correctImage: ""
}, {
    question: "what is the color of apple?",
    answers: ["kjhjkh", "red", "dgfdzg", "dsgdsg"],
    correctAns: "red",
    wrongImage: "",
    correctImage: ""
}];


//for (i = 0; i < 20; i++) {
//    var radioBtn = $('<input type="radio" name="rbtnCount" />');
//    radioBtn.appendTo('#target');
function writeQuestions(current) {

    //console.log("current in write Question function: " + questions[current].question);
    // Empty 
    $("#question").empty()
    //writeOptions(current);
    //console.log('current question: ' + questions[current].question);
    $("#question").text(questions[current].question);
}

function writeOptions(index) {
    console.log("write options function");
    // Empty class options
    $(".options").empty();
    for (let i = 0; i < index.answers.length; i++) {
        console.log(index.answers[i]);
        let radioBtn = $(
            '<label>' + index.answers[i] + '</label><input type="radio" name="options" class="radio-btn" value="' +
            index.answers[i] +
            '"/><br/>'
        );
        console.log(radioBtn);
        $(".options").append(radioBtn);
    }
    //   '<input>' + " 'value"
    //   let radioBtn = $('<input type="radio" name="rbtnCount" />');
    //   radioBtn.appendTo("#questions");
}

function timer(time) {

    // if(timer) { clearInterval(timer)}
    clearInterval(countDown);

    //  timer = setInterval(function () {

    countDown = setInterval(function () {
        if (!clockRunning && time > 0) {
            time--;
            console.log(time);
        }
        if (time === 0) {
            clockRunning = false;
            //alert("time up")
            clearInterval(timer);
            // We are out of time, move to the next question
        }
    }, 1000);

    console.log('a timer:', countDown)
    return;
}


function start() {


    if (currentQuestionIndex > 0) {
        return;
    } else {
        //hide the start and restart button, show the questions form
        $("#start").hide();
        $("#restart").hide();
        $("#questions").show();

        //start timer
        timer(time);
        if (time === 0) {
            next();
        } else {
            writeQuestions(currentQuestionIndex);
            writeOptions(questions[currentQuestionIndex]);
        }
    }

    //writeOptions(answersArray.answer0);
}

// Do i need a for loop?
// $(".radio-btn").on("click", function (event) { //use this if your browser cannot find radio btn by class.
//can i use .val() here?
$(document).on("click", ".radio-btn", function (event) {
    //clearInterval(timer);
    console.log("user answer : " + $(event.target).attr("value"));
    //if ($(event.target).attr("value") === questions[currentQuestionIndex].correctAns) {
    //if ($(this).attr("value") === questions[currentQuestionIndex].correctAns) {
    if ($(this).val() === questions[currentQuestionIndex].correctAns) {
        answeredCorrect()
        console.log("answer-chosen:correct");
    } else {
        answeredWrong("answer-chosen:wrong");

        //timer()
    }
    next();
})

function answeredCorrect() {
    console.log("correct");
    //add images and correct answser
    clearInterval(countDown);


    if (currentQuestionIndex === questions.length - 1) {
        setTimeout(results(), 3000);
    } else {
        setTimeout(next(), 3000)
    }
    correctAnswersCount++;
    console.log("correct count: ", correctAnswersCount);
}

function answeredWrong() {
    console.log("wrong");
    clearInterval(countDown);

    if (currentQuestionIndex === questions.length - 1) {
        setTimeout(results(), 3000);
    } else {
        setTimeout(next(), 3000)
    }
    incorrectAnswersCount++;
    console.log("incorrect count: ", incorrectAnswersCount);
}

//function unAnsered

// if (time === 0) {
//     next();
// }

//user for loop for the next function? checkout the slideshow activity
//need to make sure when next is clicked, start no longer execute?????
//do i neeed to write everthing within the for loop?

function next() {
    if (currentQuestionIndex === questions.length - 1) {
        return;
    } else {
        time = 10;
        $("#start").hide();
        $("#restart").hide();
        $("#questions").show();
        timer(time);
        currentQuestionIndex++;
        writeQuestions(currentQuestionIndex);
        writeOptions(questions[currentQuestionIndex]);
    }
    //if time =0, clear interval and move to next question.
}

function results() {
    $("#questions").empty();
    $("#options").empty();
    $("#correct").html("Correct Answers:" + correctAnswersCount);
    $("#incorrect").html("Wrong Answers:" + incorrectAnswersCount);


}
//Show the question and its selections with checkboxes
//Show the button of "next"
//Question- can I use for loop