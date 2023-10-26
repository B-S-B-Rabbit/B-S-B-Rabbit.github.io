/**
 * Модуль, представляющий класс для работы с калькулятором.
 * @module representation
 */
import { infixToRPN, calculateRPN } from './algorithm';
import { updateFontSize } from './calculator-functionality';
/**
 * Класс, представляющий калькулятор.
 */
class Calculator {
  /**
   * Создает экземпляр класса Calculator.
   * @constructor
   * @this  {Calculator}
   */
  constructor() {
    /**
     * Элемент экрана калькулятора.
     * @type {HTMLElement}
     */
    this.display = document.querySelector('.calculator__screen');

    /**
     * Текущий оператор (если есть).
     * @type {string}
     */
    this.operator = '';

    /**
     * Флаг, указывающий на наличие ошибки в выражении.
     * @type {boolean}
     */
    this.hasError = false;

    /**
     * Флаг, указывающий на наличие результата вычисления.
     * @type {boolean}
     */
    this.hasResult = false;
  }

  /**
   * Прокручивает ввод к концу строки на экране калькулятора.
   */
  scrollInputToEnd() {
    const inputElement = this.display;
    inputElement.scrollLeft = inputElement.scrollWidth;
  }

  /**
   * Добавляет цифру к текущему вводу на экране.
   * @param {string} digit - Добавляемая цифра.
   */
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

  /**
   * Устанавливает оператор на экране калькулятора.
   * @param {string} operator - Устанавливаемый оператор.
   */
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

  /**
   * Устанавливает функцию на экране калькулятора.
   * @param {string} operator - Устанавливаемая функция.
   */
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

  /**
   * Вычисляет результат выражения на экране калькулятора.
   * @returns {number} Результат вычисления.
   */
  calculate() {
    if (this.display.value == '') {
      return 0;
    }
    try {
      const rpnExpression = infixToRPN(this.display.value);
      const result = calculateRPN(rpnExpression);
      this.display.value = result;
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
      this.display.value = "error";
      updateFontSize();
      this.hasError = true;
    }
  }

  /**
   * Добавляет открывающую скобку на экране калькулятора.
   */
  openParenthesis() {
    if (this.hasError || this.hasResult) {
      this.clear();
      this.hasError = false;
      this.hasResult = false;
    }
    this.display.value += '(';
    this.scrollInputToEnd();
  }

  /**
   * Добавляет закрывающую скобку на экране калькулятора.
   */
  closeParenthesis() {
    if (this.hasError || this.hasResult) {
      this.clear();
      this.hasError = false;
      this.hasResult = false;
    }
    this.display.value += ')';
    this.scrollInputToEnd();
  }

  /**
   * Очищает экран калькулятора.
   */
  clear() {
    this.hasError = false;
    this.hasResult = false;
    this.display.value = '';
    this.operator = '';
  }

  /**
   * Выполняет операцию "назад" (удаляет символ справа) на экране калькулятора.
   */
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
