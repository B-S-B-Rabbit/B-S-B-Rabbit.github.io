const alghoritm = require('../scripts/calculator/algorithm');

const { infixToRPN, calculateRPN } = alghoritm;
describe('Тестирование логики внутренних вычислений калькулятора c десятичным результатом', () => {
  const testCases = [
    {
      inString: 'sqrt(9)+ln(10)-3!',
      expected: -0.69741,
    },
    {
      inString: '2*π',
      expected: 6.28318,
    },
    {
      inString: '2+(2+(2+(2+(3*6-1*(2+sqrt(7-5))*8^2-5)*2)/4)+π)',
      expected: -93.11324,
    },
    {
      inString: 'sqrt(π)*lg(π)-ln(π)^2',
      expected: -0.42923,
    },
    {
      inString: '-2+3*-4/-5^2^3',
      expected: -2.000768,
    },
  ];
  testCases.forEach((test) => {
    it(`На вход: ${test.inString}. Ожидается: ${test.expected}`, () => {
      const res = calculateRPN(infixToRPN(test.inString));
      expect(res).toBeCloseTo(test.expected, 5);
    });
  });
});
describe('Тестирование логики внутренних вычислений калькулятора c целым результатом', () => {
  const testCases = [
    {
      inString: '-3+-3',
      expected: -6,
    },
    {
      inString: '2-(-3)',
      expected: 5,
    },
    {
      inString: 'sqrt(2^((4 - lg(10))!-lg(100)!))',
      expected: 4,
    },
    {
      inString: '2!+3!+4!+5!+6!+7!-8!-9!+10!',
      expected: 3231512,
    },
    {
      inString: '0-0+0+0-1+1*0*1/1^0!',
      expected: -1,
    },
    {
      inString: 'sqrt(16)+lg(100)-ln(1)^2',
      expected: 6,
    },
    {
      inString: '3!!',
      expected: 720,
    },
    {
      inString: '2^(3^4)',
      expected: 2.4178516392292583e24,
    },
  ];
  testCases.forEach((test) => {
    it(`На вход: ${test.inString}. Ожидается: ${test.expected}`, () => {
      const res = calculateRPN(infixToRPN(test.inString));
      expect(res).toBe(test.expected);
    });
  });
});
describe('Тестирование логики внутренних вычислений калькулятора c ошибкой', () => {
  const testCases = [
    {
      inString: '2+3+',
    },
    {
      inString: '2&3',
    },
    {
      inString: 'sqrt',
    },
    {
      inString: '22++',
    },
    {
      inString: '2+',
    },
  ];
  testCases.forEach((test) => {
    it(`На вход: ${test.inString}. Ожидается: Error`, () => {
      expect(() => calculateRPN(infixToRPN(test.inString))).toThrow(Error);
    });
  });
});
