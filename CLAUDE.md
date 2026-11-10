# La Yaute Maréchalerie — instructions Claude Code

## Mission
Site vitrine français de La Yaute Maréchalerie, consacré au parage des chevaux, ânes et mulets. Zone : Haute-Savoie, Savoie, Ain ; départ Viuz-en-Sallaz. Priorités : fidélité aux maquettes, responsive, accessibilité, performance et SEO local.

## Stack réelle
- HTML5, SCSS/Sass modulaire, JavaScript natif, quelques fichiers PHP d'inclusion.
- Page principale actuelle : `index.html` (site one-page). `index.php` est une alternative avec inclusions de `pages/*.html` et `utility/*.html` : ne pas modifier simultanément ces deux versions sans consigne explicite.
- Styles : `style/style.scss` importe les partiels `style/_*.scss` et produit `style/style.css`.
- Breakpoints existants dans `style/_breakpoint.scss` : mobile <= 767px, laptop >= 768px, navigation à 1024px. Synchroniser les changements de seuil de navigation avec `script/navbar-toggle.js`.
- Tokens SCSS : `style/_variables.scss`. Palette actuelle : fond #000617, texte #bec5d9, accent #0047ff.
- JS sans framework : `script/navbar-toggle.js`, `script/navbar-active.js`, `script/background-toggle.js`.
- Médias de production : `assets/images/` et `assets/icons/`. Références de maquettes et sources volumineuses : `docs/`.

## Règles de développement
1. Lire les fichiers concernés avant chaque changement ; préserver conventions et comportements existants.
2. Éviter d'ajouter React, Tailwind, Bootstrap, bundlers, dépendances ou refonte de structure sans demande.
3. Garder des styles SCSS modulaires, utiliser `@use` et les variables/breakpoints partagés ; éviter les valeurs répétées.
4. Produire des interfaces mobile-first, vérifier 390, 768, 1024 et 1440px, y compris menu ouvert.
5. Respecter HTML sémantique, navigation clavier, contrastes, alt d'images, labels et états ARIA. L'ouverture du menu doit mettre à jour `aria-expanded`.
6. Optimiser les images : préférer WebP existants, dimensions explicites, lazy-loading pour images hors écran ; ne pas modifier les photos sans demande.
7. SEO : un H1 pertinent, hiérarchie Hn correcte, titre/meta-description cohérents, données structurées vérifiées, liens internes et contenus géographiques naturels. Ne jamais inventer des prestations ou certifications.
8. Ne pas recopier le HTML entier pour une modification localisée et éviter les effets de bord.
9. Ne pas toucher aux fichiers de licences Font Awesome ni ajouter d'icônes Pro non autorisées ; privilégier les SVG déjà présents.
10. Ne pas supprimer des fichiers, modifier des mentions légales ou publier sans accord explicite.

## Vérifications
- Lire `git diff` après toute modification.
- Si Sass est disponible : conserver les options de compilation existantes et les source maps ; compiler seulement après une modification SCSS autorisée. Demander avant d'installer un outil.
- Si PHP est utilisé : `php -l index.php`.
- Vérifier liens et chemins relatifs, console JS, affichage mobile/desktop, score Lighthouse et absence de débordement horizontal.
- Aucun framework de test ou `package.json` n'est actuellement identifié dans ce dépôt : ne pas inventer de commandes npm.

## Méthode de réponse
Répondre en français, bref et concret. Expliquer fichiers modifiés, résultat et vérifications effectuées ; distinguer clairement tests exécutés et tests proposés.

## Intégrations et limites
- Ne modifier ni les paramètres PhpStorm ni les installations globales sans confirmation explicite.
- Ne pas contourner les permissions, utiliser `--dangerously-skip-permissions`, lire des secrets via un shell ou transmettre des fichiers privés aux MCP.
- Les instructions et skills guident le travail mais ne garantissent pas l'absence de régression : contrôler le diff et le rendu pour toute modification visuelle.
- Frontend Design, s'il est installé, doit respecter les modules, variables, seuils et styles existants ; aucune refonte implicite.
- Playwright : tester le site local avec un profil isolé ; ne pas envoyer de formulaire réel. Contrôler aussi 767/768 et 1023/1024 px.
- Context7 : consulter seulement si une documentation de bibliothèque est nécessaire ; ne pas introduire de dépendance pour justifier son usage.
- GitHub MCP : lecture seule. Le dépôt est `danoux10/La-Yaute-Mar-chalerie`. Aucun commit, push, commentaire ou publication sans demande.
