import { infixToRPN, calculateRPN } from './algorithm';
import { updateFontSize } from './app';
import { funtionality } from './page-functionality';

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

export const calculator = new Calculator();
funtionality();
