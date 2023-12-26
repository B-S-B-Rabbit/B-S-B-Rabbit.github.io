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
import translate from 'translate';
import { updateFontSize } from './calculator-functionality';

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

const owner = 'B-S-B-Rabbit';
const repo = 'B-S-B-Rabbit.github.io';

const apiUrl = `https://api.github.com/repos/${owner}/${repo}/commits?per_page=10`;
export function getLastUpdates() {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const lastCommits = data.map((commit) => ({
        sha: commit.sha,
        message: commit.commit.message,
      }));

      const updatesList = document.getElementsByClassName(
        'project-updates__item'
      );
      lastCommits.forEach((commit, ind) => {
        (async function translated() {
          return translate(commit.message, 'ru');
        })().then((result) => {
          updatesList[ind].textContent = result;
        });
      });
    })
    .catch((error) => console.error('Ошибка при получении данных:', error));
}
export function showListItem() {
  let count = 0;
  const listItems = document.querySelectorAll('.project-updates__item');

  listItems.forEach((el) => {
    if (window.innerWidth <= 650) {
      if (
        el.getBoundingClientRect().y + el.getBoundingClientRect().height <=
          window.innerHeight &&
        el.style.left == ''
      ) {
        setTimeout(() => {
          el.style.left = 0;
          el.classList.add('animated-text');
        }, 200 * count++);
      }
    } else {
      el.style.left = 0;
    }
  });

  window.addEventListener('scroll', showListItem);
  window.addEventListener('DOMContentLoaded', showListItem);
}
