// Ajuster la hauteur de l'aperçu au contenu du bloc, sans réduire sa largeur.
const cadre = document.querySelector('iframe');
cadre.addEventListener('load', () => {
  try {
    const page = cadre.contentDocument;
    const ajuster = () => {
      // Le menu est positionné hors du flux : inclure sa hauteur lorsqu'il est ouvert.
      const menu = page.querySelector('nav.is-open');
      const hauteur = Math.max(page.body.getBoundingClientRect().bottom, menu?.getBoundingClientRect().bottom || 0);
      cadre.style.height = Math.ceil(hauteur + 32) + 'px';
    };
    new ResizeObserver(ajuster).observe(page.body);
    new MutationObserver(ajuster).observe(page.body, { subtree: true, attributes: true, attributeFilter: ['class'] });
    ajuster();
  } catch {
    // Certains navigateurs isolent les fichiers locaux : prévoir assez de hauteur.
    cadre.style.height = '1300px';
  }
});
