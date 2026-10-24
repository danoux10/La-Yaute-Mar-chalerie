const button = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu');

function toggleMenu(open) {
  menu.classList.toggle('is-open', open);
  button.setAttribute('aria-expanded', String(open));
  button.querySelector('.menu-label').textContent = open ? 'FERMER' : 'MENU';
  // The SCSS animates the three bars into a cross using aria-expanded, without modifying the HTML.
}

button.addEventListener('click', () => toggleMenu(button.getAttribute('aria-expanded') !== 'true'));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
    toggleMenu(false);
    button.focus();
  }
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.navigation')) toggleMenu(false);
});

matchMedia('(min-width: 900px)').addEventListener('change', () => toggleMenu(false));