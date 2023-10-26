const alghoritm = require('../scripts/calculator/algorithm');

const { infixToRPN, calculateRPN } = alghoritm;

describe('calculateRPN', () => {
  test('Вычисление RPN выражения с унарным оператором', () => {
    const expression = 'sqrt(9)+ln(10)-3!';
    const rpnExpression = infixToRPN(expression);
    const result = calculateRPN(rpnExpression);
    expect(result).toBeCloseTo(-0.69741, 5);
  });

  test('Вычисление RPN выражения с Pi', () => {
    const expression = '2*π';
    const rpnExpression = infixToRPN(expression);
    const result = calculateRPN(rpnExpression);
    expect(result).toBeCloseTo(6.28318, 5);
  });

  test('Вычисление RPN выражения с отрицательным числом', () => {
    const expression = '2-(-3)';
    const rpnExpression = infixToRPN(expression);
    const result = calculateRPN(rpnExpression);
    expect(result).toBe(5);
  });

  test('Вычисление RPN выражения с кучей скобок', () => {
    const expression = '2*(3+4/(2-1))';
    const rpnExpression = infixToRPN(expression);
    const result = calculateRPN(rpnExpression);
    expect(result).toBe(14);
  });

  test('Вычисление RPN выражения с высоким приоритетом оператора', () => {
    const expression = '2^3+5';
    const rpnExpression = infixToRPN(expression);
    const result = calculateRPN(rpnExpression);
    expect(result).toBe(13);
  });

  test('Вычисление RPN выражения с операторами вида "2! + 3!"', () => {
    const expression = '2!+3!';
    const rpnExpression = infixToRPN(expression);
    const result = calculateRPN(rpnExpression);
    expect(result).toBe(8);
  });

  test('Вычисление RPN выражения с модулем', () => {
    const expression = '7%3';
    const rpnExpression = infixToRPN(expression);
    const result = calculateRPN(rpnExpression);
    expect(result).toBe(1);
  });

  test('Вычисление RPN выражения с граничными значениями', () => {
    const expression = '1^1+3*(5-4)';
    const rpnExpression = infixToRPN(expression);
    const result = calculateRPN(rpnExpression);
    expect(result).toBe(4);
  });

  test('Вычисление RPN выражения с разными функциями', () => {
    const expression = 'sqrt(16)+lg(100)-ln(1)^2';
    const rpnExpression = infixToRPN(expression);
    const result = calculateRPN(rpnExpression);
    expect(result).toBe(6);
  });

  test('Проверка наличия ошибки при некорректном выражении', () => {
    const expression = '2+3+';
    expect(() => calculateRPN(infixToRPN(expression))).toThrow(Error);
  });

  test('Проверка наличия ошибки при использовании неизвестного оператора', () => {
    const expression = '2&3';
    expect(() => calculateRPN(infixToRPN(expression))).toThrow(Error);
  });

  test('Проверка наличия ошибки при некорректном RPN выражении', () => {
    const rpnExpression = ['2', '2', '+', '+'];
    expect(() => calculateRPN(rpnExpression)).toThrow(Error);
  });

  test('Проверка наличия ошибки при неверном количестве операндов для бинарной операции', () => {
    const rpnExpression = ['2', '+'];
    expect(() => calculateRPN(rpnExpression)).toThrow(Error);
  });

  test('Проверка наличия ошибки при неверном количестве операндов для унарной операции', () => {
    const rpnExpression = ['sqrt'];
    expect(() => calculateRPN(rpnExpression)).toThrow(Error);
  });

  test('Вычисление RPN выражения с большим количеством операторов', () => {
    const expression = '2+3*4-5/6^2^3';
    const rpnExpression = infixToRPN(expression);
    const result = calculateRPN(rpnExpression);
    expect(result).toBeCloseTo(13.99989, 5);
  });

  test('Вычисление RPN выражения с операторами вида "5! + 2! - 3!"', () => {
    const expression = '5!+2!-3!';
    const rpnExpression = infixToRPN(expression);
    const result = calculateRPN(rpnExpression);
    expect(result).toBe(116);
  });

  test('Вычисление RPN выражения с Pi внутри функций', () => {
    const expression = 'sqrt(π)*lg(π)-ln(π)^2';
    const rpnExpression = infixToRPN(expression);
    const result = calculateRPN(rpnExpression);
    expect(result).toBeCloseTo(-0.42923, 5);
  });

  test('Вычисление RPN выражения с отрицательным числом', () => {
    const expression = '-2+3*-4/-5^2^3';
    const rpnExpression = infixToRPN(expression);
    const result = calculateRPN(rpnExpression);
    expect(result).toBeCloseTo(-2.000768, 5);
  });
});
