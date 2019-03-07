// QUESTIONS----------------------
var questions = [{
    question: "How did Daenerys Targaryen eventually hatch her eggs?",
    answerList: ["In a lighting storm", "In a funeral pyre", "In a fireplace", "In a frozen cave"],
    answer: 1
},{
    question: "Valar Morghulis translates to:",
    answerList: ["All men must live", "Death waits for no man", "All men must serve", "All men must die"],
    answer: 3
},{
    question: "Besides obsidian, what is the only other substance capable of defeating the White Walkers?",
    answerList: ["Weirwood", "Wildfire", "Valyrian Steel", "Ice"],
    answer: 2
}, {
    question: "Actor Jacob Anderson, who plays Grey Worm, is not only a famous actor but also a:",
    answerList: ["Singer and songwriter", "Artist", "Athlete", "Writer"],
    answer: 0
},{
    question: "Which of the Stark family direwolves was killed in retaliation for an attack on Prince Joffrey?",
    answerList: ["Ghost", "Lady", "Nymeria", "Summer"],
    answer: 1
},{ 
    question: "Arya's punishment for stealing from the Many-Faced God is:",
    answerList: ["Death", "Memory Loss", "Blindness", "Paralysis"],
    answer: 2
},{
    question: "The name of Tommens cat is:",
    answerList: ["Little Lion", "Ser Pounce", "Prince Fuzz", "Shaggy Cat"],
    answer: 1
},{
    question: "What is the name of Ned Stark's greatsword?",
    answerList: ["Ice", "Oathkeeper", "Widow's Wail", "Northguard"],
    answer: 0
},{
    question: "Dead creatures ressurected by White Walkers are known as:",
    answerList: ["Walkers", "Wights", "Zombies", "Claws"],
    answer: 1
},{
    question: "Who is known as the King Beyond The Wall",
    answerList: ["The Night King", "Stannis Baratheon", "Tormund Giantsbane", "Mance Rayder"],
    answer: 3
}]


//VARIABLES ------------
var gifs = ["question1","question2","question3","question4","question5","question6","question7","question8","question9","question10"]
var currentquestion;
var correct;
var wrong;
var unanswered;
var seconds;
var time;
var answered;
var userSelection
var messages = {
    correct: "Yes! That's right!",
    incorrect: "That's not right! You know nothin' Jon Snow",
    endTime: "Sorry, Out of time!",
    finished: "Alright, let's see how you managed."
}


// START BUTON
$("#startBtn").on("click", function(){
	$(this).hide();
	newGame();
});
//START OVER BUTTON ---- Not working??????
$("#startOverBtn").on("click", function(){
    $(this).hide();
    newGame();
});

//FUNCTION FOR WHEN A NEW GAME STARTS
function newGame(){
    $("#correctAnswer").empty();
    $("#wrongAnswer").empty();
    $("#unanswered").empty();
    correct = 0;
    wrong = 0;
    unanswered = 0;
    currentquestion = 0;
    nextQuestion();
}


// STARTS RUNNING THE QUESTIONS
function nextQuestion() {
    $("#message").empty();
    $("#correctedAnswer").empty();
    $("#gif").empty();
    answered = true;

// WRITES QUESTIONS TO PAGE 
    $("#currentQuestion").html("Question #" +(currentquestion+1)+"/"+questions.length);
    $(".question").html("<h3>" + questions[currentquestion].question + "</h3>");
    for(var i = 0; i <4; i++){
        var choices = $("<div>");
        choices.text(questions[currentquestion].answerList[i]);
        choices.attr({"data-index":i});
        choices.addClass("thisChoice");
        $(".answerList").append(choices);
    }
//RUNS COUNTDOWN
    countdown();
    $(".thisChoice").on("click", function(){
        userSelection = $(this).data("index");
        clearInterval(time)
        answerpage();
    });
}


// COUNTDOWN TIMER
function countdown() {
    seconds = 15;
    $("#timeLeft").html("<h3>Time Remaining: " + seconds + "</h3>");
        answered = true;  
        time = setInterval(showcountdown, 1000)

    }

//TIME GOES DOWN AND UPDATES TIME REMAINING TEXT
function showcountdown(){
    seconds--;
    $("#timeLeft").html("<h3>Time Remaining: " + seconds + "<h3>");
    if(seconds < 1){
        clearInterval(time);
        answered = false;
        answerpage();
    }
}

//ANSWER PAGE
function answerpage(){
    $("#currentQuestion").empty();
    $(".thisChoice").empty();
    $(".question").empty();

    var rightAnswertext = questions[currentquestion].answerList[questions[currentquestion].answer];
    var rightAnswerindex = questions[currentquestion].answer;
    $("#gif").html('<img src = "assets/images/'+ gifs[currentquestion] + '.gif" width = "400px">');

//CORRECT
    if((userSelection == rightAnswerindex) && (answered == true)){
        correct++;
        $("#timeLeft").html("<h3></h3>")
        $("#message").html(messages.correct);
    } 
// INCORRECT
    else if((userSelection != rightAnswerindex) && (answered == true)){
        wrong++;
        $("#timeLeft").html("<h3></h3>");
        $("#message").html(messages.incorrect);
        $("#correctedAnswer").html("The correct answer was: " + rightAnswertext)
    } 
//TIME RAN OUT    
    else {
        unanswered++
        $("#timeLeft").html("<h3></h3>")
        $("#message").html(messages.endTime);
        $("#correctedAnswer").html("The correct answer was: " + rightAnswertext)
        answered = true;
    }

//runs next question if there are any left
    if(currentquestion == (questions.length-1)){
        setTimeout(scoreboard, 5000)
    } else{
        currentquestion++;
        setTimeout(nextQuestion, 5000);
    }
}


// LAST PAGE SCOREBOARD
function scoreboard(){
    $("#timeLeft").empty();
    $("#message").empty();
    $("#correctedAnswer").empty();
    $("#gif").empty();

    $("#finalMessage").html(messages.finished);
    $("#correctAnswers").html("Correct Answers: " + correct);
    $("#incorrectAnswers").html("Incorrect Answers: " + wrong);
    $("#unanswered").html("Unanswered: " + unanswered);
    $("#startOverBtn").addClass("reset");
    $("#startOverBtn").show();
    $("#startOverBtn").html("Start Over?");
}
