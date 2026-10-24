// Tous les éléments sont recherchés dans le header de navigation.
const bouton = document.querySelector('header .menu-toggle');
const header = bouton.closest('header');
const menu = header.querySelector('#menu');

function afficherMenu(ouvert) {
  menu.classList.toggle('is-open', ouvert);
  bouton.setAttribute('aria-expanded', String(ouvert));
  bouton.querySelector('.menu-label').textContent = ouvert ? 'FERMER' : 'MENU';
  // Les trois .toggle-bar restent dans le HTML : le SCSS anime leur rotation.
}

bouton.addEventListener('click', () => {
  afficherMenu(bouton.getAttribute('aria-expanded') !== 'true');
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && bouton.getAttribute('aria-expanded') === 'true') {
    afficherMenu(false);
    bouton.focus();
  }
});

// Fermer en cliquant à l'extérieur du header ou sur un lien du menu.
document.addEventListener('click', (event) => {
  if (!header.contains(event.target)) afficherMenu(false);
});
menu.querySelectorAll('.navbar-link').forEach((lien) => {
  lien.addEventListener('click', () => afficherMenu(false));
});

// Revenir à l'état fermé quand la présentation change.
matchMedia('(min-width: 900px)').addEventListener('change', () => afficherMenu(false));
