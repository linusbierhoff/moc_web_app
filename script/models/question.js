function Question(question, wrong_answers, right_answer) {
    this.question = question
    this.answers = []
    this.answers.push(wrong_answers)
    this.answers.push(right_answer)
    this.answers = this.answers.sort((a, b) => 0.5 - Math.random());

    this.correct_answer = this.answers.indexOf(right_answer)
}

