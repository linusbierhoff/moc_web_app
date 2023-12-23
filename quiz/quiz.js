const angle = 30;
const classNames = [
    "top",
    "left",
    "right",
    "bottom"
]


let initAlpha = null;
let initBeta = null;
let initGamma = null;
let current_question = null;
let done = false;
let count = 0;
let highlighted = null;
let timeoutId;

//Start
window.addEventListener('deviceorientation', handleOrientation);
document.getElementById('reset-button').addEventListener('click', resetOrientation)

const request = new XMLHttpRequest();
request.open("GET", "questions.json", false);
request.send(null)
const questions = JSON.parse(request.responseText);


setQuestion(); //Init first question

//Function
function setQuestion() {
    const max = questions.length;

    if (max === 0) {
        document.getElementById("feedback-overlay").style.background = `linear-gradient(rgba(0, 232, 255, 1), rgba(0, 255, 152, 1))`;
        document.getElementById("feedback-overlay").innerHTML = `<h3>${count} correct answers!</h3>`
        done = true;
        return;
    }

    const index = Math.floor(Math.random() * max);
    current_question = questions[index];

    document.getElementById("question").innerText = current_question['question'];
    for (let i = 0; i < 4; i++) {
        document.getElementById(i.toString()).innerText = current_question['answers'][i];
    }
    questions.splice(index, 1);
}


function resetOrientation() {
    initAlpha = initBeta = initGamma = null;
    hideAll();
    highlighted = null;
}


function handleOrientation(event) {
    let alpha = event.alpha;
    let beta = event.beta;
    let gamma = event.gamma;

    initAlpha ??= alpha;
    initBeta ??= beta;
    initGamma ??= gamma;

    alpha = alpha - initAlpha
    beta = beta - initBeta
    gamma = gamma - initGamma

    updatePhoneSide(alpha, beta, gamma)
}

function updatePhoneSide(alpha, beta, gamma) {
    const absBeta = Math.abs(beta);
    const absGamma = Math.abs(gamma);

    if (absBeta > absGamma && absBeta > angle) {
        if (beta < -angle) highlightAnswer("top");
        if (beta > angle) highlightAnswer("bottom");

    } else if (absGamma > absBeta && absGamma > angle) {
        if (gamma < -angle) highlightAnswer("left");
        if (gamma > angle) highlightAnswer("right");

    } else {
        highlightAnswer("")
    }
}

function highlightAnswer(className) {
    if (highlighted !== className && !done) {
        hideAll();
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


function checkAnswer() {
    if (done || highlighted === null) return;
    const selectedID = classNames.indexOf(highlighted);
    const right_answer = current_question['right'];
    const overlay = document.getElementById("feedback-overlay");

    if (selectedID === right_answer) {
        count += 1;
        overlay.style.background = "green";
        overlay.innerHTML = `<h3>Right!</h3>`

    } else {
        overlay.style.background = "red";
        overlay.innerHTML = `<h3>Falsch!<br><br>${current_question['answers'][right_answer]}</h3>`

    }
    setTimeout(function () {
        overlay.style.background = "transparent";
        overlay.innerHTML = ``;
        setQuestion();
        hideAll();
        highlighted = null;
    }, 1000);
}


function hideAll() {
    for (let index in classNames) {

        let className = classNames[index];
        let htmlElements = document.getElementsByClassName(className);

        if (htmlElements.length !== 0) htmlElements[0].className = "answer " + className;
        else console.log(className);

    }
}

