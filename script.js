document.getElementById('start-button').addEventListener('click', requestOrientationPermission)


function requestOrientationPermission() {
    DeviceOrientationEvent.requestPermission()
        .then(response => {
            if (response === 'granted') {
                window.location.href = "quiz/quiz.html";
                window.addEventListener('deviceorientation', handleOrientation)
            }
        })
        .catch(console.error)
}