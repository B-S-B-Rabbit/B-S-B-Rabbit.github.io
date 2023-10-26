const alghoritm = {
  infixToRPN(expression) {
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
  },
  calculateRPN(rpn) {
    const stack = [];

    rpn.forEach((token) => {
      if (!Number.isNaN(Number(token))) {
        stack.push(parseFloat(token));
      } else if (token in operatorsBinary) {
        if (stack.length < 2) {
          throw new Error(
            `Insufficient operands for binary operation: ${token}`
          );
        }
        const operand2 = stack.pop();
        const operand1 = stack.pop();
        const result = operatorsBinary[token](operand1, operand2);
        stack.push(result);
      } else if (token in operatorsUnary) {
        if (stack.length < 1) {
          throw new Error(
            `Insufficient operands for unary operation: ${token}`
          );
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
  },
};

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

export const { infixToRPN } = alghoritm;
export const { calculateRPN } = alghoritm;
