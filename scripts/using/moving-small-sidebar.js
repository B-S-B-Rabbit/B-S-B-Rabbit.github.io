/**
 * Обрабатывает прокрутку страницы и анимирует плавное перемещение боковой панели.
 * @function
 * @listens scroll
 */
export function movingSmallSidebar() {
  const headerHeight = document.querySelector('.header').offsetHeight;
  const screenWidth = window.screen.width;
  const navbar = document.querySelector('.small-hor-sidebar');
  const initialTop = headerHeight;

  if (screenWidth > 650) {
    navbar.style.top = `${initialTop}px`;
    let lastScrollTop = 0;
    let isScrollingUp = false;

    window.addEventListener('scroll', () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;

      if (st > lastScrollTop) {
        isScrollingUp = false;
        navbar.style.transition = 'top 0.3s, left 0.6s';
        navbar.style.top = `${Math.max(initialTop - st, 0)}px`;
      } else if (st < initialTop) {
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
}
