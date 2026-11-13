# Audit SEO — La Yaute Maréchalerie

- **Date** : 13/11/2026
- **Code local analysé** : branche `referencement` (commit `5193173`, arbre propre)
- **Version en ligne analysée** : https://danoux10.github.io/La-Yaute-Mar-chalerie/ (déployée depuis `origin/master`, commit `c652e76` du 10/11/2026 — HTML en ligne strictement identique à `origin/master:index.html`)
- **Périmètre** : SEO technique, sémantique, accessibilité, responsive, performances, images, SEO local (74 / 73 / 01), Schema.org, sitemap/robots, canonical/meta, indexation et migration de domaine.

> Aucun fichier du projet n'a été modifié. Seul ce rapport a été créé.

---

## 0. Mesures effectuées et limites

| Contrôle | Statut | Détail |
|---|---|---|
| Lecture du code local (`index.html`, `index.php`, `pages/`, `utility/`, `style/`, `script/`) | ✅ Réalisé | |
| Récupération HTTP du site en ligne (codes, tailles, en-têtes) | ✅ Réalisé | via `curl` |
| Comparaison local / en ligne | ✅ Réalisé | `diff` HTML + `git diff master` |
| Mesures navigateur (LCP, CLS, poids, images, débordement) | ✅ Partiel | Performance API dans le navigateur intégré, viewport 1024 px et 390 px, connexion non bridée |
| **Lighthouse / PageSpeed Insights** | ❌ Non réalisé | Pas d'outil Lighthouse disponible dans cette session. À lancer : https://pagespeed.web.dev/ |
| **Données terrain Core Web Vitals (CrUX)** | ❌ Indisponible | Trafic trop faible / domaine temporaire : aucune donnée réelle utilisateurs |
| **INP** | ❌ Non mesuré | Nécessite des interactions réelles ; le JS est très léger, risque faible |
| LCP mobile | ❌ Non capturé | L'observateur n'a rien remonté à 390 px (onglet en arrière-plan) |
| État d'indexation Google (`site:`) / Search Console | ❌ Non vérifié | Pas d'accès à Search Console ; recherche `site:` non fiable automatiquement |
| Validation Schema.org officielle | ❌ Non réalisé | Contrôle manuel uniquement. À passer dans https://validator.schema.org/ et https://search.google.com/test/rich-results |
| Contrastes WCAG détaillés, lecteur d'écran | ❌ Non réalisé | Seulement revue du code ARIA |

### Résultats chiffrés (version en ligne)

