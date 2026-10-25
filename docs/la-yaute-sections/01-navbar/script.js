// Ouverture du menu mobile et mise à jour des indications d'accessibilité.
const bouton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu');
function afficherMenu(ouvert) {
  menu.classList.toggle('is-open', ouvert);
  bouton.setAttribute('aria-expanded', String(ouvert));
  bouton.querySelector('.menu-label').textContent = ouvert ? 'FERMER' : 'MENU';
  // Le SCSS anime les trois barres grâce à aria-expanded, sans modifier le HTML.
}
bouton.addEventListener('click', () => afficherMenu(bouton.getAttribute('aria-expanded') !== 'true'));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && bouton.getAttribute('aria-expanded') === 'true') { afficherMenu(false); bouton.focus(); }
});
document.addEventListener('click', (event) => { if (!event.target.closest('.navigation')) afficherMenu(false); });
matchMedia('(min-width: 56.25rem)').addEventListener('change', () => afficherMenu(false));
