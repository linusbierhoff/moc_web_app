// Get references to HTML elements
const centered_circle = document.getElementById("centered-circle")
const stopwatch_text = document.getElementById("stopwatch");

// Variables to store current state
let questions;
let current_question;
let correct_answers = 0;
let stopWatch = new Stopwatch();

// get category already set on start screen
let category = getState(CATEGORY) ?? 9;

// Show loading while loading questions
activateFullscreenOverlay(`<h3>Loading questions...</h3>`)

// Get 10 questions from the Open Trivia Database API based on the specified category
fetch(`https://opentdb.com/api.php?amount=10&type=multiple&category=${category}`).then((response) =>
    response.json().then((result) => {
        questions = result['results'].map((e) => new Question(e['question'], e['incorrect_answers'], e['correct_answer']));
        // Set initial question
        setQuestion();
        // deactivate loading
        deactivateFullscreenOverlay();

        // start game
        stopWatch.start((seconds) => {
            stopwatch_text.innerText = seconds + " seconds";
        })
    })
)

// Function to set the current question and update the UI (executed if questions already loaded)
function setQuestion() {
    const length = questions.length;

    // If no more questions, stop the game and navigate to the result page
    if (length === 0) {
        stopWatch.stop();
        saveState(SECONDS, stopWatch.seconds);
        saveState(CORRECT_ANSWERS, correct_answers);
        window.location.href = "result.html";
        return;
    }

    // Randomly select a question from the remaining ones
    const index = Math.floor(Math.random() * length);
    current_question = questions[index];

    // Update the question text and answer options in the UI
    document.getElementById("question").innerText = decodeHtmlEntities(current_question.question);
    for (let i = 0; i < 4; i++) {
        document.getElementById(i.toString()).innerText = decodeHtmlEntities(current_question.answers[i]);
    }
    // Remove the selected question from the list of questions
    questions.splice(index, 1);
}

// Function to check the selected answer and provide feedback
function checkAnswer() {
    if (highlighted === null) return;
    const selectedID = classNames.indexOf(highlighted);
    const right_answer = current_question.correct_answer;

    if (selectedID === right_answer) {
        correct_answers += 1;
        activateFullscreenOverlay(`<h3>Right!</h3>`)
        overlay.style.background = "green";
    } else {
        activateFullscreenOverlay(`<h3>Falsch!<br><br>${current_question['answers'][right_answer]}</h3>`)
        overlay.style.background = "red";
    }

    // After a brief delay, reset the overlay, set a new question, and hide answer options
    setTimeout(function () {
        deactivateFullscreenOverlay();
        setQuestion();
        hideAllAnswers();
    }, 1000);
}

// Function to highlight the selected answer and trigger answer checking after a delay
function highlightAnswer(className) {
    if (highlighted !== className) {
        hideAllAnswers();
        clearTimeout(timeoutId);
        if (className === "") return;
        const htmlElements = document.getElementsByClassName(className);
        if (htmlElements.length !== 0) {
            htmlElements[0].className = "answer " + className + " selected";
            highlighted = className;
            // Set a timeout to check the answer after a delay (necessary to prevent accidental inputs)
            timeoutId = setTimeout(() => {
                checkAnswer();
            }, 1500)
        } else console.log(className);
    }
}

// Function to reset the styles of all answer options
function hideAllAnswers() {
    highlighted = null;
    for (let index in classNames) {

        let className = classNames[index];
        let htmlElements = document.getElementsByClassName(className);

        if (htmlElements.length !== 0) htmlElements[0].className = "answer " + className;
        else console.log(className);

    }
}

// Function to activate a fullscreen overlay with specified content
function activateFullscreenOverlay(innerHTML) {
    const overlay = document.createElement("div");
    overlay.id = "overlay";
    overlay.className = "fullscreen-overlay";
    overlay.style.background = `linear-gradient(rgba(0, 232, 255, 1), rgba(0, 255, 152, 1))`;
    overlay.innerHTML = innerHTML;
    document.getElementsByTagName("body")[0].appendChild(overlay);
}

// Function to deactivate the fullscreen overlay
function deactivateFullscreenOverlay() {
    const overlay = document.getElementById("overlay");
    overlay.remove();
}

// Function to decode HTML entities in a text (API provides text with HTML characters like $quot;)
function decodeHtmlEntities(text) {
    let doc = new DOMParser().parseFromString(text, "text/html");
    return doc.documentElement.textContent;
}

