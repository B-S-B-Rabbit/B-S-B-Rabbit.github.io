/**
 * Модуль для предотвращения двойного масштабирования при касании.
 * @module page-functionality
 */

/**
 * Предотвращает двойное масштабирование при касании на странице.
 * @function
 * @listens touchstart
 * @param {TouchEvent} event - Объект события "touchstart".
 */
export function preventDoubleTouchZoom() {
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
}

/**
 * Перемещает калькулятор в область видимости с плавной прокруткой.
 * @function
 * @listens DOMContentLoaded
 */
export function moveToCalc() {
  document.addEventListener('DOMContentLoaded', () => {
    /**
     * Находит элемент калькулятора.
     * @type {Element}
     */
    const calc = document.querySelector('.calculator');

    calc.scrollIntoView({ behavior: 'smooth' });
  });
}
