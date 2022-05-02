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

var timeLeft = 60;
var qnum = 0;
var score = 0;

var questionTitle;
var btn1;
var btn2;
var btn3;
var btn4;
var btnHolder;

var card = document.getElementById("quiz-card");
var timeEl = document.getElementById("time-left");
timeEl.innerHTML = timeLeft;

function startQuiz(){
    card.innerHTML = "";

    questionTitle = document.createElement("h2")
    questionTitle.innerHTML = questionData[qnum].question;
    card.appendChild(questionTitle);

    btnHolder = document.createElement("div");

    btn1 = document.createElement("button");
    btn1.textContent = questionData[qnum].buttons[0];
    btn1.setAttribute("data-id", 0);
    btn1.setAttribute("class", "btn col-9");
    btnHolder.appendChild(btn1);

    btn2 = document.createElement("button");
    btn2.textContent = questionData[qnum].buttons[1];
    btn2.setAttribute("data-id", 1);
    btn2.setAttribute("class", "btn col-9");
    btnHolder.appendChild(btn2);

    btn3 = document.createElement("button");
    btn3.textContent = questionData[qnum].buttons[2];
    btn3.setAttribute("data-id", 2);
    btn3.setAttribute("class", "btn col-9");
    btnHolder.appendChild(btn3);

    btn4 = document.createElement("button");
    btn4.textContent = questionData[qnum].buttons[3];
    btn4.setAttribute("data-id", 3);
    btn4.setAttribute("class", "btn col-9");
    btnHolder.appendChild(btn4);

    card.appendChild(btnHolder);

    card.addEventListener("click", function(event){
        quizBtnHandler(event);
    });

    startTimer();
}

function nextQuestion(correct){
    console.log(qnum);
    if(correct == true){
        qnum++;
        console.log(qnum);
        for(var i = 0; i < 4; i++){
            var btn = document.querySelector("button[data-id='" + i + "']");
            btn.innerHTML = questionData[qnum].buttons[i];
    
            questionTitle.innerHTML = questionData[qnum].question;
        }
    } else if(correct == false){
        timeLeft = timeLeft - 10;
    }
}

function startTimer(){

    setInterval(function(){
        if(timeLeft > 0){
            timeLeft--;
            timeEl.innerHTML = timeLeft;
        }
    }, 1000);
}

function quizBtnHandler(event){
    var targetEl = event.target;
    console.log(targetEl.innerHTML);
    console.log(questionData[qnum].answer)

    //If target is a quiz answer button
    if(targetEl.hasAttribute("data-id")){
        if(targetEl.innerHTML == questionData[qnum].answer){
            console.log(true);
            nextQuestion(true);
        }
        else if(targetEl.type === "submit"){
            console.log(false);
            nextQuestion(false);
        }
    }
}

function startButtonListener(event){
    startQuiz();
}

document.getElementById("start-quiz-btn").addEventListener("click", startButtonListener);