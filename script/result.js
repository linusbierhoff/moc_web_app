const medal_html = document.getElementById("medal");
const text_html = document.getElementById("result-text")

document.getElementById("restart-button").addEventListener("click", restart);

let correct_answers = getState(CORRECT_ANSWERS);
let seconds = getState(SECONDS);

text_html.innerText = `You answered ${correct_answers} questions right in ${seconds} seconds`;

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

function restart() {
    window.location.href = "index.html";
}