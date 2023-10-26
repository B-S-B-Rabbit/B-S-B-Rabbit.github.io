/**
 * Модуль для работы с обратной польской нотацией (RPN).
 * @module alghoritm
 */

const alghoritm = {
  /**
   * Преобразует инфиксное выражение в обратную польскую нотацию (RPN).
   * @param {string} expression - Входное инфиксное выражение.
   * @returns {string[]} Массив токенов в RPN.
   * @throws {Error} Выбрасывает ошибку, если выражение некорректное.
   */
  infixToRPN(expression) {
    /**
     * Объект, определяющий приоритеты операторов и функций в выражении.
     * Чем выше значение, тем выше приоритет.
     *
     * @type {Object.<string, number>}
     */
    const precedence = {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2,
      '%': 2,
      sqrt: 4,
      lg: 4,
      ln: 4,
      '^': 4,
      '!': 4,
      n: 4,
    };
    /**
     * Проверяет, является ли заданный токен оператором.
     * @param {string} token - Токен, который необходимо проверить.
     * @returns {boolean} true, если токен является оператором; в противном случае - false.
     */
    const isOperator = (token) => token in precedence;
    /**
     * Преобразует массив токенов в инфиксной нотации в массив токенов в обратной польской нотации (RPN).
     * @param {string[]} tokens - Массив токенов в инфиксной нотации.
     * @returns {string[]} Массив токенов в RPN.
     * @throws {Error} Выбрасывает ошибку, если обнаружен некорректный символ в выражении.
     */
    function shuntingYard(tokens) {
      /**
       * Очередь для выходных токенов в алгоритме обратной польской нотации.
       * @type {string[]}
       */
      const outputQueue = [];
      /**
       * Стек операторов в алгоритме обратной польской нотации.
       * @type {string[]}
       */
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
    /**
     * Измененное выражение после первой модификации.
     * @type {string}
     */
    const modifiedExpression1 = expression.replace(
      /(^|[-+*/%^(]|\([-+*/%^(]*\))(-)(\(?\d+(\.\d*)?|\.\d+)/g,
      (_, p1, p2, p3) => (p2 == '-' ? `${p1}n${p3}` : p1 + p2 + p3)
    );
    /**
     * Измененное выражение после второй модификации с заменой π на число Pi.
     * @type {string}
     */
    const modifiedExpression2 = modifiedExpression1.replace(/(π)/g, () =>
      Math.PI.toFixed(5)
    );
    /**
     * Массив токенов из модифицированного выражения, готовый для обработки в алгоритме.
     * @type {string[]}
     */
    const tokensExp = modifiedExpression2.match(
      /(\d+(\.\d*)?|\.\d+|[+\-*/%^()!]|sqrt|PI|lg|ln|\^|n)/g
    );

    if (!tokensExp) {
      throw new Error(`Invalid expression ${tokensExp}`);
    }
    /**
     * Массив токенов в обратной польской нотации (RPN), полученный после обработки входных токенов.
     * @type {string[]}
     */
    const rpn = shuntingYard(tokensExp);
    return rpn;
  },
  /**
   * Вычисляет значение выражения, представленного в виде RPN.
   * @param {string[]} rpn - Массив токенов в RPN.
   * @returns {number} Результат вычисления выражения.
   * @throws {Error} Выбрасывает ошибку, если RPN выражение некорректное.
   */
  calculateRPN(rpn) {
    /**
     * Стек для выполнения операций в алгоритме вычисления RPN выражения.
     * @type {number[]}
     */
    const stack = [];
    debugger;
    rpn.forEach((token) => {
      if (!Number.isNaN(Number(token))) {
        stack.push(parseFloat(token));
      } else if (token in operatorsBinary) {
        if (stack.length < 2) {
          throw new Error(
            `Insufficient operands for binary operation: ${token}`
          );
        }
        /**
         * Второй операнд для бинарной операции.
         * @type {number}
         */
        const operand2 = stack.pop();
        /**
         * Первый операнд для бинарной операции.
         * @type {number}
         */
        const operand1 = stack.pop();
        /**
         * Результат выполнения бинарной операции.
         * @type {number}
         */
        const result = operatorsBinary[token](operand1, operand2);
        stack.push(result);
      } else if (token in operatorsUnary) {
        if (stack.length < 1) {
          throw new Error(
            `Insufficient operands for unary operation: ${token}`
          );
        }
        /**
         * Операнд для унарной операции.
         * @type {number}
         */
        const operand = stack.pop();
        /**
         * Результат выполнения унарной операции.
         * @type {number}
         */
        const result = operatorsUnary[token](operand);
        stack.push(result);
      } else {
        throw new Error(`Unknown operator: ${token}`);
      }
    });

    if (stack.length !== 1 || Number.isNaN(Number(stack[0]))) {
      throw new Error(`Invalid expression length${stack}`);
    }

    return stack[0];
  },
};
/**
 * Объект, представляющий бинарные операторы и соответствующие функции для их выполнения.
 * @type {Object.<string, Function>}
 */
const operatorsBinary = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
  '%': (a, b) => a % b,
  '^': (a, b) => a ** b,
};
/**
 * Объект, представляющий унарные операторы и соответствующие функции для их выполнения.
 * @type {Object.<string, Function>}
 */
const operatorsUnary = {
  sqrt: (a) => Math.sqrt(a),
  lg: (a) => Math.log10(a),
  ln: (a) => Math.log(a),
  n: (a) => -a,
  '!': (a) => factorial(a),
};
/**
 * Функция для вычисления факториала числа.
 * @param {number} n - Число, для которого нужно вычислить факториал.
 * @returns {number} Результат вычисления факториала числа.
 */
function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}

export const { infixToRPN } = alghoritm;
export const { calculateRPN } = alghoritm;
