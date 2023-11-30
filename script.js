let initAlpha = null;
let initBeta = null;
let initGamma = null;

let enabled = false;

const angle = 40;


document.getElementById('permission-button').addEventListener('click', onButton)


function onButton() {
    if (!enabled) {
        requestOrientationPermission();
        enabled = true
    } else {
        resetOrientation();
    }
}


function requestOrientationPermission() {
    DeviceOrientationEvent.requestPermission()
        .then(response => {
            if (response === 'granted') {
                window.addEventListener('deviceorientation', handleOrientation)
            }
        })
        .catch(console.error)
}


function resetOrientation() {
    initAlpha = DeviceOrientationEvent.arguments.alpha;
    initBeta = DeviceOrientationEvent.arguments.beta;
    initGamma = DeviceOrientationEvent.arguments.gamma;
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
    updateOrientationDisplay(alpha, beta, gamma);
}


function updateOrientationDisplay(alpha, beta, gamma) {
    const orientationDisplay = document.getElementById('orientation-display');
    orientationDisplay.innerHTML = `
        <p>Alpha (Z-axis): ${alpha.toFixed(2)} degrees</p>
        <p>Beta (X-axis): ${beta.toFixed(2)} degrees</p>
        <p>Gamma (Y-axis): ${gamma.toFixed(2)} degrees</p>
    `;
}


function updatePhoneSide(alpha, beta, gamma) {
    const sideDisplay = document.getElementById('side-display');

    const absBeta = Math.abs(beta);
    const absGamma = Math.abs(gamma);

    if (absBeta > absGamma && absBeta > angle) {
        if (beta < -angle) sideDisplay.innerHTML = `<h4>Up</h4>`;
        if (beta > angle) sideDisplay.innerHTML = `<h4>Down</h4>`;
        return;
    }
    if (absGamma > absBeta && absGamma > angle) {
        if (gamma < -angle) sideDisplay.innerHTML = `<h4>Left</h4>;`
        if (gamma > angle) sideDisplay.innerHTML = `<h4>Right</h4>`;
        return;
    }
    sideDisplay.innerHTML = ``;
}
