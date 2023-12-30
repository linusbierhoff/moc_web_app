let done = false;
let highlighted = null;
let timeoutId;

if (Modernizr.devicemotiondeviceorientation) {
    document.getElementById('start-button').addEventListener('click', onStart)

} else {
    document.getElementById("introduction").innerHTML = `<img src="assets/qr-code.png" alt="quiz.linusbierhoff.com">`
    document.getElementById("start").innerHTML = `<h3>This app is not compatible with your device. Scan the QR Code to use the website on your mobile device.</h3>`
}

async function onStart() {
    let response = await requestOrientationPermission()
    if (response) {
        window.location.href = "../quiz.html";
    }
}

async function requestOrientationPermission() {
    try {
        let response = await DeviceOrientationEvent.requestPermission();
        return (response === 'granted');
    } catch (e) {
        console.error(e)
    }
    return false;
}
