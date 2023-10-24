function infixToRPN(expression) {
  const precedence = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
    '%': 2,
    sqrt: 3,
    lg: 3,
    ln: 3,
    '^': 4,
    n: 4,
  };

  const isOperator = (token) => token in precedence;

  function shuntingYard(tokens) {
    const outputQueue = [];
    const operatorStack = [];

    for (const token of tokens) {
      if (!Number.isNaN(Number(token))) {
        outputQueue.push(parseFloat(token).toFixed(5));
      } else if (isOperator(token)) {
        while (
          operatorStack.length &&
          precedence[operatorStack[operatorStack.length - 1]] >=
            precedence[token]
        ) {
          outputQueue.push(operatorStack.pop());
        }
        operatorStack.push(token);
      } else if (token === '(') {
        operatorStack.push(token);
      } else if (token === ')') {
        while (
          operatorStack.length &&
          operatorStack[operatorStack.length - 1] !== '('
        ) {
          outputQueue.push(operatorStack.pop());
        }
        if (operatorStack[operatorStack.length - 1] === '(') {
          operatorStack.pop();
        }
      } else if (token === '!') {
        operatorStack.push(token);
      } else {
        throw new Error(`Invalid character in expression: ${token}`);
      }
    }

    while (operatorStack.length) {
      outputQueue.push(operatorStack.pop());
    }

    return outputQueue;
  }

  const modifiedExpression1 = expression.replace(
    /(^|[-+*/%^()!]|\([-+*/%^()!]*\))(-)(\(?\d+(\.\d*)?|\.\d+)/g,
    (_, p1, p2, p3) => (p2 == '-' ? `${p1}n${p3}` : p1 + p2 + p3)
  );

  const modifiedExpression2 = modifiedExpression1.replace(/(π)/g, () =>
    Math.PI.toFixed(5)
  );

  const tokensExp = modifiedExpression2.match(
    /(\d+(\.\d*)?|\.\d+|[+\-*/%^()!]|sqrt|PI|lg|ln|\^|n)/g
  );

  if (!tokensExp) {
    throw new Error('Invalid expression');
  }

  const rpn = shuntingYard(tokensExp);
  return rpn;
}

function calculateRPN(rpn) {
  const stack = [];

  rpn.forEach((token) => {
    if (!Number.isNaN(Number(token))) {
      stack.push(parseFloat(token));
    } else if (token in operatorsBinary) {
      if (stack.length < 2) {
        throw new Error(`Insufficient operands for binary operation: ${token}`);
      }
      const operand2 = stack.pop();
      const operand1 = stack.pop();
      const result = operatorsBinary[token](operand1, operand2);
      stack.push(result);
    } else if (token in operatorsUnary) {
      if (stack.length < 1) {
        throw new Error(`Insufficient operands for unary operation: ${token}`);
      }
      const operand = stack.pop();
      const result = operatorsUnary[token](operand);
      stack.push(result);
    } else {
      throw new Error(`Unknown operator: ${token}`);
    }
  });

  if (stack.length !== 1 || Number.isNaN(Number(stack[0]))) {
    throw new Error('Invalid expression');
  }

  return stack[0];
}

const operatorsBinary = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
  '%': (a, b) => a % b,
  '^': (a, b) => a ** b,
};

const operatorsUnary = {
  sqrt: (a) => Math.sqrt(a),
  lg: (a) => Math.log10(a),
  ln: (a) => Math.log(a),
  n: (a) => -a,
  '!': (a) => factorial(a),
};

function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}

class Calculator {
  constructor() {
    this.display = document.querySelector('.calculator__screen');
    this.operator = '';
    this.hasError = false;
    this.hasResult = false;
  }

  scrollInputToEnd() {
    const inputElement = this.display;
    inputElement.scrollLeft = inputElement.scrollWidth;
  }

  appendDigit(digit) {
    if (this.hasError || this.hasResult) {
      this.clear();
      this.hasError = false;
      this.hasResult = false;
    }
    this.display.value =
      this.display.value == '' ? digit : this.display.value + digit;
    this.scrollInputToEnd();
  }

