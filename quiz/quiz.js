let initAlpha = null;
let initBeta = null;
let initGamma = null;

let enabled = false;

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
    const sideDisplay = document.getElementById('side-display');

    const absBeta = Math.abs(beta);
    const absGamma = Math.abs(gamma);

    if (absBeta > absGamma && absBeta > angle) {
        if (beta < -angle) showAnswerById(1);
        if (beta > angle) showAnswerById(4);
        return;
    }
    if (absGamma > absBeta && absGamma > angle) {
        if (gamma < -angle) showAnswerById(2);
        if (gamma > angle) showAnswerById(3);
        return;
    }

    showAnswerById(0)
}

function showAnswerById(id) {
    const answerBox = document.getElementById(`answer-${id}`)

    for (let i = 0; i < 4; i++) {
        if (i !== id) hideAnswerByID(i);
    }

    if (id === 1 || id === 4) {
        answerBox.style.height = '40vh';
    }

    if (id === 2 || id === 3) {
        answerBox.style.width = '40vw'
    }
    answerBox.innerHTML = "Hier steht eine antwort"

}

function hideAnswerByID(id) {
    const answerBox = document.getElementById(`answer-${id}`)

    if (id === 1 || id === 4) {
        answerBox.style.height = '12vh';
    }

    if (id === 2 || id === 3) {
        answerBox.style.width = '20vw'
    }
    answerBox.innerHTML = ""
}
