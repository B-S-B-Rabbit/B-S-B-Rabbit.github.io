const menuItems = document.querySelectorAll('.inner-nav__item');

function setStylesOnClick(element) {
  element.style.transition = 'color 1s';
  element.style.color = 'red';
}

function resetStyles(element) {
  element.style.color = 'white';
}

function scrollToElement(target) {
  const targetElement = document.querySelector(`.${target}`);
  targetElement.scrollIntoView({ behavior: 'smooth' });
}

export function setInnerNavShiftingStyling() {
  menuItems.forEach((item) => {
    item.addEventListener('click', () => {
      setStylesOnClick(item);
      const target = item.getAttribute('data-target');
      scrollToElement(target);
      setTimeout(() => resetStyles(item), 1000);
    });
  });
}
