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

let highlighted = null;
let timeoutId = null;

window.addEventListener('deviceorientation', handleOrientation)

document.getElementById('reset-button').addEventListener('click', resetOrientation)


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
    if (screen.availHeight < screen.availWidth) {
        const tempBeta = beta;
        beta = -gamma;
        gamma = tempBeta;
    }

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

    if (absBeta < 5 && absGamma < 5) {
        centered_circle.style.background = `rgba(256, 256, 256, 1)`;
    } else {
        centered_circle.style.background = `rgba(256, 256, 256, 0.4)`;
    }
}


function resetOrientation() {
    initAlpha = initBeta = initGamma = null;
    hideAllAnswers();
    highlighted = null;
}
