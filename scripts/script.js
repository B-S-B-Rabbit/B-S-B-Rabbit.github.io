"use strict";

function infixToRPN(expression) {
  const precedence = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
    '%': 2,
    'sqrt': 3,
    'lg': 3,
    'ln': 3,
    '^': 4,
    'n': 4, // Унарный минус
  };

  const isOperator = (token) => token in precedence;

  function shuntingYard(tokens) {
    const outputQueue = [];
    const operatorStack = [];

    for (const token of tokens) {
      if (!isNaN(token)) {
        outputQueue.push(token);
      } else if (isOperator(token)) {
        while (
          operatorStack.length &&
          precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]
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
      } else if (token === '!') { // Обрабатываем оператор "!" как унарный оператор
        operatorStack.push(token);
      }
    }
    

    while (operatorStack.length) {
      outputQueue.push(operatorStack.pop());
    }

    return outputQueue;
  }
  console.log(expression);
const modifiedExpression1 = expression.replace(/(^|[-+*/%^()!]|\([-+*/%^()!]*\))(-)(\(?\d+(\.\d*)?|\.\d+)/g, (match, p1, p2, p3) => {
  console.log(`match is ${match}, p1 is ${p1}, p2 is ${p2}, p3 is ${p3}`);
  // Если совпадение начинается с унарного минуса, заменяем его на 'n', а число без минуса оставляем без изменений.
  return p2 == '-' ? p1 + 'n' + p3 : p1 + p2 + p3;
});
const modifiedExpression2 = modifiedExpression1.replace(/(π)/g, (match, $1) => {
  console.log(`match is ${match}, p1 is ${$1}`);
  // Если совпадение начинается с унарного минуса, заменяем его на 'n', а число без минуса оставляем без изменений.
  return Math.PI;
});

  console.log("this is modified expression:", modifiedExpression2);
  const tokens = modifiedExpression2.match(/(\d+(\.\d*)?|\.\d+|[+\-*/%^()!]|sqrt|PI|lg|ln|\^|n)/g);
  
  console.log(tokens);
  const rpn = shuntingYard(tokens);
  return rpn;
}
function calculateRPN(rpn) {
  const stack = [];

  rpn.forEach((token) => {
    if (!isNaN(token)) {
      stack.push(parseFloat(token));
    } else if (token in operatorsBinary) {
      const operand2 = stack.pop();
      const operand1 = stack.pop();
      const result = operatorsBinary[token](operand1, operand2);
      stack.push(result);
    } else if (token in operatorsUnary) {
      const operand = stack.pop();
      const result = operatorsUnary[token](operand);
      stack.push(result);
    }
  });

  return stack[0];
}


const operatorsBinary = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
  '%': (a, b) => a % b,
  '^': (a, b) => Math.pow(a, b),
};

const operatorsUnary = {
  'sqrt': (a) => Math.sqrt(a),
  'lg': (a) => Math.log10(a),
  'ln': (a) => Math.log(a),
  'n': (a) => -a, // Унарный минус
  '!': (a) => factorial(a), // Факториал
};

// Функция для вычисления факториала
function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}

