var questionData = [{
    question: "How do you write 'Hello World' in an alert box?",
    buttons: ["msgBox('Hello World');","msg('Hello World');","alertBox('Hello World');","alert('Hello World');"],
    answer: "alert('Hello World');"
},{
    question: "How do you create a function in JavaScript?",
    buttons: ["function = myFunction()","function myFunction()","function:myFunction()","var function() = function"],
    answer: "function myFunction()"
},{
    question: "How do you write an IF statement in JavaScript?",
    buttons: ["if i = 5","if(i == 5)","if i == 5 then","if i = 5 then"],
    answer: "if(i == 5)" 
},{
    question: "How does a FOR loop start?",
    buttons: ["for (i = 0; i <= 5; i++)","for (i = 0; i <= 5)","for i = 1 to 5","for (i <= 5; i++)"],
    answer: "for (i = 0; i &lt;= 5; i++)"
},{
    question: "Which event occurs when the user clicks on an HTML element?",
    buttons: ["onmouseover","onmouseclick","onchange","onclick"],
    answer: "onclick"
}];

var highscores = [];

var timeLeft = 45;
var timerStarted = false;

var interval;

var qnum = 0;
var score = 0;

var questionTitle;
var btn = [];
var btnDiv = [];
var btnHolder;

var ansValidateDiv;

var card = document.getElementById("quiz-card");
var timeEl = document.getElementById("time-left");
timeEl.innerHTML = timeLeft;

function startQuiz(){
    card.innerHTML = "";

    questionTitle = document.createElement("h2")
    questionTitle.setAttribute("class", "col-6");
    questionTitle.innerHTML = questionData[qnum].question;
    card.appendChild(questionTitle);

    btnHolder = document.createElement("div");
    
    //create button elements
    for(var i = 0; i < 4; i++){
        var newBtn = document.createElement("button")
        var newBtnDiv = document.createElement("div");
        btn.push(newBtn);
        btnDiv.push(newBtnDiv);
        btn[i].textContent = questionData[qnum].buttons[i];
        btn[i].setAttribute("data-id", i);
        btn[i].setAttribute("class", "btn col-3");
        btnHolder.appendChild(btnDiv[i]);
        btnDiv[i].appendChild(btn[i]);
    }

    card.appendChild(btnHolder);

    card.addEventListener("click", function(event){
        quizBtnHandler(event);
    });

    startTimer();
}

function gameOver(condition){
    card.innerHTML = "";

    if(timeLeft < 0){
        timeLeft = 0;
        timeEl.innerHTML = timeLeft;
    }

    var gameOverTitle = document.createElement("h2");
    if(condition == "time"){
        gameOverTitle.innerHTML = "Game Over, you ran out of time!";
    }else {
        gameOverTitle.innerHTML = "Game Over, you answered all questions!";
    }
    gameOverTitle.setAttribute("class", "col-6");
    card.appendChild(gameOverTitle);

    var totalScore = (score * 10) + timeLeft;

    var gameOverP = document.createElement("p");
    gameOverP.innerHTML = "You scored " + score + " out of "
                        + questionData.length 
                        + " correctly, so we multiply that by 10 and add your remaining time for a total score of "
                         + totalScore;
    card.appendChild(gameOverP);

    var scoreP = document.createElement("p");
    scoreP.innerHTML = "Enter your initials for a high score below!";
    card.appendChild(scoreP);

    var scoreInput = document.createElement("input");
    scoreInput.setAttribute("type", "text");
    scoreInput.setAttribute("id", "highScoreInput");
    card.appendChild(scoreInput);

    var saveScore = document.createElement("button");
    saveScore.innerHTML = "Save your highscore!";
    saveScore.setAttribute("class", "btn");
    saveScore.setAttribute("onclick", "saveScoreHandler(event)");
    card.appendChild(saveScore);

    var tryAgainDiv = document.createElement("div");
    tryAgainDiv.setAttribute("class", "row justify-content-center");

    var tryAgainBtn = document.createElement("button");
    tryAgainBtn.innerHTML = "Try Again!";
    tryAgainBtn.addEventListener("click", function(){
        location.reload();
    })
    tryAgainBtn.setAttribute("class", "btn");
    tryAgainDiv.appendChild(tryAgainBtn);
    card.appendChild(tryAgainDiv);
    card.appendChild(ansValidateDiv);
}

