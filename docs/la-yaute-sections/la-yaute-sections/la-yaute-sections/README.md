# La Yaute — 8 parties indépendantes

Ouvrir index.html pour choisir une partie et son aperçu mobile ou laptop.
Ce catalogue ne contient pas une page complète assemblée.

## Contenu de chaque dossier

- index.html : une seule partie, avec un HTML sémantique et lisible.
- style.scss : styles commentés, mobile par défaut, laptop dès 900 px.
- style.css : CSS compilé, fourni pour ouvrir le HTML immédiatement.
- script.js : interactions utiles uniquement ; commentaire explicatif pour les blocs statiques.
- mobile.html : aperçu isolé à 390 px.
- laptop.html : aperçu isolé à 1440 px (défilement horizontal si nécessaire).

Les deux aperçus utilisent le même bloc responsive : une modification du bloc met les deux versions à jour. Leur cadre et leurs liens ne font pas partie du site à intégrer. Pour examiner la navigation mobile ouverte, cliquer sur MENU. Pour tester les largeurs intermédiaires, ouvrir index.html du bloc et redimensionner la fenêtre.

## Modifier les styles

Le navigateur lit style.css, pas style.scss. Après modification d'un SCSS, compiler avec Dart Sass :

    sass 03-presentation/style.scss 03-presentation/style.css --no-source-map

Ou surveiller le dossier pendant le développement :

    sass --watch 03-presentation/style.scss:03-presentation/style.css

Pas de framework, pas de dépendance JavaScript, pas de compilation HTML/JS.
Le CSS fourni permet de consulter le résultat sans installer Sass.

## Intégration dans votre futur site

1. Copier le bloc entre les commentaires Début et Fin dans votre page.
2. Reprendre son SCSS et les images nécessaires du dossier assets.
3. Adapter les chemins ../assets à la structure de votre projet.
4. Reprendre le JS des blocs interactifs (navigation et pied de page).
5. Remplacer les liens entre dossiers par les ancres de vos sections lorsque vous les assemblez.

Chaque SCSS est autonome et répète un petit socle (couleurs, typographie, réinitialisation). Lors de l'assemblage, conserver ce socle une seule fois et regrouper les styles de chaque bloc. Adapter également les h1 en h2 pour les sections secondaires. Les fichiers d'aperçu ne sont pas à intégrer.

## Choix et éléments à finaliser

- Réalisation à partir des 16 maquettes séparées et des visuels fournis.
- Typographies locales Georgia et Arial : aucune police spécifique n'était fournie ; le rendu typographique peut différer des maquettes.
- Les textes sont conservés dans un seul HTML responsive, sans duplication mobile/laptop.
- Les photos et SVG sont copiés dans assets ; les fichiers sources du dossier Téléchargements ne sont pas modifiés.
- Les coordonnées du pied de page sont reprises de la maquette, à vérifier avant publication.
- Les textes légaux ne sont pas fournis : les boutons affichent une fenêtre indiquant qu'ils sont à compléter.
- Les photos de la galerie restent des illustrations statiques, comme sur la maquette.

## Aperçu via serveur local (facultatif)

Un simple serveur statique suffit. Les fichiers peuvent aussi être ouverts directement ; si votre navigateur isole les fichiers locaux, les cadres prennent une hauteur de secours. Le lien « Bloc responsive » reste utilisable.

## Variante de la navbar avec icônes

Le dossier 01-navbar-icones contient une seconde navigation autonome, avec ses propres HTML, SCSS, JS et aperçus mobile/laptop. Choisir l'une des deux navbars lors de l'intégration.

Les six icônes sont intégrées directement dans le HTML sous forme de balises svg. Elles héritent de la couleur du lien avec currentColor, y compris au survol et au focus clavier. Elles sont décoratives (aria-hidden et focusable=false), car chaque lien possède déjà un texte. Les SVG et leurs notices proviennent des fichiers fournis. Le logo reste une image externe pour conserver son fichier multicolore réutilisable.