const calculator = {
  display: '',
  operator: '',

  updateDisplay() {
    const displayElement = document.getElementById('screen');
    displayElement.value = this.display;
  },

  appendDigit(digit) {
    this.display = this.display == '' ? digit : this.display + digit;
    this.updateDisplay();
  },

  setOperator(operator) {
    if (!(["xy", "x3", "x2", "10x", "x!", "+-"].indexOf(operator) + 1)) {
      console.log(operator);
    this.display += operator; // Добавляем оператор к текущему значению на экране
    }
    else {
      if (operator == "xy") {this.display += "^(";}
      if (operator == "x2") {this.display += "^2";}
      if (operator == "x3") {this.display += "^3";}
      if (operator == "10x") {this.display += "10^(";}
      if (operator == "x!") {this.display += "!";}
      if (operator == "+-" && this.display) {
        if (this.display[0] == "-")
        { 
          this.display = this.display.slice(1, this.display.length);
          if (this.display[0] == "(" && this.display[this.display.length - 1] == ")") {
            this.display = this.display.slice(1, this.display.length - 1);
          }
        }
        else if (!(this.display[0] == "(" && this.display[this.display.length - 1] == ")")) {
          this.display = "-(" + this.display + ")";
        }
        else {
          this.display = "-" + this.display;
        }
      }
    }
    this.updateDisplay(); // Обновляем экран после добавления оператора
  },
  setFunction(operator) {
    this.display += operator + "("; // Добавляем оператор к текущему значению на экране
    this.updateDisplay(); // Обновляем экран после добавления оператора
  },
  calculate() {
    const rpnExpression = infixToRPN(this.display);
    console.log(rpnExpression);
    const result = calculateRPN(rpnExpression);
    this.display = result;
    this.updateDisplay();
    return result;
  },

  openParenthesis() {
    this.display += '(';
    this.updateDisplay();
  },

  closeParenthesis() {
    this.display += ')';
    this.updateDisplay();
  },

  clear() {
    this.display = '';
    this.operator = '';
    this.updateDisplay();
  },
  leftBackspace() {
    console.log(this.display.length)
    if (this.display.length == 1) {this.clear();}
    else if (this.display.length > 1) {
    this.display = this.display.slice(0, this.display.length - 1);
    this.operator = '';
    this.updateDisplay();
    }
  },
};

const digitButtons = document.querySelectorAll('.digit-button'); // Замени '.digit-button' на реальный класс кнопок с цифрами
digitButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const digit = button.textContent;
    console.log(digit);
    calculator.appendDigit(digit);
  });
});

const operatorButtons = document.querySelectorAll('.operator-button'); // Замени '.operator-button' на реальный класс кнопок с операторами
operatorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const operator = button.textContent;
    calculator.setOperator(operator);
  });
});


const functionButtons = document.querySelectorAll('.function-button'); // Замени '.operator-button' на реальный класс кнопок с операторами
functionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const func = button.textContent;
    calculator.setFunction(func);
  });
});

const equalsButton = document.getElementById('equalsButton'); // Замени 'equalsButton' на реальный идентификатор кнопки "="
equalsButton.addEventListener('click', () => {
  calculator.calculate();
});

const clearButton = document.getElementById('clearButton'); // Замени 'clearButton' на реальный идентификатор кнопки "С"
clearButton.addEventListener('click', () => {
  calculator.clear();
});

const openParenthesisButton = document.getElementById('openParenthesisButton');
const closeParenthesisButton = document.getElementById('closeParenthesisButton');

openParenthesisButton.addEventListener('click', () => {
  calculator.openParenthesis();
});

closeParenthesisButton.addEventListener('click', () => {
  calculator.closeParenthesis();
});

const backspaceButton = document.getElementById('backspaceButton'); // Замени 'clearButton' на реальный идентификатор кнопки "С"
backspaceButton.addEventListener('click', () => {
  calculator.leftBackspace();
});


document.addEventListener('keydown', (event) => {
  const key = event.key;
  const button = document.querySelector(`[data-key="${key}"]`);
  if (key >= "0" && key <= "9") { 
    if (button) {
    // Добавьте класс keytapped к кнопке при нажатии клавиши
    button.classList.add('keytapped-white');
    calculator.appendDigit(key);
  }
}
  else if (key == "Backspace") {button.classList.add('keytapped-white'); calculator.leftBackspace();}
  else {
    if (button) {
      // Добавьте класс keytapped к кнопке при нажатии клавиши
      
    }
    if (["+","-", "/", "*", "%", "xy", ".", "x!"].indexOf(button.textContent) + 1) {
      calculator.setOperator(key);
    }
    if (button.textContent == "(") {calculator.openParenthesis();}
    if (button.textContent == ")") {calculator.closeParenthesis();}
    if (button.textContent== "=") {calculator.calculate();}
    
  }

});

document.addEventListener('keyup', (event) => {
  const key = event.key;
  const button = document.querySelector(`[data-key="${key}"]`);
  if (key >= "0" && key <= "9" || key == "Backspace") { 
    if (button) {
    // Добавьте класс keytapped к кнопке при нажатии клавиши
    setTimeout(a => button.classList.remove('keytapped-white'), 100);
  }
}
  else {
    if (button) {
      // Добавьте класс keytapped к кнопке при нажатии клавиши
      setTimeout(() => button.classList.remove('keytapped-others'), 100);
    }
  }
});
