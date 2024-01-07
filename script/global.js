// Constant representing the key for storing and retrieving seconds in session storage
const SECONDS = "seconds";
// Constant representing the key for storing and retrieving correct answers in session storage
const CORRECT_ANSWERS = "correct_answers"
// Constant representing the key for storing and retrieving category in session storage
const CATEGORY = "category";

// Function to save a key-value pair in session storage
function saveState(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
}

// Function to retrieve a value from session storage using the provided key
function getState(key) {
    const savedState = sessionStorage.getItem(key);
    return savedState ? JSON.parse(savedState) : null;
}
