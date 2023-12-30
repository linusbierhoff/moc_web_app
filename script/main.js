let done = false;
let highlighted = null;
let timeoutId;

document.getElementById('start-button').addEventListener('click', onStart)
document.getElementById('reset-button').addEventListener('click', resetOrientation)
window.addEventListener('deviceorientation', handleOrientation);

if (!Modernizr.hasOwnProperty()) {
    document.getElementById("introduction").innerHTML = `<img src="assets/qr-code.png" alt="quiz.linusbierhoff.com">`
    document.getElementById("start").innerHTML = `<h3>This app is not compatible with your device. Scan the QR Code to use the website on your mobile device.</h3>`
}

function onStart() {
    let response = requestOrientationPermission()
    if (response) {
        questions = loadQuestions();
        setQuestion();
    }
}

function highlightAnswer(className) {
    if (highlighted !== className && !done) {
        hideAllAnswers();
        clearTimeout(timeoutId);
        if (className === "") return;
        const htmlElements = document.getElementsByClassName(className);
        if (htmlElements.length !== 0) {
            htmlElements[0].className = "answer " + className + " selected";
            highlighted = className;
            timeoutId = setTimeout(() => {
                checkAnswer();
            }, 1500)
        } else console.log(className);
    }
}

function hideAllAnswers() {
    highlighted = null;
    for (let index in classNames) {

        let className = classNames[index];
        let htmlElements = document.getElementsByClassName(className);

        if (htmlElements.length !== 0) htmlElements[0].className = "answer " + className;
        else console.log(className);

    }
}


function activateFullscreenOverlay() {
    overlay.className = "fullscreen-overlay"
}

function deactivateFullscreenOverlay() {
    overlay.className = null;
    overlay.style.color = `transparent`;
    overlay.innerHTML = ``;
}




