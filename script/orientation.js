let initAlpha = null;
let initBeta = null;
let initGamma = null;

function requestOrientationPermission() {
    try {
        let response = DeviceOrientationEvent.requestPermission();
        if (response === 'granted') {
            window.location.href = "../quiz.html";
            window.addEventListener('deviceorientation', handleOrientation)
            return true;
        }
    } catch (e) {
        console.error(e)
    }
    return false;
}


function resetOrientation() {
    initAlpha = initBeta = initGamma = null;
    hideAllAnswers();
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

    if (absBeta < 5 && absGamma < 5) {
        centered_circle.style.background = `rgba(256, 256, 256, 1)`;
    } else {
        centered_circle.style.background = `rgba(256, 256, 256, 0.4)`;
    }

}
