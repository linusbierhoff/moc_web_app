let category_menu = document.getElementById("category");

if (Modernizr.deviceorientation) {
    loadCategories().then(r => {

        category_menu.addEventListener("change", (event) => {
            category = category_menu.value;
        })
        document.getElementById('start-button').addEventListener('click', onStart);
    });
} else {
    document.getElementById("introduction").innerHTML = `<img src="assets/qr-code.png" alt="quiz.linusbierhoff.com">`
    document.getElementById("start").innerHTML = `<h3>This app is not compatible with your device. Scan the QR Code to use the website on your mobile device.</h3>`
}

async function loadCategories() {
    let response = await fetch("https://opentdb.com/api_category.php");
    let json = await response.json();
    let categories = json['trivia_categories'].map((e) => new Category(e['name'], e['id']));
    setDropdown(categories);
}

function setDropdown(categories) {
    for (let i in categories) {
        let option = document.createElement('option');
        option.value = categories[i].category_id;
        option.text = categories[i].name;
        category_menu.add(option);
    }
}

async function onStart() {
    let response = await requestOrientationPermission()
    if (response) {
        window.location.href = "quiz.html";
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
