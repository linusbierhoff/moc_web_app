var initAlpha = null
var initBeta = null
var initGamma = null

var enabled = false

var angle = 40;



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
            if (response == 'granted') {
                window.addEventListener('deviceorientation', handleOrientation)
            }
        })
        .catch(console.error)
}


function resetOrientation() {
    var alpha = DeviceOrientationEvent.alpha;
    var beta = DeviceOrientationEvent.beta;
    var gamma = DeviceOrientationEvent.gamma;

    initAlpha = alpha;
    initBeta = beta;
    initGamma = gamma;
}


function handleOrientation(event) {
    var alpha = event.alpha;
    var beta = event.beta;
    var gamma = event.gamma;

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
    var orientationDisplay = document.getElementById('orientation-display');
    orientationDisplay.innerHTML = `
        <p>Alpha (Z-axis): ${alpha.toFixed(2)} degrees</p>
        <p>Beta (X-axis): ${beta.toFixed(2)} degrees</p>
        <p>Gamma (Y-axis): ${gamma.toFixed(2)} degrees</p>
    `;
}


function updatePhoneSide(alpha, beta, gamma) {
    var sideDisplay = document.getElementById('side-display');

    var absGamma = abs.gamma
    var absBeta = abs.beta

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
