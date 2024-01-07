// Get references to HTML elements
const medal_html = document.getElementById("medal");
const text_html = document.getElementById("result-text")

// Add function to restart-button
document.getElementById("restart-button").addEventListener("click", restart);

// Retrieve game results based on the store (provided by quiz screen)
let correct_answers = getState(CORRECT_ANSWERS);
let seconds = getState(SECONDS);

// Display result text based on correct answers and time taken
text_html.innerText = `You answered ${correct_answers} questions right in ${seconds} seconds`;

// Determine the medal and display corresponding image based on the result
if (seconds < 60 && correct_answers >= 9) {
    //Gold medal
    medal_html.innerHTML = `<img src="assets/gold.svg" alt="Gold medal">`
} else if (seconds < 120 && correct_answers >= 7) {
    //Silver medal
    medal_html.innerHTML = `<img src="assets/silver.svg" alt="Silver medal">`

} else {
    //Bronze medal
    medal_html.innerHTML = `<img src="assets/bronze.svg" alt="Bronze medal">`

}

// Function to restart the game by resetting stored values and navigating to the start page
function restart() {
    saveState(CORRECT_ANSWERS, null)
    saveState(CATEGORY, null)
    saveState(SECONDS, null)
    window.location.href = "index.html";
}