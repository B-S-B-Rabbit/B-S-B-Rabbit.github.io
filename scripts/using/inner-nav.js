/**
 * Устанавливает стили элементов при клике и плавно прокручивает к целевому элементу.
 * @function
 * @listens click
 * @param {MouseEvent} event - Объект события "click".
 */
export function setInnerNavShiftingStyling() {
  const menuItems = document.querySelectorAll('.inner-nav__item');

  /**
   * Устанавливает стили элемента при клике.
   * @function
   * @param {HTMLElement} element - HTML-элемент.
   */
  function setStylesOnClick(element) {
    element.style.transition = 'color 1s';
    element.style.color = 'red';
  }

  /**
   * Сбрасывает стили элемента.
   * @function
   * @param {HTMLElement} element - HTML-элемент.
   */
  function resetStyles(element) {
    element.style.color = 'white';
  }

  /**
   * Плавно прокручивает к указанному элементу.
   * @function
   * @param {string} target - CSS-класс целевого элемента.
   */
  function scrollToElement(target) {
    const targetElement = document.querySelector(`.${target}`);
    targetElement.scrollIntoView({ behavior: 'smooth' });
  }

  menuItems.forEach((item) => {
    item.addEventListener('click', () => {
      setStylesOnClick(item);
      const target = item.getAttribute('data-target');
      scrollToElement(target);
      setTimeout(() => resetStyles(item), 1000);
    });
  });
}
