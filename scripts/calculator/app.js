import { calculator } from './representation';

const screen = document.querySelector('.calculator__screen');
const hiddenScreen = document.querySelector('.calculator__hidden-screen');
const defaultFontSize = parseFloat(window.getComputedStyle(screen).fontSize);
let currentFontSize = defaultFontSize;
let shrinkCount = 0;
let prevText = '';

export function updateFontSize() {
  const textWidth = screen.scrollWidth;
  const inputWidth = screen.clientWidth;
  if (textWidth - 1 > inputWidth && shrinkCount < 2) {
    currentFontSize *= 0.8;
    shrinkCount++;
  } else if (textWidth - 1 <= inputWidth && shrinkCount > 0) {
    const tempFontSize = currentFontSize / 0.8;
    const tempScreen = document.createElement('div');
    tempScreen.style.fontSize = `${tempFontSize}px`;
    tempScreen.style.visibility = 'hidden';
    tempScreen.style.position = 'absolute';
    tempScreen.style.top = '-9999px';
    tempScreen.style.left = '-9999px';
    tempScreen.style.whiteSpace = 'nowrap';
    tempScreen.textContent = screen.value;
    document.body.appendChild(tempScreen);
    if (tempScreen.scrollWidth - 1 <= inputWidth) {
      currentFontSize = tempFontSize;
      shrinkCount--;
    }
    document.body.removeChild(tempScreen);
  } else if (screen.value === prevText) {
    currentFontSize = defaultFontSize;
    shrinkCount = 0;
  }
  screen.style.fontSize = `${currentFontSize}px`;
  hiddenScreen.style.fontSize = `${currentFontSize}px`;
  hiddenScreen.value = screen.value;
  prevText = screen.value;
}
const digitButtons = document.querySelectorAll('.js-digit-btn');
digitButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const digit = button.textContent;
    calculator.appendDigit(digit);
    updateFontSize();
  });
});

const operatorButtons = document.querySelectorAll('.js-operator-btn');
operatorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const operator = button.textContent;
    calculator.setOperator(operator);
    updateFontSize();
  });
});

const functionButtons = document.querySelectorAll('.js-function-btn');
functionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const func = button.textContent;
    calculator.setFunction(func);
    updateFontSize();
  });
});

const equalsButton = document.querySelector('.calculator__btn_type_eq');
equalsButton.addEventListener('click', () => {
  calculator.calculate();
  updateFontSize();
});

const clearButton = document.querySelector('.calculator__btn_type_C');
clearButton.addEventListener('click', () => {
  calculator.clear();
  currentFontSize = defaultFontSize;
  screen.style.fontSize = `${currentFontSize}px`;
  hiddenScreen.style.fontSize = `${currentFontSize}px`;
  shrinkCount = 0;
  updateFontSize();
});

const openParenthesisButton = document.querySelector(
  '.calculator__btn_type_lp'
);
const closeParenthesisButton = document.querySelector(
  '.calculator__btn_type_rp'
);

openParenthesisButton.addEventListener('click', () => {
  calculator.openParenthesis();
  updateFontSize();
});

closeParenthesisButton.addEventListener('click', () => {
  calculator.closeParenthesis();
  updateFontSize();
});

const backspaceButton = document.querySelector('.calculator__btn_type_bc');
backspaceButton.addEventListener('click', () => {
  calculator.leftBackspace();
  updateFontSize();
});

document.addEventListener('keydown', (event) => {
  if (event.key == 'Enter') {
    event.preventDefault();
    document
      .querySelector(`[data-key="="]`)
      .classList.add('js-keytapped-others');
    calculator.calculate();
    updateFontSize();
  }
});

document.addEventListener('keyup', (event) => {
  if (event.key == 'Enter') {
    setTimeout(
      () =>
        document
          .querySelector(`[data-key="="]`)
          .classList.remove('js-keytapped-others'),
      100
    );
    updateFontSize();
  }
});

document.addEventListener('keydown', (event) => {
  const { target } = event;
  if (target.closest('input')) {
    return;
  }
  const { key } = event;
  const button = document.querySelector(`[data-key="${key}"]`);
  if (key >= '0' && key <= '9') {
    if (button) {
      button.classList.add('js-keytapped-white');
      calculator.appendDigit(key);
      updateFontSize();
    }
  } else if (key == 'Backspace') {
    button.classList.add('js-keytapped-white');
    calculator.leftBackspace();
    updateFontSize();
  } else {
    if (button) {
      button.classList.add('js-keytapped-others');
    }
    if (
      ['+', '-', '/', '*', '%', 'xy', '.', 'x!'].indexOf(button.textContent) + 1
    ) {
      calculator.setOperator(key);
      updateFontSize();
    }
    if (button.textContent == '(') {
      calculator.openParenthesis();
      updateFontSize();
    }
    if (button.textContent == ')') {
      calculator.closeParenthesis();
      updateFontSize();
    }
    if (button.textContent == '=') {
      calculator.calculate();
      updateFontSize();
    }
  }
});

document.addEventListener('keyup', (event) => {
  const { target } = event;
  if (target.closest('input')) {
    return;
  }
  const { key } = event;
  const button = document.querySelector(`[data-key="${key}"]`);
  if ((key >= '0' && key <= '9') || key == 'Backspace') {
    if (button) {
      setTimeout(() => button.classList.remove('js-keytapped-white'), 100);
    }
  } else if (button) {
    setTimeout(() => button.classList.remove('js-keytapped-others'), 100);
  }
});

screen.addEventListener('input', updateFontSize);
updateFontSize();

screen.addEventListener('keydown', (event) => {
  if (event.key === 'Backspace' && screen.value.length === 0) {
    currentFontSize = defaultFontSize;
    screen.style.fontSize = `${currentFontSize}px`;
    hiddenScreen.style.fontSize = `${currentFontSize}px`;
    shrinkCount = 0;
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('.calculator__screen');

  input.addEventListener('input', function () {
    this.scrollLeft = this.scrollWidth;
  });
});
