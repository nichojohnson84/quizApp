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
        showScores();
    } else {
        //show question
        let questionElement = document.getElementById("question");
        questionElement.innerHTML = quiz.getQuestionIndex().text;

        //show options
        let choices = quiz.getQuestionIndex().choices;
        for (let i = 0; i < choices.length; i++) {
            let choiceElement = document.getElementById("choice" + i);
            choiceElement.innerHTML = choices[i];
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
            <h2 id="score">You Scored: ${quiz.score} of ${quiz.questions.length}</h2>
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
        "Inside which HTML element do we put the JavaScript?", ["<scripting>'", '<script>', '<js>', '<javascript>'], '<script>'
    ),
    new Question(
        "How do you create a function in JavaScript?", ["function myFunction[]", "function = myFunction()", "function:myFunction()", "function myFunction ()"], "funcion = myFunction()"
    ),
    new Question(
        "How do you write 'Hello World' in an alert box?", ["msg('Hello World');', 'msgBox('Hello World');', 'alert('Hello World');', 'alertBox('Hello World');"], 'alert("Hello World");'
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
displayQuestion();

//add a countdown
let time = 3;
let quizTimeInMinutes = time * 60 * 60;
quizTime = quizTimeInMinutes / 60

let counting = document.getElementById("countDown");

function startCountdown() {
    let quizTimer = setInterval(function() {
        if (quizTimer <=0) {
            clearInterval(quizTimer);
            showScores();
        } else {
            quizTime--;
            let sec = Math.floor(quizTime % 60);
            let min = Math.floor(quizTime / 60) % 60;
            counting.innerHTML = `TIME: ${min} : ${sec}`;
        }
    }, 1000);
}

startCountdown();