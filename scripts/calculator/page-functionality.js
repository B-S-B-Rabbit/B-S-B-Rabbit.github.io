export function funtionality() {
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
}
