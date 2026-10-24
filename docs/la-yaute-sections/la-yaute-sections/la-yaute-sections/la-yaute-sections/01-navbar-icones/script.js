// Ouverture du menu mobile et mise à jour des indications d'accessibilité.
const bouton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu');
function afficherMenu(ouvert) {
  menu.classList.toggle('is-open', ouvert);
  bouton.setAttribute('aria-expanded', String(ouvert));
  bouton.querySelector('.menu-label').textContent = ouvert ? 'FERMER' : 'MENU';
  bouton.querySelector('.menu-symbol').textContent = ouvert ? '×' : '☰';
}
bouton.addEventListener('click', () => afficherMenu(bouton.getAttribute('aria-expanded') !== 'true'));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && bouton.getAttribute('aria-expanded') === 'true') { afficherMenu(false); bouton.focus(); }
});
document.addEventListener('click', (event) => { if (!event.target.closest('.navigation')) afficherMenu(false); });
matchMedia('(min-width: 900px)').addEventListener('change', () => afficherMenu(false));
