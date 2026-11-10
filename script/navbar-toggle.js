// Tous les éléments sont recherchés dans le header de navigation.
const bouton = document.querySelector('header .menu-toggle');
const header = bouton.closest('header');
const menu = header.querySelector('#menu');

function menuToggle(ouvert) {
  menu.classList.toggle('is-open', ouvert);
  bouton.setAttribute('aria-expanded', String(ouvert));
  bouton.querySelector('.menu-label').textContent = ouvert ? 'FERMER' : 'MENU';
  // Les trois .toggle-bar restent dans le HTML : le SCSS anime leur rotation.
}

bouton.addEventListener('click', () => {
  menuToggle(bouton.getAttribute('aria-expanded') !== 'true');
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && bouton.getAttribute('aria-expanded') === 'true') {
    menuToggle(false);
    bouton.focus();
  }
});

// Fermer en cliquant à l'extérieur du header ou sur un lien du menu.
document.addEventListener('click', (event) => {
  if (!header.contains(event.target)) menuToggle(false);
});
menu.querySelectorAll('.navbar-link').forEach((lien) => {
  lien.addEventListener('click', () => menuToggle(false));
});

// Revenir à l'état fermé quand la présentation change.
matchMedia('(min-width: 1024px)').addEventListener('change', () => menuToggle(false));
