let initAlpha = null;
let initBeta = null;
let initGamma = null;

let selectedID = null;
let count = 0;

const angle = 30;

const classNames = [
    "top",
    "left",
    "right",
    "bottom"
]


//Start
window.addEventListener('deviceorientation', handleOrientation);
document.getElementById("display").addEventListener("touchend", onTouch)

const request = new XMLHttpRequest();
request.open("GET", "questions.json", false);
request.send(null)
let answer_question = JSON.parse(request.responseText);
let right_answer = null;

setQuestion(); //Init function

//Function
function onTouch() {
    if (selectedID != null) {
        const overlay = document.getElementById("feedback-overlay");
        if (selectedID === right_answer) {
            count += 1;
            overlay.style.background = "green";
            overlay.innerHTML = `<h3>Right!</h3>`

        } else {
            overlay.style.background = "red";
            overlay.innerHTML = `<h3>Falsch!<br><br>${answer_question[right_answer]['answers']}</h3>`

        }
        setTimeout(function () {
            overlay.style.background = "transparent";
            overlay.innerHTML = ``;
            setQuestion();
        }, 1000);
    }
}

function setQuestion() {
    const max = answer_question.length;
    const index = Math.floor(Math.random() * max);

    const object = answer_question[index];
    console.log(object)

    document.getElementById("question").innerText = object['question'];
    for (let i = 0; i < 4; i++) {
        document.getElementById(i.toString()).innerText = object['answers'][i];
    }
    right_answer = object['right']
    answer_question.splice(index, 1);
}


function resetOrientation() {
    initAlpha = initBeta = initGamma = null;
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
    hideAll();
    if (className === "") return;
    const htmlElements = document.getElementsByClassName(className);

    if (htmlElements.length !== 0) {
        htmlElements[0].className = "answer " + className + " selected";
        selectedID = classNames.indexOf(className);
    } else console.log(className);
}


function hideAll() {
    selectedID = null;

    for (let index in classNames) {

        let className = classNames[index];
        let htmlElements = document.getElementsByClassName(className);

        if (htmlElements.length !== 0) htmlElements[0].className = "answer " + className;
        else console.log(className);

    }
}

