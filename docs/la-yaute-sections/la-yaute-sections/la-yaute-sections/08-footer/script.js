// Fenêtre d'attente pour les textes légaux qui ne figurent pas dans les maquettes.
const fenetre = document.querySelector('dialog');
document.querySelectorAll('[data-legal]').forEach((bouton) => {
  bouton.addEventListener('click', () => {
    document.querySelector('#legal-title').textContent = bouton.dataset.legal;
    fenetre.showModal();
  });
});
