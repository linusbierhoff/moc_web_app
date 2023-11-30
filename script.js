if (window.DeviceMotionEvent) {
    window.addEventListener('deviceorientation', handleOrientation);
} else {
    var orientationDisplay = document.getElementById('orientation-display');
    orientationDisplay.innerHTML = `<p>Device orientation not supported</p>`;
}


function handleOrientation(event) {
    var alpha = event.alpha;
    var beta = event.beta;  
    var gamma = event.gamma; 
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
