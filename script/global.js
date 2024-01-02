const SECONDS = "seconds";
const CORRECT_ANSWERS = "correct_answers"
const CATEGORY = "category";

function saveState(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
}

function getState(key) {
    const savedState = sessionStorage.getItem(key);
    return savedState ? JSON.parse(savedState) : null;
}