  setOperator(operator) {
    if (this.hasError) {
      this.clear();
      this.hasError = false;
    }
    if (!(['xy', 'x3', 'x2', '10x', 'x!', '+-'].indexOf(operator) + 1)) {
      this.display.value += operator;
    } else {
      if (operator == 'xy') {
        this.display.value += '^(';
      }
      if (operator == 'x2') {
        this.display.value += '^2';
      }
      if (operator == 'x3') {
        this.display.value += '^3';
      }
      if (operator == '10x') {
        if (this.hasResult) {
          this.display.value = `10^(${this.display.value})`;
        } else {
          this.display.value += '10^(';
        }
      }
      if (operator == 'x!') {
        this.display.value += '!';
      }
      if (operator == '+-' && this.display.value) {
        if (this.display.value[0] == '-') {
          this.display.value = this.display.value.slice(
            1,
            this.display.value.length
          );
          if (
            this.display.value[0] == '(' &&
            this.display.value[this.display.value.length - 1] == ')'
          ) {
            this.display.value = this.display.value.slice(
              1,
              this.display.value.length - 1
            );
          }
        } else if (
          !(
            this.display.value[0] == '(' &&
            this.display.value[this.display.value.length - 1] == ')'
          )
        ) {
          this.display.value = `-(${this.display.value})`;
        } else {
          this.display.value = `-${this.display.value}`;
        }
      }
    }
    if (this.hasResult) {
      this.hasResult = false;
    }
    this.scrollInputToEnd();
  }

  setFunction(operator) {
    if (this.hasError) {
      this.clear();
      this.hasError = false;
    }
    if (this.hasResult) {
      this.display.value = `${operator}(${this.display.value})`;
      this.hasResult = false;
    } else {
      this.display.value += `${operator}(`;
    }
    this.scrollInputToEnd();
  }

  calculate() {
    if (this.display.value == '') {
      return 0;
    }
    try {
      const rpnExpression = infixToRPN(this.display.value);
      const result = calculateRPN(rpnExpression);
      if (result.toString().indexOf('e') + 1) {
        this.display.value = 'Too big value';
        this.hasError = false;
        this.hasResult = true;
        return result;
      }
      this.display.value = parseFloat(result)
        .toFixed(5)
        .replace(/(\.0+|0+)$/, '');
      updateFontSize();
      this.hasError = false;
      this.hasResult = true;
      return result;
    } catch (error) {
      this.display.value = 'Error';
      updateFontSize();
      this.hasError = true;
    }
  }

  openParenthesis() {
    if (this.hasError || this.hasResult) {
      this.clear();
      this.hasError = false;
      this.hasResult = false;
    }
    this.display.value += '(';
    this.scrollInputToEnd();
  }

  closeParenthesis() {
    if (this.hasError || this.hasResult) {
      this.clear();
      this.hasError = false;
      this.hasResult = false;
    }
    this.display.value += ')';
    this.scrollInputToEnd();
  }

  clear() {
    this.display.value = '';
    this.operator = '';
  }

  leftBackspace() {
    if (this.hasError) {
      this.clear();
      this.hasError = false;
    }
    console.log(this.display.value.length);
    if (this.display.value.length == 1) {
      this.clear();
    } else if (this.display.value.length > 1) {
      this.display.value = this.display.value.slice(
        0,
        this.display.value.length - 1
      );
      this.operator = '';
    }
  }
}
const calculator = new Calculator();

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

const screen = document.querySelector('.calculator__screen');
const hiddenScreen = document.querySelector('.calculator__hidden-screen');
const defaultFontSize = parseFloat(window.getComputedStyle(screen).fontSize);
let currentFontSize = defaultFontSize;
let shrinkCount = 0;
let prevText = '';

function updateFontSize() {
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

document.addEventListener('DOMContentLoaded', () => {
  let lastTouchTime = 0;
  const body = document.querySelector('.page');

  body.addEventListener('touchstart', (event) => {
    const currentTime = new Date().getTime();
    const timeSinceLastTouch = currentTime - lastTouchTime;

    if (timeSinceLastTouch <= 50) {
      event.preventDefault();
    }

    lastTouchTime = currentTime;
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const calc = document.querySelector('.calculator');
  calc.scrollIntoView({ behavior: 'smooth' });
});
