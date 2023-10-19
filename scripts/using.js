const myVideo = document.querySelector('.video-using');
function playPause() {
  if (myVideo.paused) myVideo.play();
  else myVideo.pause();
}
const questions = document.querySelectorAll('.FAQ__question');

questions.forEach((question) => {
  const answer = question.querySelector('.FAQ__answer');
  const questionTitle = question.querySelector('.FAQ__q-head');

  questionTitle.addEventListener('click', () => {
    if (answer.style.maxHeight) {
      answer.style.maxHeight = null;
    } else {
      answer.style.maxHeight = `${answer.scrollHeight}px`;
    }
  });
});

// Ссылки на элементы меню
const menuItems = document.querySelectorAll('.inner-nav__item');

// Функция для установки стилей при нажатии
function setStylesOnClick(element) {
  element.style.transition = 'color 1s';
  element.style.color = 'red';
}

// Функция для снятия стилей после задержки
function resetStyles(element) {
  element.style.color = 'white';
}

// Функция для прокрутки к соответствующим элементам
function scrollToElement(target) {
  const targetElement = document.querySelector(`.${target}`);
  targetElement.scrollIntoView({ behavior: 'smooth' });
}

// Добавляем обработчики событий для каждой ссылки
menuItems.forEach((item) => {
  item.addEventListener('click', () => {
    setStylesOnClick(item);
    const target = item.getAttribute('data-target');
    scrollToElement(target);
    setTimeout(() => resetStyles(item), 1000);
  });
});

const headerHeight = document.querySelector('.header').offsetHeight;
const screenWidth = window.screen.width;
const navbar = document.querySelector('.small-hor-sidebar');
const initialTop = headerHeight;
const scrollThreshold = 50; // Пороговое значение для начала возврата сайдбара
function adjustSidebar() {}
if (screenWidth > 650) {
  navbar.style.top = `${initialTop}px`;
  let lastScrollTop = 0;
  let isScrollingUp = false;

  window.addEventListener('scroll', () => {
    const st = window.pageYOffset || document.documentElement.scrollTop;

    if (st > lastScrollTop) {
      // Прокрутка вниз
      isScrollingUp = false;
      navbar.style.transition = 'top 0.3s, left 0.6s';
      navbar.style.top = `${Math.max(initialTop - st, 0)}px`;
    } else if (st < initialTop) {
      // Прокрутка вверх
      isScrollingUp = true;
      navbar.style.transition = 'top 0.3s, left 0.6s';
      navbar.style.top = `${initialTop}px`;
    } else if (isScrollingUp) {
      navbar.style.transition = 'none';
      navbar.style.top = `${Math.max(initialTop - st, 0)}px`;
    }

    lastScrollTop = st;
  });
}
const video = document.querySelector('.video-using');
const mobilePage = document.querySelector('.page_mobile-back');
const windowWidth = window.innerWidth;

if (windowWidth > 650) {
  video.innerHTML = "<source src='videos/desk_calc.mp4' type='video/mp4'>";
  mobilePage.classList.add('background-parallax');
} else {
  video.innerHTML = "<source src='videos/mob_calc.mp4' type='video/mp4'>";
}

const background = document.querySelector('.background-parallax');

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;

  background.style.backgroundPosition = `50% ${scrollPosition * 0.5}px`;
});
const loader = document.querySelector('.loader');
window.addEventListener('load', () => {
  loader.style.display = 'none';
});
