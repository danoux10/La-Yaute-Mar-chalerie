# Configuration Claude Code — état du 10 novembre 2026

## Installation locale réalisée

Le ZIP fourni dans Téléchargements a été extrait sélectivement, sans écraser de fichier existant : CLAUDE.md, .claude/settings.json et les trois dossiers de skills.
Les permissions et les consignes de compilation ont ensuite été adaptées. .mcp.json configure les trois serveurs au niveau du projet. Aucun fichier métier ni paramètre PhpStorm n'a été modifié.

## Architecture vérifiée

- Le dépôt origin correspond à danoux10/La-Yaute-Mar-chalerie.
- .htaccess donne priorité à index.html, puis index.php.
- index.html charge style/style.css et les trois scripts natifs navbar-toggle, navbar-active et background-toggle.
- style/style.scss assemble les partiels avec @use. Conserver les anciennes feuilles mobile/laptop et les source maps.
- style/_breakpoint.scss définit 767, 768 et 1024 px ; style/_variables.scss contient les tokens existants.
- index.php est une version distincte qui assemble pages/ et utility/ ; ne pas la synchroniser implicitement.

## État des outils

- Node 24.14.0, npm 11.9.0 et Git Bash présents ; Microsoft Edge présent.
- Claude Code non trouvé dans PATH ni aux emplacements utilisateur habituels. La version du CLI et son fonctionnement dans le terminal PhpStorm restent à vérifier après installation.
- PhpStorm ouvert ; product-info.json annonce 2026.3, malgré un dossier nommé PhpStorm 2026.2.4.
- Aucun dossier de plugin Claude trouvé dans les configurations utilisateur JetBrains inspectées. L'état exact des plugins activés reste à vérifier dans l'IDE.
- Aucun plugin ni paquet global installé pendant cette préparation.

## MCP configurés, pas encore testés dans Claude

| Serveur | Configuration | Activation restante |
| --- | --- | --- |
| Playwright | stdio via cmd /c npx, version 0.0.85, Edge headless, profil isolé | Accepter le serveur ; premier lancement télécharge le paquet dans le cache npm, sans installation globale ni package.json du site |
| Context7 | https://mcp.context7.com/mcp | Tester /mcp ; une authentification ou une clé peut être nécessaire selon le service et ses quotas |
| GitHub | https://api.githubcopilot.com/mcp/readonly | Authentifier via /mcp ; uniquement des outils de lecture |

Ne pas enregistrer de token dans les fichiers versionnés. Utiliser le flux d'authentification du client ; si un secret est indispensable, le conserver dans une configuration personnelle non versionnée. Ne pas le coller dans une conversation.

## Permissions

Mode default : aucune acceptation automatique générale des éditions ou du shell. Les seules commandes préautorisées sont listées exactement dans settings.json. Les éditions et appels MCP demandent confirmation ; des commandes destructrices courantes et la lecture de secrets sont refusées.

Ces règles ne constituent pas une sandbox exhaustive : les alias, autres interpréteurs, outils MCP et permissions personnelles peuvent changer les possibilités effectives. Vérifier /permissions après installation ; ne pas activer bypassPermissions et ne pas approuver une commande incomprise.

## Étapes après confirmation explicite

1. Installer le CLI natif officiel pour le compte Windows Danyb, puis rouvrir le terminal afin de prendre en compte PATH. Installation extérieure au projet : confirmation obligatoire.
2. Installer le plugin officiel **Claude Code [Beta]** d'Anthropic depuis Settings > Plugins > Marketplace dans PhpStorm. Tout changement de paramètres et tout redémarrage nécessitent confirmation.
3. Dans le terminal PhpStorm ouvert à la racine du projet :

```powershell
claude --version
claude
```

4. Se connecter personnellement à son compte Claude. Dans la session : `/doctor`, `/status`, `/permissions`, `/ide`, puis `/mcp`. Confirmer le chargement des paramètres Project et de CLAUDE.md, l'intégration IDE et l'état de chaque serveur.
5. Installer Frontend Design au niveau du projet depuis le terminal :

```powershell
claude plugin install frontend-design@claude-plugins-official --scope project
claude plugin list
```

Si le marketplace officiel n'est pas enregistré, son ajout modifie la configuration utilisateur : demander confirmation avant `claude plugin marketplace add anthropics/claude-plugins-official`.

6. Relancer la session après l'installation du plugin. Ne pas confondre Frontend Design (plugin Claude) et le plugin JetBrains.

## Recette sans modifier le site

Les fichiers des trois skills sont présents au format documenté .claude/skills/<nom>/SKILL.md, avec name et description. Leur exécution par le modèle reste à tester :

```text
/frontend-responsive Analyse seulement : identifie les partiels, les variables et les seuils 767/768/1024. Ne modifie aucun fichier et ne compile rien.
/seo-local Fais un audit en lecture seule, sans inventer de coordonnées ni modifier de contenu.
/audit-qualite Audite les différences et indique les contrôles réalisables ; aucune correction ni commit.
```

Vérifier que Claude cite les bons fichiers et respecte les limites. Pour Playwright, ouvrir uniquement l'URL locale servie par Laragon, tester 390, 767, 768, 1023, 1024 et 1440 px et le menu clavier ; ne pas soumettre de formulaire. Pour Context7, demander une documentation publique Sass. Pour GitHub, lire uniquement le dépôt indiqué.

Contrôler ensuite `git diff --exit-code` : les fichiers métier doivent rester inchangés. La conformité des consignes n'est pas une garantie de comportement ; elle doit être vérifiée à chaque tâche.

## Références officielles consultées

- https://code.claude.com/docs/en/setup
- https://code.claude.com/docs/en/jetbrains
- https://code.claude.com/docs/en/settings
- https://code.claude.com/docs/en/permissions
- https://code.claude.com/docs/en/skills
- https://code.claude.com/docs/en/mcp
- https://code.claude.com/docs/en/discover-plugins
- https://github.com/anthropics/claude-plugins-official/tree/main/plugins/frontend-design
- https://github.com/microsoft/playwright-mcp
- https://github.com/upstash/context7
- https://github.com/github/github-mcp-server/blob/main/docs/remote-server.md
