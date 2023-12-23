let initAlpha = null;
let initBeta = null;
let initGamma = null;

let selectedID = null;
let count = 0;

const angle = 30;

const elements = [
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
    console.log("Touch")
    if (selectedID === right_answer) {
        console.log("Right")
        count += 1;
    }
    if (selectedID != null) {
        setQuestion();
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

function highlightAnswer(elementClass) {
    hideAll();
    if (elementClass === "") return;
    const elements = document.getElementsByClassName(elementClass);
    if (elements.length <= 0) {
        console.log("cannot found element");
        return;
    }

    console.log(elements[0].className)
    elements[0].className = "answer " + elementClass + " selected";

    switch (elementClass) {
        case "top":
            selectedID = 0;
            break;
        case "left":
            selectedID = 1;
            break;
        case "right":
            selectedID = 2;
            break;
        case "bottom":
            selectedID = 3;
            break;
        default:
            selectedID = null;
            break;
    }
}


function hideAll() {
    selectedID = null;
    for (const element in elements) {
        document.getElementsByClassName(element)[0].className = "answer " + element;
    }
}

