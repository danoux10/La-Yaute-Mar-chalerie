(() => {
  const button = document.querySelector('.background-toggle');
  if (!button) return;

  const storageKey = 'la-yaute-background';
  const applyBackground = (gradient) => {
    document.documentElement.dataset.background = gradient ? 'gradient' : 'solid';
    button.setAttribute('aria-pressed', String(gradient));
    button.title = gradient ? 'Revenir au fond uni' : 'Activer le fond dégradé';
  };

  let saved = 'solid';
  try {
    saved = localStorage.getItem(storageKey);
  } catch {
    // Le bouton reste utilisable lorsque le stockage est désactivé.
  }
  applyBackground(saved === 'gradient');

  button.addEventListener('click', () => {
    const gradient = button.getAttribute('aria-pressed') !== 'true';
    applyBackground(gradient);
    try {
      localStorage.setItem(storageKey, gradient ? 'gradient' : 'solid');
    } catch {
      // La préférence reste active pour la page courante.
    }
  });
})();
