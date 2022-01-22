var play = document.getElementById("play")

// Create a quiz class
class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }

    getQuestionIndex() {
        return this.questions[this.questionIndex];
    }

    guess(answer) {
        if(this.getQuestionIndex().isCorrectAnswer(answer)) {
            this.score++;
        } else {
            quizTime = quizTime -10
        }
        this.questionIndex++;
    }

    isEnded() {
        return this.questionIndex === this.questions.length;
    }
}

//create a question class
class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }

    isCorrectAnswer(choice) {
        return this.answer === choice;
    }
}

//Display Question
function displayQuestion() {
    if (quiz.isEnded()) {
        clearInterval(quizTimer)
        showScores();

    } else {
        //show question
        let questionElement = document.getElementById("question");
        questionElement.textContent = quiz.getQuestionIndex().text;

        //show options
        let choices = quiz.getQuestionIndex().choices;
        console.log(choices)
        for (let i = 0; i < choices.length; i++) {
            let choiceElement = document.getElementById("choice" + i);
            console.log(choices[i])
            choiceElement.textContent = choices[i];
            console.log(choiceElement)
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

//guess function
function guess(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        displayQuestion();
    }
}

//show quiz progress
function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let progressElement = document.getElementById("progress");
    progressElement.innerHTML = 
    `Question ${currentQuestionNumber} of ${quiz.questions.length}
    `;
}

//show score
function showScores() {
    let quizEndHTML =
        `
            <h1>Quiz Completed</h1>
            <h2 id="score">You Scored: ${quizTime}</h2>
            <div class="quiz-repeat">
                <a href="index.html">Take Quiz Again</a>
            </div>
        `;
        let quizElement = document.getElementById("quiz");
        quizElement.innerHTML = quizEndHTML;
}

// Create quiz questions
let questions = [
    new Question(
        "Inside which HTML element do we put the JavaScript?", ['<scripting>', '<script>', '<js>', '<javascript>'], '<script>'
    ),
    new Question(
        "How do you create a function in JavaScript?", ["function myFunction[]", "function = myFunction()", "function:myFunction()", "function myFunction ()"], "funcion = myFunction()"
    ),
    new Question(
        "How do you write 'Hello World' in an alert box?", ["msg('Hello World')", "msgBox('Hello World');", "alert('Hello World');", "alertBox('Hello World');"], "alert('Hello World');"
    ),
    new Question(
        "How do you call a function named 'myFunction'?", ["call function myFunction()", "call myFunction()", "myFunction()", "function.myFunction()"], "myFunction()"
    ),
    new Question(
        "How can you add a comment in a JavaScript?", ['<!--This is a comment-->', '"This is a comment"', "// This is a comment", "***This is a comment***"], "// This is a comment"
    )
];

let quiz = new Quiz(questions);

//display question
play.addEventListener (
    "click", function (){
    displayQuestion()
    startCountdown ()
});

//add a countdown
let time = 80;
let quizTime = time;
let counting = document.getElementById("countDown");
let quizTimer
function startCountdown() {
     quizTimer = setInterval(function() {
         
        
        if (quizTime <= 0) {
            clearInterval(quizTimer);
            showScores();
        } else {
            quizTime--;
            
            counting.textContent = `TIME: ${quizTime}`;
        }
    }, 1000);
}

