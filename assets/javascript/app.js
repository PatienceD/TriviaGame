$(document).ready(function () {
    var options = [
        {
            question: "What is the worlds longest river?",
            choice: ["Amazon River", "Nile River", "Congo River", "Arkansas River"],
            answer: 1,
            photo: href = "https://media0.giphy.com/media/2sfHz2w3N3CeNmWfDx/giphy.gif?cid=3640f6095c9a172e465776716739d29c",
        },

        {
            question: "Who founded the first public library in the U.S.?",
            choice: ["George Washington", "Thomas Jefferson", "Benjamin Franklin", "John Adams",],
            answer: 2,
            photo: href = "https://media2.giphy.com/media/4crseJ1N9JrZ6/giphy.gif?cid=3640f6095c9a1f0a72556447365af4de",
        },

        {
            question: "Which famous ocean liner sank on it's first voyage in 1912?",
            choice: ["Normandie", "Mauretania", "SS Imperator", "Titanic"],
            answer: 3,
            photo: href = "https://media0.giphy.com/media/uhB0n3Eac8ybe/giphy.gif?cid=3640f6095c9a5d057570645577e6c900",
        },

        {
            question: "What is a group of lions called?",
            choice: ["Pride", "Congregation", "Parliament", "Pat"],
            answer: 0,
            photo: href = "https://media3.giphy.com/media/mhDwIpbsgGKk/giphy.gif?cid=3640f6095c9a1d03432f2f4836f89d41",
        },

        {
            question: "How many points is the red circle on a dartboard bull's-eye worth?",
            choice: ["Twenty Five", "Fifty", "Three", "Nineteen"],
            answer: 1,
            photo: href = "https://media0.giphy.com/media/l44Qz9eXJNUATvzJm/giphy.gif?cid=3640f6095c9a1d376c49706c59bb5e84",
        },

        {
            question: "The tuxedo got it's name from what?",
            choice: ["A bakery in Boston", "An old 80's hairstyle", "A park in New York", "A funny looking raccoon"],
            answer: 2,
            photo: href = "https://media2.giphy.com/media/1SBaSUUAorKbIRWbab/giphy.gif?cid=3640f6095c9a1dc6342e394d4d428cf0",
        },

        {
            question: "The fear of being poisoned is known as what?",
            choice: ["Toxiphobia", "Hemophobia", "Alektorophobia", "Cryophobia"],
            answer: 0,
            photo: href = "https://media3.giphy.com/media/yz6A4igMWaPwA/giphy.gif?cid=3640f6095c9a1dfa436d327049ef3215",
        },

        {
            question: "What kind of milk is traditional feta cheese made of?",
            choice: ["Goat's Milk", "Yak's Milk", "Reindeer's Milk", "Sheep's Milk"],
            answer: 3,
            photo: href = "https://media2.giphy.com/media/OXHvH0XHKxtm0/giphy.gif?cid=3640f6095c9a1f7a4637383345615b02",
        }];

    var correctCount = 0;
    var wrongCount = 0;
    var unansweredCount = 0;
    var time = 21;
    var userGuess = "";
    var running = false;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    var intervalId;
    var qCount = options.length;

    $("#restart").hide();
    //click start button to begin game
    $("#start").on("click", function () {
        $("#start").hide();
        displayQuestion();
        runTime();
        for (var i = 0; i < options.length; i++) {
            holder.push(options[i]);
        }
    })
    //start the timer
    function runTime() {
        if (!running) {
            intervalId = setInterval(decrement, 1000);
            running = true;
            function decrement() {
                time--;
                $("#timeLeft").html("<h3>Time left: " + time + "</h3>");
                //stop the timer when it reaches 0
                if (time === 0) {
                    unansweredCount++;
                    stop();
                    clearInterval(intervalId);
                    $("#answers").html("<p>Time's up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
                    hidepicture();
                }
            }
        }
    }

    //stop the timer
    function stop() {
        running = false;
        clearInterval(intervalId);
    }

    //pick a question
    function displayQuestion() {
        //gives a random index
        index = Math.floor(Math.random() * options.length)
        pick = options[index];

        if (pick.show) {
            //gives a new index until one is chosen thats not in the game yet
            displayQuestion();
        } else {
            console.log(pick.question)
            $("#questions").html("<h2>" + pick.question + "</h2>")
        }

        for (var i = 0; i < pick.choice.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("answerchoice");
            userChoice.html(pick.choice[i]);
            //assign array position to it so can check answer
            userChoice.attr("data-guessvalue", i);
            $("#answers").append(userChoice);
        }

        $(".answerchoice").on("click", function () {
            //grab array position from userGuess
            userGuess = parseInt($(this).attr("data-guessvalue"));

            //correct guess or wrong guess outcomes
            if (userGuess === pick.answer) {
                stop();
                correctCount++;
                userGuess = "";
                $("#answers").html("<p>Correct!</p>");
                hidepicture();

            } else {
                stop();
                wrongCount++;
                userGuess = "";
                $("#answers").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
                hidepicture();
            }
            console.log(pick.answer);

        })
    }


    function hidepicture() {
        $("#answers").append("<img src= '" + pick.photo + " '>");
        newArray.push(pick);
        options.splice(index, 1);

        //displays picture after answer is picked
        var hidpic = setTimeout(function () {
            $("#answers").empty();
            time = 21;
            $("#timeLeft").html("<h3>Time left: " + time + "</h3>");

            //run the score screen if all questions answered
            if ((wrongCount + correctCount + unansweredCount) === qCount) {
                $("#questions").empty();
                $("#questions").html("<h3>Game Over!  Here's how you did: </h3>");
                $("#answers").append("<h4> Correct: " + correctCount + "</h4>");
                $("#answers").append("<h4> Incorrect: " + wrongCount + "</h4>");
                $("#answers").append("<h4> Unanswered: " + unansweredCount + "</h4>");
                $("#restart").show();
                correctCount = 0;
                wrongCount = 0;
                unansweredCount = 0;

            } else {
                runTime();
                displayQuestion();
            }

        }, 4000);
    }

    $("#restart").on("click", function () {
        $("#restart").hide();
        $("#answers").empty();
        $("#questions").empty();
        for (var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTime();
        displayQuestion();
    });

})










































// var number = 30;
// var intervalId;

// function run () {
//     clearInterval(intervalId)
//     intervalId = setInterval(decrement, 1000);
// }

// function decrement () {
//     number--;
//     $("#time-left").html(number);

//     if (number === 0 ){
//         stop();
//         console.log("time's up!");
//     }
// }

// function stop() {
//     clearInterval(intervalId);
// }

// run();