| Indicateur | 1024 px | 390 px |
|---|---|---|
| TTFB | 236 ms | — |
| DOMContentLoaded | 725 ms | — |
| LCP (labo, connexion rapide) | 1 144 ms — image hero WebP | non capturé |
| CLS | 0 | — |
| Débordement horizontal | Non | Non |
| Poids chargé au premier affichage | ≈ 783 Ko (dont ≈ 770 Ko d'images) | — |
| Poids total si on fait défiler | + PNG zone 1,26 Mo + JPG 367 Ko + 110 Ko | — |

Compression gzip active sur GitHub Pages (`style.css` : 46 Ko → 8 Ko transférés). Cache : `max-age=600` (non paramétrable sur GitHub Pages).

---

## 1. Écarts entre le code local et la version en ligne

| Élément | Local (`referencement`) | En ligne (`master`) | Conséquence |
|---|---|---|---|
| Image hero | `assets/images/hero_cindy_marechalerie.webp` (vraie photo) | `Hero · maréchalerie en action.webp` (image provisoire) | La nouvelle image renvoie **404** en ligne tant que la branche n'est pas fusionnée |
| `pages/mentions-legales.html` | 13,9 Ko, contenu avec champs `[Adresse]`, `[SIRET]`, `[Hébergeur]`… | **0 octet** (page blanche, HTTP 200) | Lien de pied de page vers une page vide |
| `pages/confidentialiter.html` | 17 Ko, champs `[Adresse e-mail]`… à compléter | **0 octet** (page blanche, HTTP 200) | Idem |
| Styles mentions légales | Ajoutés | Absents | — |
| `CLAUDE.md`, `.mcp.json`, `.claude/` | Présents | Absents | ✅ Ne seront publiés qu'au merge : à exclure du déploiement |
| SEO de `index.html` (title, meta, JSON-LD) | Identique | Identique | — |

Fichiers publiés inutilement en ligne (présents dans `master`) : `index.php` (servi en téléchargement brut, `application/x-httpd-php`), `.htaccess`, `.idea/`, `docs/` (maquettes, images IA), fragments `pages/banner.html`, `pages/galerie.html`… (vides), `utility/header.html` et `utility/footer.html` (fragments HTML sans `<head>`), `style/laptop.css`, `style/mobile.css`, fichiers `.map`, PNG lourds non utilisés.

---

## 2. Problèmes classés par priorité

### 🔴 Critique

#### C1 — Pages légales vides en ligne, incomplètes en local
- **Fichiers** : `pages/mentions-legales.html`, `pages/confidentialiter.html`
- **Problème** : en ligne, les deux pages renvoient un HTTP 200 avec un corps vide (contenu « mince » indexable, mauvais signal de confiance, et absence de mentions légales obligatoires pour un site professionnel — LCEN). En local, elles contiennent encore des champs à compléter (`[Adresse]`, `[SIRET]`, `[Hébergeur]`, `[Nom du médiateur]`, `[Nom et prénom]`…) qui ne doivent pas être publiés en l'état.
- **Correction** : compléter les champs avec les informations réelles fournies par l'entreprise (je ne les invente pas), puis déployer. Pour l'hébergement GitHub Pages : GitHub Inc., 88 Colin P. Kelly Jr. St, San Francisco, CA 94107, États-Unis (à remplacer par l'hébergeur définitif lors de la migration). En attendant : ne pas déployer de version à trous, ou ajouter temporairement `<meta name="robots" content="noindex">`. Les pages légales peuvent rester en `noindex, follow` même une fois complétées (pas d'intérêt SEO).

#### C2 — Stratégie d'indexation du domaine temporaire absente (risque de contenu dupliqué à la migration)
- **Fichiers** : `index.html` (`<head>`), configuration GitHub Pages
- **Problème** : le site `github.io` est indexable sans aucun garde-fou (pas de `canonical`, pas de `noindex`). Si Google l'indexe, le futur domaine démarrera en concurrence avec un double identique. **GitHub Pages ne permet pas de redirections 301 personnalisées** ; seule exception : si le domaine définitif est configuré *sur GitHub Pages* (fichier `CNAME`), GitHub redirige automatiquement `danoux10.github.io/La-Yaute-Mar-chalerie/` vers le domaine personnalisé.
- **Correction** (selon l'hébergement final) :
  - **Hébergement final = GitHub Pages + domaine personnalisé** : configurer le domaine dans *Settings → Pages* (crée `CNAME`), activer *Enforce HTTPS*. La redirection est automatique ; ajouter ensuite le canonical vers le domaine définitif.
  - **Hébergement final ailleurs (OVH, o2switch…, `index.php` le laisse penser)** : ajouter **dès maintenant** dans la version GitHub Pages
    ```html
    <meta name="robots" content="noindex, follow">
    ```
    et la retirer sur le site définitif. Au lancement, ajouter sur la version GitHub une balise canonical vers le nouveau domaine et, si possible, une page de redirection (`<meta http-equiv="refresh" content="0; url=https://domaine-definitif.fr/">`), puis désactiver GitHub Pages après quelques semaines.
  - Si le site est déjà indexé : vérifier dans Google (`site:danoux10.github.io`) — non vérifiable de mon côté.

#### C3 — Aucun `robots.txt` exploitable ni `sitemap.xml`
- **Fichiers** : à créer à la racine (`robots.txt`, `sitemap.xml`)
- **Problème** : les deux renvoient 404. De plus, sur un site de projet GitHub Pages, un `robots.txt` placé dans le dépôt est servi sous `/La-Yaute-Mar-chalerie/robots.txt`, **adresse ignorée par les robots** (seul `https://danoux10.github.io/robots.txt` compte, et il renvoie 404). Inutile donc d'en créer un pour le domaine temporaire.
- **Correction** : préparer les deux fichiers pour le **domaine définitif uniquement**, une fois l'URL connue (l'URL canonique conditionne leur contenu) :
  ```text
  # robots.txt
  User-agent: *
  Allow: /
  Sitemap: https://DOMAINE-DEFINITIF/sitemap.xml
  ```
  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url><loc>https://DOMAINE-DEFINITIF/</loc><lastmod>AAAA-MM-JJ</lastmod></url>
  </urlset>
  ```
  (Pages légales exclues si elles sont en `noindex`.) Déclarer ensuite le sitemap dans Google Search Console.

#### C4 — Nouvelle image hero non déployée (404 au merge partiel)
- **Fichier** : `index.html:175`, `assets/images/hero_cindy_marechalerie.webp`
- **Problème** : la version locale référence une image qui n'existe pas encore en ligne. Si `index.html` est publié sans l'image, l'élément LCP de la page sera cassé.
- **Correction** : déployer `index.html` et l'image ensemble (même merge vers `master`) et vérifier l'URL après publication.

### 🟠 Important

#### I1 — Hiérarchie des titres : H1 placé après un H2 et sans mot-clé métier
- **Fichier** : `index.html:130`, `:134`, `:188`
- **Problème** : le premier titre rencontré est un `<h2>` (« Parage de chevaux, ânes et mulets ») ; le `<h1>` arrive dans la section Présentation et ne contient que la marque (« La Yaute Maréchalerie »). Le titre visuel de la bannière est un `<p class="banner-title">`.
- **Correction** : transformer le titre de la bannière en H1 porteur de l'activité et de la zone, sans changer le rendu (garder les classes) :
  ```html
  <h1 class="banner-title">La Yaute <span class="accent">Maréchalerie</span>
    <span class="visually-hidden"> — parage de chevaux, ânes et mulets en Haute-Savoie, Savoie et Ain</span></h1>
  ```
  ou passer le `<h2 class="uppercase">Parage de chevaux, ânes et mulets</h2>` en H1 ; puis rétrograder le titre de la Présentation (`index.html:188`) en H2. Dans le pied de page, `<h3>Nous contacter</h3>` (`index.html:502`) peut devenir un `<h2>`.

#### I2 — Aucune balise canonical, Open Graph ni Twitter Card
- **Fichier** : `index.html` (`<head>`), pages légales
- **Problème** : pas de `<link rel="canonical">`, pas d'aperçu maîtrisé lors des partages (Instagram, Facebook, WhatsApp, SMS — canal clé pour une activité locale).
- **Correction** (à poser avec l'URL définitive, en URL absolues) :
  ```html
  <link rel="canonical" href="https://DOMAINE-DEFINITIF/">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="fr_FR">
  <meta property="og:site_name" content="La Yaute Maréchalerie">
  <meta property="og:title" content="Parage équin à Viuz-en-Sallaz (74) | La Yaute Maréchalerie">
  <meta property="og:description" content="Parage des chevaux, ânes et mulets en Haute-Savoie, Savoie et Ain. Déplacement compris, tarif sur devis.">
  <meta property="og:url" content="https://DOMAINE-DEFINITIF/">
  <meta property="og:image" content="https://DOMAINE-DEFINITIF/assets/images/og-la-yaute.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  ```
  Prévoir une image 1200×630 dédiée (JPG). Pas de canonical pointant vers `github.io`.

#### I3 — Données structurées Schema.org incomplètes
- **Fichier** : `index.html:17-27`
- **Problème** : le JSON-LD `LocalBusiness` ne contient ni `url`, ni `image`/`logo`, ni `address` (même partielle), ni `email`, ni `founder`. `areaServed` est en texte brut. Aucune valeur n'est fausse, mais Google ne peut pas rattacher l'entreprise à une localité.
- **Correction** (uniquement des informations déjà présentes sur le site ; ajouter `url`/`image` avec le domaine définitif ; ne pas ajouter horaires, avis, prix ou certifications non confirmés) :
  ```json
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://DOMAINE-DEFINITIF/#entreprise",
    "name": "La Yaute Maréchalerie",
    "description": "Parage des chevaux, ânes et mulets au départ de Viuz-en-Sallaz, en Haute-Savoie, Savoie et Ain.",
    "url": "https://DOMAINE-DEFINITIF/",
    "logo": "https://DOMAINE-DEFINITIF/assets/icons/la-yaute-marechalerie-logo-pro-noir.svg",
    "image": "https://DOMAINE-DEFINITIF/assets/images/hero_cindy_marechalerie.webp",
    "telephone": "+33637743380",
    "email": "piccot.cindy@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Viuz-en-Sallaz",
      "postalCode": "74250",
      "addressRegion": "Haute-Savoie",
      "addressCountry": "FR"
    },
    "areaServed": [
      {"@type": "AdministrativeArea", "name": "Haute-Savoie"},
      {"@type": "AdministrativeArea", "name": "Savoie"},
      {"@type": "AdministrativeArea", "name": "Ain"}
    ],
    "founder": {"@type": "Person", "name": "Cindy Piccot Ladrey", "jobTitle": "Maréchale-ferrante"},
    "priceRange": "Sur devis",
    "sameAs": ["https://www.instagram.com/la_yaute_marechalerie_74"]
  }
  ```
  Code postal 74250 à confirmer par l'entreprise ; pas d'adresse de rue si l'activité est itinérante sans local accueillant du public. Valider ensuite avec le Rich Results Test.

#### I4 — Image PNG de 1,26 Mo chargée alors que la version WebP existe
- **Fichier** : `index.html:426` (section Zone d'intervention)
- **Problème** : `Cheval · paysage alpin.png` (1 262 947 o) est chargé alors que `Cheval · paysage alpin.webp` (137 Ko) existe et est déjà utilisé ailleurs. C'est à lui seul plus que le poids de tout le reste de la page.
- **Correction** : remplacer `.png` par `.webp` dans le `src` (gain ≈ 1,1 Mo, image déjà en cache car utilisée dans la Présentation).

#### I5 — Aucune dimension explicite (`width`/`height`) sur les images
- **Fichier** : `index.html` — toutes les balises `<img>` (lignes 32, 132, 175, 183, 200, 210, 220, 273, 294, 301, 308, 405, 412, 426, 494, 495)
- **Problème** : CLS mesuré à 0 sur connexion rapide, mais risque de décalages de mise en page sur réseau mobile lent (Core Web Vitals).
- **Correction** : ajouter les dimensions intrinsèques, le CSS (`width:100%; height:auto` ou `object-fit`) continue de piloter l'affichage. Ex. : hero/panorama/parage 1174×880, cartes équidés 705×880, logo 1320×800 (dimensions relevées sur les fichiers en ligne ; à confirmer pour `hero_cindy_marechalerie.webp`, `01_cindy_au_travail.jpg`, `02_portrait_cindy.jpg`).

#### I6 — Image LCP non priorisée et cartes de présentation chargées d'emblée
- **Fichier** : `index.html:175`, `:200`, `:210`, `:220`
- **Problème** : l'image hero (élément LCP) n'a pas `fetchpriority="high"` ; les trois cartes de la Présentation (705×880 px affichées en ≈ 54×71 px sur desktop) sont chargées immédiatement (≈ 330 Ko) sans `loading="lazy"`.
- **Correction** : `fetchpriority="high"` sur l'image hero (ne pas la mettre en lazy) ; `loading="lazy"` + `decoding="async"` sur les cartes ; à terme, déclinaisons réduites (ex. 300 px) via `srcset`/`sizes`.

#### I7 — Photos JPG non converties en WebP
- **Fichiers** : `assets/images/01_cindy_au_travail.jpg` (367 Ko), `assets/images/02_portrait_cindy.jpg` (110 Ko) — `index.html:405`, `:412`, `:494`
- **Correction** : produire des versions WebP (avec l'accord explicite, conformément à la règle « ne pas modifier les photos sans demande ») et les servir via `<picture>` avec repli JPG.

#### I8 — Contenu de SEO local trop mince
- **Fichier** : `index.html` (sections Présentation, Prestations, Zone)
- **Problème** : ≈ 400 mots, une seule page ; la zone d'intervention se limite aux noms de trois départements. Peu de réponses aux recherches réelles (« parage âne Haute-Savoie », « pareur équin Chablais », « parage cheval Annemasse »…). Aucune FAQ, aucune explication de ce qu'est le parage, de sa fréquence, du déroulement d'un rendez-vous.
- **Correction** (contenus à valider par Cindy, sans inventer de prestations) :
  - paragraphe « Secteurs desservis » citant des vallées/villes réellement couvertes depuis Viuz-en-Sallaz (ex. Vallée Verte, Faucigny, Genevois, Chablais… **à confirmer**) ;
  - courte FAQ (fréquence de parage, préparation de l'animal, délais de rendez-vous, demande de devis) ;
  - texte alternatif du H2 Zone plus descriptif (« Parage à domicile en Haute-Savoie, Savoie et Ain ») ;
  - à moyen terme, envisager des pages dédiées (parage cheval / âne / mulet) seulement si le contenu le justifie.

#### I9 — Fiche Google Business Profile non reliée
- **Fichier** : `index.html` (JSON-LD `sameAs`, pied de page)
- **Problème** : pour une activité locale itinérante, la fiche Google (en « zone desservie », adresse masquée) est le premier levier de visibilité sur Maps. Aucun lien n'est présent.
- **Correction** : créer/valider la fiche (nom, catégorie, zones Haute-Savoie/Savoie/Ain, téléphone, site définitif), puis ajouter son URL dans `sameAs`. Garder un NAP strictement identique partout (nom « La Yaute Maréchalerie », téléphone `06 37 74 33 80`).

#### I10 — Fichiers techniques et fragments publiés sur GitHub Pages
- **Fichiers** : `index.php`, `.htaccess`, `.idea/`, `docs/`, `pages/banner.html`, `pages/galerie.html`, `pages/intervention.html`, `pages/presentation.html`, `pages/prestation.html`, `pages/propos.html`, `utility/header.html`, `utility/footer.html`, `style/laptop.css`, `style/mobile.css`, `*.map`, PNG non utilisés
- **Problème** : des URL vides ou partielles (fragments sans `<head>`) sont publiques et potentiellement indexables (pages minces/doublons) ; `index.php` est servi en téléchargement ; `docs/` publie des maquettes et images de travail. Note : `.gitignore` contient `/docs/` mais ces fichiers sont déjà suivis par Git, donc toujours publiés.
- **Correction** : publier uniquement le site final (par ex. branche ou dossier de publication dédié, ou workflow GitHub Actions qui copie `index.html`, `pages/` légales, `assets/` utiles, `style/style.css`, `script/`). Retirer de l'index Git `docs/` et `.idea/` si souhaité (`git rm --cached`, après accord). Ne pas déployer `CLAUDE.md`, `.claude/`, `.mcp.json`.

#### I11 — Risque d'incohérence factuelle « 4 ans d'expérience »
- **Fichier** : `index.html:355-356` et `:388`
- **Problème** : le texte indique « quatre années de formation en apprentissage » et le badge « 4 ans d'expérience ». Si l'expérience correspond à l'apprentissage, la formulation peut être perçue comme trompeuse (règle E-E-A-T et règle projet « ne jamais inventer »).
- **Correction** : faire valider la formulation par Cindy (ex. « 4 ans de formation en apprentissage »).

### 🟢 Amélioration

#### A1 — Meta description légèrement longue
- **Fichier** : `index.html:8` — 162 caractères (tronquée vers 155–160 sur mobile).
- **Correction** : ex. « Parage des chevaux, ânes et mulets en Haute-Savoie, Savoie et Ain par Cindy Piccot Ladrey, au départ de Viuz-en-Sallaz. Déplacement compris, sur devis. » (à ajuster ≤ 155 car.). Le `<title>` (58 car.) est bon.

#### A2 — Meta descriptions des pages légales génériques et identiques en fin de phrase
- **Fichiers** : `pages/mentions-legales.html:7`, `pages/confidentialiter.html:7` — sans enjeu si ces pages passent en `noindex`.

#### A3 — Favicon : seulement un SVG, attribut obsolète
- **Fichier** : `index.html:10`
- **Correction** : `rel="icon"` au lieu de `rel="shortcut icon"`, ajouter un repli PNG/ICO (`favicon.ico` 32×32), un `apple-touch-icon` 180×180 et `<meta name="theme-color" content="#000617">`.

#### A4 — Lien d'évitement absent
- **Fichier** : `index.html` (début du `<body>`)
- **Problème** : les pages légales ont `<main id="contenu" tabindex="-1">` mais aucune page ne propose de lien « Aller au contenu ».
- **Correction** : `<a class="skip-link" href="#contenu">Aller au contenu</a>` + `id="contenu"` sur `<main>`, visible au focus.

#### A5 — SVG décoratifs exposés aux technologies d'assistance
- **Fichier** : `index.html:141` (blason sans `aria-hidden`), `:152` et `:161` (`role="img"` + `aria-label` redondants avec le texte visible), `:505-523` (icônes du pied de page sans `aria-hidden`)
- **Correction** : `aria-hidden="true" focusable="false"` sur ces SVG ; le texte adjacent suffit.

#### A6 — Textes alternatifs à affiner
- **Fichier** : `index.html:175`, `:183`, `:494`
- **Problème** : alt génériques (« Maréchalerie en action auprès d'un cheval », « Trois équidés en panorama », « Cindy au travail »).
- **Correction** : alt descriptifs et naturels, ex. « Cindy Piccot Ladrey réalisant le parage d'un cheval en Haute-Savoie » (à adapter au contenu réel de chaque photo). Ne pas bourrer de mots-clés.

#### A7 — Noms de fichiers d'images avec espaces, accents et « · »
- **Fichiers** : `assets/images/*`
- **Problème** : URL encodées illisibles (`Trois%20%C3%A9quid%C3%A9s%20%C2%B7%20panorama.webp`), fragiles selon l'hébergeur et peu utiles au référencement image.
- **Correction** (renommage à autoriser) : `parage-sabot-cheval.webp`, `ane-paysage-alpin-haute-savoie.webp`, etc., en mettant à jour les références.

#### A8 — Petites cibles tactiles dans le pied de page
- **Fichier** : `style/_footer.scss` (liens légaux) — mesurées 83×17 et 128×17 px à 390 px.
- **Correction** : `padding` vertical pour atteindre ≈ 44 px de hauteur cliquable (ou 24 px minimum WCAG 2.2).

#### A9 — Défilement interne de `<main>` sur desktop
- **Fichier** : `style/_general.scss:158-176` (`height:100dvh; overflow:hidden` puis `main { overflow-y:auto }`)
- **Problème** : à partir de 1024 px la page défile dans `<main>` et non dans le document. Google rend la page correctement, mais cela peut gêner le défilement clavier (Espace/Page suivante sans focus dans `main`), les ancres et certains outils de mesure.
- **Correction** : vérifier au clavier ; si nécessaire, ajouter `tabindex="-1"` sur `<main>` et y placer le focus, ou revenir à un défilement du document avec header `position: sticky`.

#### A10 — CSS non minifié et doublons
- **Fichier** : `style/style.css` (46 Ko), `style/laptop.css`, `style/mobile.css` (copies non chargées)
- **Correction** : compilation `--style=compressed` pour la production (source maps conservées en dev) ; ne pas publier `laptop.css`/`mobile.css` s'ils ne sont plus utilisés.

#### A11 — Galerie peu fournie et redondante
- **Fichier** : `index.html:491-497`
- **Problème** : deux photos déjà présentes ailleurs. Une galerie de vraies interventions (avec alt descriptifs et lieux génériques) renforcerait confiance et référencement image.

#### A12 — Préparer le suivi
- Google Search Console (propriété *Domaine* sur le domaine définitif), Bing Webmaster Tools, et éventuellement une mesure d'audience sans cookie (sinon mettre à jour la politique de confidentialité et ajouter un bandeau de consentement).

---

## 3. Plan de migration vers le domaine définitif

1. **Maintenant (github.io)** : décider de l'hébergement final. S'il n'est pas GitHub Pages → ajouter `noindex, follow` sur la version GitHub. Compléter les pages légales (C1), corriger I4–I6.
2. **Avant mise en ligne du domaine** : remplacer `DOMAINE-DEFINITIF` dans canonical, Open Graph, JSON-LD (`url`, `@id`, `logo`, `image`), `sitemap.xml`, `robots.txt`. Forcer HTTPS et une seule variante (avec ou sans `www`, redirection 301 de l'autre). Mettre à jour l'hébergeur dans les mentions légales.
3. **Jour J** : retirer le `noindex` du site définitif (ne jamais le copier par erreur), déclarer le domaine dans Search Console, soumettre le sitemap, mettre à jour l'URL dans Google Business Profile et Instagram.
4. **Ancien site github.io** : soit redirection automatique (domaine personnalisé sur GitHub Pages), soit page minimale avec canonical + redirection vers le domaine, puis désactivation de GitHub Pages après réindexation.
5. **J+7 à J+30** : contrôler la couverture dans Search Console, lancer PageSpeed Insights sur le domaine définitif, vérifier les liens sortants (Instagram, annuaires) pointant vers le nouveau domaine.

---

## 4. Points conformes

- `lang="fr"`, `charset`, `viewport` corrects ; `<title>` pertinent et localisé.
- Structure sémantique globale (`header`, `nav` avec `aria-label`, `main`, `section` + `aria-labelledby`, `footer`, `address`).
- Menu : `aria-expanded`, `aria-controls`, fermeture Échap, synchronisé avec le seuil 1024 px ; `aria-current` sur la navigation active.
- Liens externes en `rel="noopener noreferrer"`, liens `tel:` et `mailto:` présents.
- Majorité des images en WebP, `loading="lazy"` sur la plupart des images hors écran.
- Aucun débordement horizontal à 390 et 1024 px ; CLS 0 et LCP ≈ 1,1 s mesurés en labo (desktop).
- Aucune police web externe (polices système) : pas de blocage de rendu lié aux fonts.
- JavaScript minimal (≈ 4,6 Ko), chargé en `defer`.
- Données de contact cohérentes entre `index.html`, JSON-LD et pages légales (téléphone identique).
