---
name: audit-qualite
description: Contrôler la qualité du code, l'accessibilité, les performances et les régressions avant un commit.
---
# Audit qualité
1. Examiner `git status` et `git diff`, ne jamais écraser les changements utilisateur.
2. Chercher erreurs JS, chemins cassés, règles SCSS dupliquées, soucis sémantiques HTML et ARIA.
3. Vérifier 390px et 1440px, puis les seuils 768/1024px si le navigateur est accessible.
4. Vérifier que les assets de production ne pointent pas vers `docs/` involontairement.
5. Exécuter uniquement les vérifications déjà disponibles ; ne pas supposer la présence de npm.
6. Rapporter les défauts avec fichier/emplacement, gravité et correction proposée. Ne pas committer sans demande.
