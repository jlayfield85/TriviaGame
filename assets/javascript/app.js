let questionslist = {};
let trivia = {};

let questions;
let answers = ["B", "A", "C", "A", "B"];

let intervalID;

// Timer
timer = {

    time: 90,

    start: function () {
        $("#timer-display").text("01:30");
        intervalID = setInterval(timer.countdown, 1000);
    },

    countdown: function () {
        timer.time--;
        let currentTime = timer.timeConverter(timer.time);
        $("#timer-display").text(currentTime);

        if (timer.time === 0) {
            $("#timer-display").text("Time's Up!");
            clearInterval(intervalID);
            $(".done, .question-block").hide();
            score();
            $(".results, .reset").show();
        } else {

        }
    },

    reset: function () {
        timer.time = 90;
        $("#timer-display").text("01:30");
        clearInterval(intervalID);
    },

    timeConverter: function (t) {
        let minutes = Math.floor(t / 60);
        let seconds = t - (minutes * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes === 0) {
            minutes = "00";
        }

        else if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
    },

};

// Questions

function startTrivia() {
    questionslist = resetQuestions();
    trivia = resetTrivia();

    showQuestions();

}

function resetTrivia() {
    return {
        correct: 0,
        incorrect: 0,
        blank: 0,
    }
}

function resetQuestions() {
    return {
        q0: {
            question: "When did Arthur Blank, owner of Atlanta United FC, announce the founding of Atlanta United?",
            A: "June 2013",
            B: "April 2014",
            C: "September 2015",
            D: "February 2004",
        },
        q1: {
            question: "Who did Atlanta United play in their first regular season game?",
            A: "New York Red Bulls",
            B: "New York City FC",
            C: "San Jose Earthquakes",
            D: "Sporting Kansas City",
        },
        q2: {
            question: "Which stadium hosted Atlanta United until the construction of the Mercedes-Benz Stadium was complete?",
            A: "Ted Turner Stadium",
            B: "Fifth-Third Stadium",
            C: "Bobby Dodd Stadium",
            D: "Sanford Stadium",
        },
        q3: {
            question: "Who won the Golden Boot Award in 2018?",
            A: "Josef Martinez",
            B: "Hector Tito Villalba",
            C: "Miguel Almiron",
            D: "Brad Guzan",
        },
        q4: {
            question: "Who did Atlanta United defeat to win the 2018 MLS Cup?",
            A: "Vancouver Whitecaps",
            B: "Portland Timbers",
            C: "FC Dallas",
            D: "Columbus Crew",
        },
        }
    }

function showQuestions() {
    questions = Object.keys(questionslist);
    for (var i = 0; i < questions.length; i++) {
        var questiontitle = questions[i];
        var question = questionslist[questiontitle];
        var questionblocks = createQuestions(question, questiontitle);
        $(".question-block").append(questionblocks).show();
    }
}

function createQuestions(question, key) {
    var block = $("<div class='question' name='" + key + "'>" + question.question + "" +
        "<ul>" +
        "<li><input type='radio' name='" + key + "' value='A'><label>" + question.A + "</label></li>" +
        "<li><input type='radio' name='" + key + "' value='B'><label>" + question.B + "</label></li>" +
        "<li><input type='radio' name='" + key + "' value='C'><label>" + question.C + "</label></li>" +
        "<li><input type='radio' name='" + key + "' value='D'><label>" + question.D + "</label></li>" +
        "</ul>");

    return block;
}

function score() {
    let playeranswers = [$("input:radio[name='q0']:checked").val(),
        $("input:radio[name='q0']:checked").val(),
        $("input:radio[name='q1']:checked").val(),
        $("input:radio[name='q2']:checked").val(),
        $("input:radio[name='q3']:checked").val(),
        $("input:radio[name='q4']:checked").val(),];

    console.log(playeranswers);
    console.log(answers);

    for (k = 0; k < questions.length; k++) {
        if (playeranswers[k] === undefined) {
            trivia.blank++;
        } else if (playeranswers[k] === answers[k]) {
            trivia.correct++;
        } else {
            trivia.incorrect++;
        }

    }

    $("#correct").text("Correct: " + trivia.correct);
    $("#incorrect").text("Incorrect: " + trivia.incorrect);
    $("#unanswered").text("Unanswered: " + trivia.blank);

    console.log(trivia.correct);
    console.log(trivia.incorrect);
    console.log(trivia.blank);
}

// Question Time 

$(document).ready(function () {

    $(".start").on("click", function () {
        $(".start").hide();
        startTrivia();
        timer.start();
        $(".done").show();

    });

    $(".done").on("click", function () {
        score();
        $(".done, .question-block").hide();
        timer.reset();
        $(".results, .reset").show();
    });

    $(".reset").on("click", function () {
        $(".question-block").empty();
        $(".start").show();
        $(".reset, .results").hide();
        timer.reset();
    });
});