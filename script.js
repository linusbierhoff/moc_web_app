var initAlpha = null
var initBeta = null
var initGamma = null

var enabled = false

function onButton(){
    if(enabled) {
        resetOrientation();
    } else{
        requestOrientationPermission();
    }
}


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
    getPhoneSide(alpha- initAlpha, beta - initBeta, gamma - initGamma)
    updateOrientationDisplay(alpha - initAlpha, beta - initBeta, gamma - initGamma);
}

function resetOrientation() {
    var alpha = DeviceOrientationEvent.alpha;
    var beta = DeviceOrientationEvent.beta;  
    var gamma = DeviceOrientationEvent.gamma; 

    initAlpha = alpha;
    initBeta = beta;
    initGamma = gamma;
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
    var orientationDisplay = document.getElementById('side-display');
    if(beta < -30) orientationDisplay.innerHTML = `<h2>Oben</h2>`
    if(beta > 30) orientationDisplay.innerHTML = `<h2>Unten</h2>`

    if(gamma < -30) orientationDisplay.innerHTML = `<h2>Links</h2>`
    if(hamma > 30) orientationDisplay.innerHTML = `<h2>Rechts</h2>`
}
