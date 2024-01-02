const overlay = document.getElementById("overlay");
const centered_circle = document.getElementById("centered-circle")
const stopwatch_text = document.getElementById("stopwatch");


let current_question = null;
let questions;
let correct_answers;
let stopWatch = new Stopwatch();
let category = getState(CATEGORY);


activateFullscreenOverlay(`<h3>Loading questions...</h3>`)
console.log(`https://opentdb.com/api.php?amount=10&type=multiple&category=${category}`);
fetch(`https://opentdb.com/api.php?amount=10&type=multiple&category=${category}`).then((response) =>
    response.json().then((result) => {
        questions = result['results'].map((e) => new Question(e['question'], e['incorrect_answers'], e['correct_answer']));
        setQuestion();
        deactivateFullscreenOverlay();

        stopWatch.start((seconds) => {
            stopwatch_text.innerText = seconds + " seconds";
        })
    })
)

function decodeHtmlEntities(text) {
    let doc = new DOMParser().parseFromString(text, "text/html");
    return doc.documentElement.textContent;
}


function setQuestion() {
    const length = questions.length;

    if (length === 0) {
        done = true;
        stopWatch.stop();
        saveState(SECONDS, stopWatch.seconds);
        saveState(CORRECT_ANSWERS, correct_answers);
        window.location.href = "result.html";
        return;
    }

    const index = Math.floor(Math.random() * length);
    current_question = questions[index];

    document.getElementById("question").innerText = decodeHtmlEntities(current_question.question);
    for (let i = 0; i < 4; i++) {
        document.getElementById(i.toString()).innerText = decodeHtmlEntities(current_question.answers[i]);
    }
    questions.splice(index, 1);
}

function checkAnswer() {
    if (done || highlighted === null) return;
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

    setTimeout(function () {
        deactivateFullscreenOverlay();
        setQuestion();
        hideAllAnswers();
    }, 1000);
}


function highlightAnswer(className) {
    if (highlighted !== className && !done) {
        hideAllAnswers();
        clearTimeout(timeoutId);
        if (className === "") return;
        const htmlElements = document.getElementsByClassName(className);
        if (htmlElements.length !== 0) {
            htmlElements[0].className = "answer " + className + " selected";
            highlighted = className;
            timeoutId = setTimeout(() => {
                checkAnswer();
            }, 1500)
        } else console.log(className);
    }
}

function hideAllAnswers() {
    highlighted = null;
    for (let index in classNames) {

        let className = classNames[index];
        let htmlElements = document.getElementsByClassName(className);

        if (htmlElements.length !== 0) htmlElements[0].className = "answer " + className;
        else console.log(className);

    }
}


function activateFullscreenOverlay(innerHTML) {
    overlay.className = "fullscreen-overlay"
    overlay.style.background = `linear-gradient(rgba(0, 232, 255, 1), rgba(0, 255, 152, 1))`;
    overlay.innerHTML = innerHTML
}

function deactivateFullscreenOverlay() {
    overlay.className = null;
    overlay.style.color = `transparent`;
    overlay.innerHTML = ``;
}
