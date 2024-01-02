const SECONDS = "seconds";
const CORRECT_ANSWERS = "correct_answers"
const CATEGORY = "category";

function saveState(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getState(key) {
    const savedState = localStorage.getItem(key);
    return savedState ? JSON.parse(savedState) : null;
}
