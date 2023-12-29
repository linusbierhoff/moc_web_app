document.getElementById('start-button').addEventListener('click', requestOrientationPermission)


if (!Modernizr.hasOwnProperty()) {
    document.getElementById("introduction").innerHTML = `<img src="../assets/qr-code.png" alt="quiz.linusbierhoff.com">`
    document.getElementById("start").innerHTML = `<h3>This app is not compatible with your device. Scan the QR Code to use the website on your mobile device.</h3>`
}

function requestOrientationPermission() {
    DeviceOrientationEvent.requestPermission()
        .then(response => {
            if (response === 'granted') {
                window.location.href = "../quiz.html";
                window.addEventListener('deviceorientation', handleOrientation)
            }
        })
        .catch(console.error)
}