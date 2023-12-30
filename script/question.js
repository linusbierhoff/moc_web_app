let questions = null;
let current_question = null;
let correct_answers = 0;


function loadQuestions() {
    const request = new XMLHttpRequest();
    request.open("GET", "https://opentdb.com/api.php?amount=10&type=multiple", true);
    request.send(null)
    return JSON.parse(request.responseText)['results'].map((e) => new Question(e['question'], e['incorrect_answers'], e['correct_answer']));
}


function setQuestion() {
    const length = questions.length;

    if (length === 0) {
        activateFullscreenOverlay();
        overlay.style.background = `linear-gradient(rgba(0, 232, 255, 1), rgba(0, 255, 152, 1))`;
        overlay.innerHTML = `<h3>${count} correct answers!</h3>`
        done = true;
        return;
    }

    const index = Math.floor(Math.random() * length);
    current_question = questions[index];

    document.getElementById("question").innerText = current_question.question;
    for (let i = 0; i < 4; i++) {
        document.getElementById(i.toString()).innerText = current_question.answers[i];
    }
    questions.splice(index, 1);
}

function checkAnswer() {
    if (done || highlighted === null) return;
    const selectedID = classNames.indexOf(highlighted);
    const right_answer = current_question.correct_answer;
    activateFullscreenOverlay()

    if (selectedID === right_answer) {
        correct_answers += 1;
        overlay.style.background = "green";
        overlay.innerHTML = `<h3>Right!</h3>`
    } else {
        overlay.style.background = "red";
        overlay.innerHTML = `<h3>Falsch!<br><br>${current_question['answers'][right_answer]}</h3>`
    }
    setTimeout(function () {
        deactivateFullscreenOverlay();
        setQuestion();
        hideAllAnswers();
    }, 1000);
}
