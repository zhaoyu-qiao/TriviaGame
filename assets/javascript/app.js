//when dom is loaded, do the below:
//reference the stopwatch js to call the event listener and functions at the top
window.onload = function () {
    $("#start").on("click", start);
    $("#next").on("click", next);
    $("#restart").on("click", restart);
};
$("#questions").hide();

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

let questions = [{
    question: "what is the color of sky?",
    answers: ["kjhjkh", "dsaf", "dgfdzg", "dsgdsg"],
    correctAns: "dsaf",
    wrongImage: "",
    correctImage: ""
}, {
    question: "what is the color of cat?",
    answers: ["kjhjkh", "dsaf", "dgfdzg", "dsgdsg"],
    correctAns: "dsaf",
    wrongImage: "",
    correctImage: ""
}, {
    question: "what is the color of banana?",
    answers: ["kjhjkh", "dsaf", "dgfdzg", "dsgdsg"],
    correctAns: "dsaf",
    wrongImage: "",
    correctImage: ""
}, {
    question: "what is the color of apple?",
    answers: ["kjhjkh", "dsaf", "dgfdzg", "dsgdsg"],
    correctAns: "dsaf",
    wrongImage: "",
    correctImage: ""
}];
let time = 10;
let clockRunning = false;

//for (i = 0; i < 20; i++) {
//    var radioBtn = $('<input type="radio" name="rbtnCount" />');
//    radioBtn.appendTo('#target');
function writeQuestions(current) {
    console.log("current in write Question function: " + questions[current].question);
    $("#question").append(questions[current].question);
    //writeOptions(current);
    console.log('current question: ' + questions[current].question);
}

function writeOptions(index) {
    console.log("write options function");
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
    let timer = setInterval(function () {
        if (!clockRunning && time > 0) {
            time--;
            console.log(time);
        }
        if (time === 0) {
            console.log("time up");
            timeup();
        }
    }, 1000);
    return;
}

function timeup() {
    clearInterval(timer);

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
        writeQuestions(currentQuestionIndex);
        writeOptions(questions[currentQuestionIndex]);
    }

    //writeOptions(answersArray.answer0);
}

//$(this)
// $(".radio-btn").on("click", function (event) { //use this if your browser cannot find radio btn by class.
$(document).on("click", ".radio-btn", function (event) {
    //clearInterval(timer);
    console.log("user answer : " + $(event.target).attr("value"));
    if ($(event.target).val() === questions[currentQuestionIndex].correctAns) {
        answeredCorrect()
    } else {
        answeredWrong();
    }
    next();
})

function answeredCorrect() {
    console.log("correct");
    //add images and correct answser
    clearInterval(timer);


    if (currentQuestionIndex === questions.length - 1) {
        setTimeout(results(), 3000);
    } else {
        setTimeout(next(), 3000)
    }
    correctAnswersCount++;
}

function answeredWrong() {
    console.log("wrong");
    clearInterval(timer);

    if (currentQuestionIndex === questions.length - 1) {
        setTimeout(results(), 3000);
    } else {
        setTimeout(next(), 3000)
    }
    incorrectAnswersCount++;
}

// if (time === 0) {
//     next();
// }

//user for loop for the next function? checkout the slideshow activity
//need to make sure when next is clicked, start no longer execute?????
//do i neeed to write everthing within the for loop?

function next() {
    time = 10;
    $("#start").hide();
    $("#restart").hide();
    $("#questions").show();
    timer(time);
    currentQuestionIndex++;
    writeQuestions(currentQuestionIndex);
    writeOptions(questions[currentQuestionIndex]);
}

//Show the question and its selections with checkboxes
//Show the button of "next"
//Question- can I use for loop