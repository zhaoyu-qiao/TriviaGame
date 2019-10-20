//when dom is loaded, do the below:
//reference the stopwatch js to call the event listener and functions at the top
window.onload = function () {
    $("#start").on("click", start);
    $("#next").on("click", next);
    $("#restart").on("click", restart);
    $("#questions").hide();
    $("#results").hide();
    $("#next").hide();
    $("#restart").hide();
};
// $("#questions").hide();
// $("#results").hide();
// $("#next").hide();
// $("#restart").hide();



//Define variables
let currentQuestionIndex = 0;
let correctAnswersCount = 0;
let incorrectAnswersCount = 0;
let unAnseredCount = 0;
let time = 10;
let clockRunning = false;
let countDown;

//let questions be in an array of objects, each object contain its own question, options and answers.
let questions = [{
    question: 'Which English guitarist has the nickname "Slowhand"',
    answers: ["Eric Clapton", "Mark Knopfler", "Jeff Beck", "Jimmy Page"],
    correctAns: "Eric Clapton",
    correctImage: "./assets/images/eric.png",
    wrongImage: "./assets/images/nope.png",
}, {
    question: 'What is the best selling album of all time from 1976 to 2018?',
    answers: ["Back in Black", "Abbey Road", "The Dark Side of the Moon", "Thriller"],
    correctAns: "Thriller",
    correctImage: "./assets/images/thriller.png",
    wrongImage: "./assets/images/nope.png",
}, {
    question: 'Which brass instrument has the lowest pitch in an orchestra?',
    answers: ["Trumpet", "Trombone", "Tuba", "Saxophone"],
    correctAns: "Tuba",
    wrongImage: "./assets/images/nope.png",
    correctImage: "./assets/images/tuba.png"
}, {
    question: 'What is the stage name of English female rapper Mathangi Arulpragasam, who is known for the song "Paper Planes&quot"?',
    answers: ["K.I.A.", "M.I.A.", "C.I.A.", "A.I.A."],
    correctAns: "M.I.A.",
    wrongImage: "./assets/images/nope.png",
    correctImage: "./assets/images/mia.png"
}, {
    question: '"Doctor Jones", "Turn Back Time", and "Barbie Girl", were UK number ones for which Eurodance group?',
    correctAns: "Aqua",
    answers: ["Vengaboys", "Sash!", "Eiffel 65", "Aqua"],
    correctAns: "Aqua",
    wrongImage: "./assets/images/nope.png",
    correctImage: "./assets/images/aqua.png"
}, {
    question: 'Whose albums included "Back in Black" and "Ballbreaker"?',
    answers: ["Iron Maiden", "AC/DC", "Black Sabbath", "Metallica"],
    correctAns: "AC/DC",
    wrongImage: "./assets/images/nope.png",
    correctImage: "./assets/images/acdc"
}, {
    question: 'What was the subject of the 2014 song "CoCo" by American rapper O. T. Genasis?',
    answers: ["Conan Brien", "Cobalt(II) carbonate", "Cocaine", "Coconut cream pie"],
    correctAns: "Cocaine",
    wrongImage: "./assets/images/nope.png",
    correctImage: "./assets/images/cocaine.png"
}, {
    question: "Which Beatles album does NOT feature any of the band members on it's cover?",
    answers: ["The Beatles (White Album)", "Rubber Soul.", "Abbey Road", "Magical Mystery Tour"],
    correctAns: "The Beatles (White Album)",
    wrongImage: "./assets/images/nope.png",
    correctImage: "./assets/images/white.png"
}, {
    question: 'Sting, the lead vocalist of The Police, primarily plays what instrument?',
    answers: ["Drums", "Bass Guitar", "Guitar", "Keyboards"],
    correctAns: "Bass Guitar",
    wrongImage: "./assets/images/nope.png",
    correctImage: "./assets/images/bass.png"
}, {
    question: 'Which group performs the song "Crash into Me"?',
    answers: ["Destiny's Child", "Phish", "The Grateful Dead", "Dave Matthews Band"],
    correctAns: "Dave Matthews Band",
    wrongImage: "./assets/images/nope.png",
    correctImage: "./assets/images/dave.png"
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
            $("#time-left").html("Time left:  " + time)

        }
        if (time === 0) {
            clockRunning = false;
            //alert("time up")
            clearInterval(timer);
            // We are out of time, move to the next question
        }
    }, 1000);

    console.log('a timer:', countDown)
    //$("#time-left").html("Time left:  " + time)
    return;
}


function start() {
    // if (currentQuestionIndex > 0) {
    //     return;
    // } else {
    //hide the start and restart button, show the questions form
    $("#start").hide();
    $("#restart").hide();
    $("#questions").show();
    $("#results").hide();
    //Will only let user choose and then move on.
    //$("#next").show();

    //start timer
    timer(time);
    if (time === 0) {

        next();
    } else {
        //write content
        writeQuestions(currentQuestionIndex);
        writeOptions(questions[currentQuestionIndex]);
    }


    //}

    //writeOptions(answersArray.answer0);
}

// Do i need a for loop?
// $(".radio-btn").on("click", function (event) { //use this if your browser cannot find radio btn by class.
//can i use .val() here?
$(document).on("click", ".radio-btn", function (event) {
    //clearInterval(timer);
    console.log("user answer : " + $(event.target).attr("value"));
    console.log(questions[currentQuestionIndex].correctAns);
    //if ($(event.target).attr("value") === questions[currentQuestionIndex].correctAns) {
    //if ($(this).attr("value") === questions[currentQuestionIndex].correctAns) {
    if ($(event.target).attr("value") === questions[currentQuestionIndex].correctAns) {
        answeredCorrect()
        console.log("answer-chosen:correct");
    } else {
        answeredWrong("answer-chosen:wrong");

        //timer()
    }
    //currentQuestionIndex++;
    next();
})

function answeredCorrect() {
    console.log("correct");
    //add images and correct answser
    $("#answer").html("Correct!")
    //$("#img").empty();
    $("#img").attr("src", questions[currentQuestionIndex].correctImage);
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
    $("#answer-block").html("Nope!")
    //$("#img").empty();
    $("#img").attr("src", questions[currentQuestionIndex].wrongImage);
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


function next() {
    $("#next").show();
    currentQuestionIndex++;

    if (currentQuestionIndex === questions.length) {
        results();
        return;
    } else {
        time = 10;
        $("#start").hide();
        $("#restart").hide();
        $("#questions").show();
        timer(time);
        writeQuestions(currentQuestionIndex);
        writeOptions(questions[currentQuestionIndex]);
    }
}
//if time =0, clear interval and move to next question.


function results() {
    $("#questions").hide();
    $("#options").hide();
    $("#time-left").hide();
    $("#results").show();
    $("#correct").html("Correct Answers:" + correctAnswersCount);
    $("#incorrect").html("Wrong Answers:" + incorrectAnswersCount);


}
//Show the question and its selections with checkboxes
//Show the button of "next"
//Question- can I use for loop