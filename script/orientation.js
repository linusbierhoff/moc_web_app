// Constant representing the thresholdAngle for selecting an answer
const thresholdAngle = 30;

// Array of classNames representing triangle for different phone orientation
const classNames = [
    "top",
    "left",
    "right",
    "bottom"
]

// Variables to store initial orientation values
let initAlpha = null;
let initBeta = null;
let initGamma = null;

// Variable to store current highlighted orientation
let highlighted = null;

// Variable to store timeout ID for confirming answer
let timeoutId = null;

// Event listener to handle device orientation changes (permission granted on start screen)
window.addEventListener('deviceorientation', handleOrientation)

// Add function to reset-button
document.getElementById('reset-button').addEventListener('click', resetOrientation)

// Function to handle device orientation events
function handleOrientation(event) {
    let alpha = event.alpha;
    let beta = event.beta;
    let gamma = event.gamma;

    // Initialize initial values to current orientation if not already set -> on startup and reset
    initAlpha ??= alpha;
    initBeta ??= beta;
    initGamma ??= gamma;

    // Adjust values based on initial orientation
    alpha = alpha - initAlpha
    beta = beta - initBeta
    gamma = gamma - initGamma

    updatePhoneSide(alpha, beta, gamma)
}

// Function to update the highlighted phone side based on orientation values
function updatePhoneSide(alpha, beta, gamma) {
    // Check if the screen is in portrait or landscape orientation to adjust
    if (screen.availHeight < screen.availWidth) {
        const tempBeta = beta;
        beta = -gamma;
        gamma = tempBeta;
    }

    // Calculate absolute values of beta and gamma to get the side with the most extreme angle
    const absBeta = Math.abs(beta);
    const absGamma = Math.abs(gamma);


    if (absBeta > absGamma && absBeta > thresholdAngle) {
        if (beta < -thresholdAngle) highlightAnswer("top");

        if (beta > thresholdAngle) highlightAnswer("bottom");

    } else if (absGamma > absBeta && absGamma > thresholdAngle) {
        if (gamma < -thresholdAngle) highlightAnswer("left");
        if (gamma > thresholdAngle) highlightAnswer("right");

    } else {
        highlightAnswer("")
    }

    // Highlight the circle if user holds phone centered
    if (absBeta < 5 && absGamma < 5) {
        centered_circle.style.background = `rgba(256, 256, 256, 1)`;
    } else {
        centered_circle.style.background = `rgba(256, 256, 256, 0.4)`;
    }
}

// Function to reset the orientation values and hide all highlighted answers
function resetOrientation() {
    initAlpha = initBeta = initGamma = null;
    hideAllAnswers();
    highlighted = null;
}
