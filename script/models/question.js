// Constructor function for creating Question objects
function Question(question, wrong_answers, right_answer) {
    this.question = question
    // Combine wrong_answers array with the right_answer, shuffle the combined array
    this.answers = [...wrong_answers, right_answer].sort(() => Math.random() - 0.5);
    // Determine the index of the correct_answer in the shuffled answers array
    this.correct_answer = this.answers.indexOf(right_answer)
}