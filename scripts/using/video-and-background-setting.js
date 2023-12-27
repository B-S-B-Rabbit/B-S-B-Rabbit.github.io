/**
 * Обрабатывает проигрывание и паузу видео при нажатии на кнопку.
 * @function
 * @fires HTMLMediaElement#play
 * @fires HTMLMediaElement#pause
 */
export function playPause() {
  const video = document.querySelector('.video-using');
  video.addEventListener('click', () =>
    video.paused ? video.play() : video.pause()
  );
}

/**
 * Настраивает видео и фон страницы в зависимости от ширины окна.
 * @function
 * @fires scroll
 */
export function setPreloaderVideoBackround() {
  const video = document.querySelector('.video-using');
  const mobilePage = document.querySelector('.page_mobile-back');
  const windowWidth = window.innerWidth;

  if (windowWidth > 650) {
    video.innerHTML = "<source src='../videos/desk_calc.mp4' type='video/mp4'>";
    mobilePage.classList.add('background-parallax');
  } else {
    video.innerHTML = "<source src='../videos/mob_calc.mp4' type='video/mp4'>";
  }
  if (window.innerWidth > 650) {
    const background = document.querySelector('.background-parallax');
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;

      background.style.backgroundPosition = `50% ${scrollPosition * 0.5}px`;
    });
  }
  const loader = document.querySelector('.loader');
  video.addEventListener('canplaythrough', () => {
    loader.style.display = 'none';
  });
}
