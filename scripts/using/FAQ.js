export function FAQ() {
  const questions = document.querySelectorAll('.FAQ__question');

  questions.forEach((question) => {
    const answer = question.querySelector('.FAQ__answer');
    const questionTitle = question.querySelector('.FAQ__q-head');

    questionTitle.addEventListener('click', () => {
      if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
      } else {
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      }
    });
  });
}
