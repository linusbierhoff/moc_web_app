function Question(question, wrong_answers, right_answer) {
    this.question = question
    this.answers = [...wrong_answers, right_answer].sort(() => Math.random() - 0.5);

    this.correct_answer = this.answers.indexOf(right_answer)
}

