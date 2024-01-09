// Get a reference to the category dropdown menu in the HTML
let category_menu = document.getElementById("category");

// Check if the browser supports the deviceorientation feature using Modernizr and if the client is mobile -> should habe sensors
if (Modernizr.deviceorientation && WURFL.is_mobile) {
    // If supported, load categories and activate buttons
    loadCategories().then(r => {
        category_menu.addEventListener("change", (event) => {
            saveState(CATEGORY, category_menu.value);
        })
        document.getElementById('start-button').addEventListener('click', onStart);
    });
} else {
    // If deviceorientation is not supported, display a message and QR code for mobile users
    setNotSupported();
}

// Function to asynchronously load trivia categories from the Open Trivia Database API
async function loadCategories() {
    let response = await fetch("https://opentdb.com/api_category.php");
    let json = await response.json();
    let categories = json['trivia_categories'].map((e) => new Category(e['name'], e['id']));
    setDropdown(categories);
}

function setNotSupported() {
    document.getElementById("introduction").innerHTML = `<img src="assets/qr-code.png" alt="quiz.linusbierhoff.com">`
    document.getElementById("start").innerHTML = `<h3>This app is not compatible with your device. Scan the QR Code to use the website on your mobile device.</h3>`
}

// Function to populate the category dropdown menu with options
function setDropdown(categories) {
    for (let i in categories) {
        let option = document.createElement('option');
        option.value = categories[i].category_id;
        option.text = categories[i].name;
        category_menu.add(option);
    }
}

// Function triggered when the start button is clicked
async function onStart() {
    let response = await requestOrientationPermission()
    if (response) {
        window.location.href = "quiz.html";
    }
}

// Function to request permission for device orientation
async function requestOrientationPermission() {
    // on android
    if (DeviceOrientationEvent.requestPermission !== 'function') return true;

    try {
        let response = await DeviceOrientationEvent.requestPermission();
        // Return true if permission is granted, false otherwise
        return (response === 'granted');
    } catch (e) {
        console.error(e)
    }

    return false;
}
