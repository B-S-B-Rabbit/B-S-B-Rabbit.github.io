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
    if (this.hasResult) {
      this.clear();
      this.hasResult = false;
    }
    this.display.value =
      this.display.value == '' ? digit : this.display.value + digit;
    this.scrollInputToEnd();
    this.checkValidity(this);
  }

  /**
   * Устанавливает оператор на экране калькулятора.
   * @param {string} operator - Устанавливаемый оператор.
   */
  setOperator(operator) {
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
      if (operator === '+-') {
        const numberOrExpressionRegex =
          /([\+\*%/\-])([\(\)\^\w]+)$|([\(\)\^\w]+)$/;
        const newExpression = this.display.value.replace(
          numberOrExpressionRegex,
          (match, $1, $2, $3) => {
            console.log(match, $1, $2, $3);
            if ($2) {
              if ($1 === '-') {
                if (
                  match.length === this.display.value.length ||
                  ['*', '/', '%', '+', '-'].includes(
                    this.display.value[
                      this.display.value.length - match.length - 1
                    ]
                  )
                )
                  return $2[0] === '(' && $2[$2.length - 1] === ')'
                    ? `${$2.slice(1, -1)}`
                    : `${$2}`;
                return `+${$2}`;
              }
              if ($1 === '+') {
                return `-${$2}`;
              }

              return `${$1}-(${$2})`;
            }

            return `-${$3}`;
          }
        );

        this.display.value = newExpression;
      }
    }
    if (this.hasResult) {
      this.hasResult = false;
    }
    this.scrollInputToEnd();
    this.checkValidity(this);
  }

  /**
   * Устанавливает функцию на экране калькулятора.
   * @param {string} operator - Устанавливаемая функция.
   */
  setFunction(operator) {
    if (this.hasResult) {
      this.display.value = `${operator}(${this.display.value})`;
      this.hasResult = false;
    } else {
      this.display.value += `${operator}(`;
    }
    this.scrollInputToEnd();
    this.checkValidity(this);
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
        this.hasResult = true;
        this.checkValidity();
        return result;
      }
      this.display.value = parseFloat(result)
        .toFixed(5)
        .replace(/(\.0+|0+)$/, '');
      updateFontSize();
      this.hasResult = true;
      this.checkValidity();
      return result;
    } catch (error) {
      updateFontSize();
    }
  }

  /**
   * Добавляет открывающую скобку на экране калькулятора.
   */
  openParenthesis() {
    if (this.hasResult) {
      this.clear();
      this.hasResult = false;
    }
    this.display.value += '(';
    this.scrollInputToEnd();
    this.checkValidity(this);
  }

  /**
   * Добавляет закрывающую скобку на экране калькулятора.
   */
  closeParenthesis() {
    if (this.hasResult) {
      this.clear();
      this.hasResult = false;
    }
    this.display.value += ')';
    this.scrollInputToEnd();
    this.checkValidity(this);
  }

  /**
   * Очищает экран калькулятора.
   */
  clear() {
    this.hasResult = false;
    this.display.value = '';
    this.operator = '';
    this.display.classList.remove('calculator__screen_right-expr');
    this.display.classList.remove('calculator__screen_wrong-expr');
  }

  /**
   * Выполняет операцию "назад" (удаляет символ справа) на экране калькулятора.
   */
  leftBackspace() {
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

  checkValidity() {
    try {
      const rpnExpression = infixToRPN(this.display.value);
      calculateRPN(rpnExpression);
      this.display.classList.add('calculator__screen_right-expr');
      this.display.classList.remove('calculator__screen_wrong-expr');
    } catch (error) {
      this.display.classList.add('calculator__screen_wrong-expr');
      this.display.classList.remove('calculator__screen_right-expr');
    }
  }
}

export const calculator = new Calculator();