function viewHighScores(){
    timerStarted = false;
    if(!document.getElementById("high-score-title")){
        card.innerHTML = "<h2 id='high-score-title'>High-Scores:</h2>";

        getHighScores();

        highscores.sort((a,b)=>{
            if(a.hScore > b.hScore){
                return -1;
            } else {
                return 1;
            }
        });

        for(var i = 0; i < highscores.length; i++){
            var scoreDiv = document.createElement("div");
            scoreDiv.setAttribute("class", "row justify-content-center");
            var p = document.createElement("p");
            p.innerHTML = highscores[i].initial + " | " + highscores[i].hScore;
            p.setAttribute("class", "highscore-text col-3");
            card.appendChild(scoreDiv);
            scoreDiv.appendChild(p);
        }

        var goBackDiv = document.createElement("div");
        goBackDiv.setAttribute("class", "row justify-content-center");

        var goBackBtn = document.createElement("button");
        goBackBtn.innerHTML = "Go back to start";
        goBackBtn.addEventListener("click", function(){
            location.reload();
        });
        goBackBtn.setAttribute("class", "btn");
        goBackDiv.appendChild(goBackBtn);
        card.appendChild(goBackDiv);
    }
}

function nextQuestion(correct){
    // See if the answer validation element has been created, create it if it has not
    if(!ansValidateDiv){
        ansValidateDiv = document.createElement("div");
        ansValidateDiv.setAttribute("id", "ans-validate-div");
        ansValidateDiv.setAttribute("class", "col-6 justify-self-center");
        card.appendChild(ansValidateDiv);
    }
    
    if(correct == true){
        ansValidateDiv.innerHTML = "Correct!";

        qnum++;

        //End game if no more questions
        if(!questionData[qnum]){
            gameOver();
            clearInterval(interval);
            return;
        }

        for(var i = 0; i < 4; i++){
            var btn = document.querySelector("button[data-id='" + i + "']");
            btn.innerHTML = questionData[qnum].buttons[i];
    
            questionTitle.innerHTML = questionData[qnum].question;
        }
    } else if(correct == false){
        ansValidateDiv.innerHTML = "Incorrect! The correct answer was: " + questionData[qnum].answer;
        timeLeft = timeLeft - 10;

        qnum++;
        
        //End game if no more questions
        if(!questionData[qnum]){
            gameOver();
            clearInterval(interval);
            return;
        }
        for(var i = 0; i < 4; i++){
            var btn = document.querySelector("button[data-id='" + i + "']");
            btn.innerHTML = questionData[qnum].buttons[i];
    
            questionTitle.innerHTML = questionData[qnum].question;
        }
    }
}

function startTimer(){
    timerStarted = true;
    interval = setInterval(function(){
        if(timerStarted == true){
            timeLeft--;
            if(timeLeft > 0){
                timeEl.innerHTML = timeLeft;
            }else{
                timeEl.innerHTML = timeLeft;
                clearInterval(interval);
                gameOver("time");
            }
        }
    }, 1000);
}

function quizBtnHandler(event){
    var targetEl = event.target;

    //If target is a quiz answer button
    if(targetEl.hasAttribute("data-id")){

        //Validate if the input == the answer
        if(targetEl.innerHTML == questionData[qnum].answer){
            score++;
            nextQuestion(true);
        }
        else if(targetEl.type === "submit"){
            nextQuestion(false);
        }
    }
}

function saveScoreHandler(event){
    var input = document.getElementById("highScoreInput");
    if(input.value.length != 2){
        if(event.target.innerHTML != "Save your highscore! Please Enter a two letter initial"){
            event.target.innerHTML += " Please Enter a two letter initial";
        }
        return;
    }

    var inputVal = input.value;

    var highscore = {
        initial: inputVal,
        hScore: (score * 10) + timeLeft        
    }

    getHighScores();

    highscores.push(highscore);
    
    localStorage.setItem("highscoreStorage", JSON.stringify(highscores));
    
    event.target.innerHTML = "Score Saved!";
    event.target.setAttribute("onclick", "");

    card.removeChild(document.getElementById("highScoreInput"));
}

function getHighScores(){
    //Check if the highscores have already been retrieved
    if(!highscores[0]){
        var savedScores = localStorage.getItem("highscoreStorage");

        //If no savedScores data, exit
        if(!savedScores){
            return false;
        }

        savedScores = JSON.parse(savedScores);
        
        for(var i = 0; i < savedScores.length; i++){
            highscores.push(savedScores[i]);
        }
    }
}

function startButtonListener(event){
    startQuiz();
}

document.getElementById("start-quiz-btn").addEventListener("click", startButtonListener);