let initAlpha = null;
let initBeta = null;
let initGamma = null;

const angle = 30;

window.addEventListener('deviceorientation', handleOrientation)

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
    const debug = document.getElementById(`debug`)
    const absBeta = Math.abs(beta);
    const absGamma = Math.abs(gamma);

    if (absBeta > absGamma && absBeta > angle) {
        if (beta < -angle) {
            debug.innerText = "top";
            highlightAnswer("top");
        }
        if (beta > angle) {
            debug.innerText = "bottom";
            highlightAnswer("bottom");
        }
        return;
    }
    if (absGamma > absBeta && absGamma > angle) {
        if (gamma < -angle) {
            debug.innerText = "left";

            highlightAnswer("left");
        }
        if (gamma > angle) {
            debug.innerText = "right";
            highlightAnswer("right");
        }
        return;
    }
    highlightAnswer("")
}

function highlightAnswer(elementClass) {
    hideAnswer("up");
    hideAnswer("down");
    hideAnswer("left");
    hideAnswer("right");

    if (elementClass === "") return;

    const element = document.getElementsByClassName(elementClass);
    element.item(0).innerHTML = `<div class="answer ${element} selected"></div>`;
}

function hideAnswer(element) {
    const answerBox = document.getElementsByClassName(element)
    answerBox.innerText = `<div class="answer ${element}"></div>`;
}