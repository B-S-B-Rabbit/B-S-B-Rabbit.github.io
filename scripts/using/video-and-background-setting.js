const video = document.querySelector('.video-using');
export function playPause() {
  if (video.paused) video.play();
  else video.pause();
}

const mobilePage = document.querySelector('.page_mobile-back');
const windowWidth = window.innerWidth;
export function setPreloaderVideoBackround() {
  if (windowWidth > 650) {
    video.innerHTML = "<source src='../videos/desk_calc.mp4' type='video/mp4'>";
    mobilePage.classList.add('background-parallax');
  } else {
    video.innerHTML = "<source src='../videos/mob_calc.mp4' type='video/mp4'>";
  }

  const background = document.querySelector('.background-parallax');

  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    background.style.backgroundPosition = `50% ${scrollPosition * 0.5}px`;
  });

  const loader = document.querySelector('.loader');
  video.addEventListener('canplaythrough', () => {
    loader.style.display = 'none';
  });
}
