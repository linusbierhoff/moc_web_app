var initAlpha = null
var initBeta = null
var initGamma = null



function requestOrientationPermission(){
    var orientationDisplay = document.getElementById('orientation-display');
    orientationDisplay.innerHTML = `<p>Button pressed</p>`,
    DeviceOrientationEvent.requestPermission()
    .then(response => {
        if (response == 'granted') {
            window.addEventListener('deviceorientation', handleOrientation)
        }
    })
    .catch(console.error)
}

function handleOrientation(event) {
    var alpha = event.alpha;
    var beta = event.beta;  
    var gamma = event.gamma; 

    initAlpha ??= alpha;
    initBeta ??= beta;
    initGamma ??= gamma;
    updateOrientationDisplay(alpha - initAlpha, beta - initBeta, gamma - initGamma);
}

function updateOrientationDisplay(alpha, beta, gamma) {
    var orientationDisplay = document.getElementById('orientation-display');
    orientationDisplay.innerHTML = `
        <p>Alpha (Z-axis): ${alpha.toFixed(2)} degrees</p>
        <p>Beta (X-axis): ${beta.toFixed(2)} degrees</p>
        <p>Gamma (Y-axis): ${gamma.toFixed(2)} degrees</p>
    `;
}


function getPhoneSide(alpha, beta, gamma) {
    var orientationDisplay = document.getElementById('orientation-display');
}
