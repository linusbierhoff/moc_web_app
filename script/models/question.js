function Question(question, wrong_answers, right_answer) {
    this.question = question;
    this.correct_answer = Math.floor(Math.random() * 3);
    this.answers = wrong_answers
    this.answers.insertBefore(this.correct_answer, right_answer)
}

