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
            highlightAnswer("top");
        }
        if (beta > angle) {
            highlightAnswer("bottom");
        }
        return;
    }
    if (absGamma > absBeta && absGamma > angle) {
        if (gamma < -angle) {

            highlightAnswer("left");
        }
        if (gamma > angle) {
            highlightAnswer("right");
        }
        return;
    }
    highlightAnswer("")
}

function highlightAnswer(elementClass) {
    hideAnswer("top");
    hideAnswer("bottom");
    hideAnswer("left");
    hideAnswer("right");

    if (elementClass === "") return;

    const elements = document.getElementsByClassName(elementClass);
    if (elements.length <= 0) {
        console.log("cannot found element");
        return;
    }
    console.log(elements[0].className)
    elements[0].className = "answer " + elementClass + " selected";
}

function hideAnswer(elementClass) {
    const elements = document.getElementsByClassName(elementClass)
    if (elements.length <= 0) {
        console.log("cannot found element");
        return;
    }
    elements[0].className = "answer " + elementClass;
}