# Maila Chic - direction produit V1

## Positionnement de la V1

La V1 est une surface **Décider / Comprendre** : elle doit créer une première relation avec la marque, expliquer ce qui est en préparation et convertir l'intérêt en inscription consentie. Elle ne simule pas une boutique.

## Veille appliquée

Les références retenues ne sont pas copiées. Elles servent à isoler des besoins récurrents du secteur :

- Polène associe langage de forme, matière et savoir-faire dans un récit éditorial.[1]
- Le Tanneur relie histoire de maison, détails d'usage et inscription à une newsletter.[2]
- Léo et Violette donne une place autonome au processus de fabrication.[3]
- Shopify recommande de construire une audience qualifiée avant l'ouverture et d'utiliser l'e-mail comme lien de pré-lancement.[4]

Conséquence pour Maila Chic : la V1 ne montre aucune fausse référence. Elle organise un rythme éditorial, réserve les futurs emplacements de preuve et propose une alerte de lancement segmentée.

## Direction artistique

- **Composition** : éditoriale, asymétrique, avec une idée principale par section.
- **Palette** : ivoire, encre, argile et sauge. L'argile sert de ponctuation, pas de décor permanent.
- **Typographie** : serif éditoriale de système pour les titres, sans-serif sobre pour les informations. Aucune police distante n'est requise au build.
- **Images** : en V1, six photographies d'ambiance provisoires (`src/assets/ambiance/`, déclarées dans `src/lib/photos.ts`) occupent le héros, la section manifeste, l'univers et les cartes de collection. Les originaux fournis sont conservés dans `photos-sources/`, hors du code publié ; chaque photo retenue a été vérifiée agrandie (étiquettes, fermoirs, quincaillerie). Elles montrent des pièces d'inspiration qui n'appartiennent pas à Maila Chic : la légende le dit toujours, les visuels portant le logo ou le monogramme d'une autre marque (y compris sur un fermoir) sont exclus, et elles seront remplacées par les photographies de la collection.
- **Mouvement** : limité aux retours d'interaction, avec respect de `prefers-reduced-motion`.

## Le plus proposé

L'inscription ne collecte pas uniquement une adresse. La personne peut choisir ce qu'elle souhaite suivre : révélation de la collection, matières et entretien, ou carnet de création. Cette segmentation prépare des communications plus utiles sans inventer d'avantage commercial.

## Architecture V2 préparée

- Contenus centralisés dans `src/lib/site.ts`.
- Interface d'inscription isolée dans `src/lib/signup.ts`.
- Webhook HTTPS configurable par `MAILA_SIGNUP_WEBHOOK_URL`.
- En développement seulement, stockage local dans `.data/subscribers.ndjson`.
- En production, le formulaire refuse honnêtement l'inscription tant qu'aucun webhook durable n'est configuré.
- Une limite locale de cinq tentatives par fenêtre et une déduplication temporaire réduisent les abus. Une adresse déjà reçue obtient la même réponse qu'une première inscription, pour ne pas révéler qui est inscrit. L'adresse du visiteur provient de `x-real-ip`, sinon de la dernière entrée de `x-forwarded-for`. Cette limite reste en mémoire et propre à chaque instance : le service d'e-mailing final devra aussi appliquer sa propre limitation et le double consentement.
- Le site reste en `noindex` et bloque les robots tant que les mentions légales, le domaine, le webhook et les photographies définitives manquent.
- `npm run validate:publish` refuse une publication sans URL HTTPS finale et sans webhook HTTPS.
- La politique CSP des pages est posée par `src/proxy.ts` avec un nonce unique par requête (`script-src 'self' 'nonce-...' 'strict-dynamic'`, sans `'unsafe-inline'`). Les pages sont donc rendues à la demande (`connection()` dans le layout). L'option expérimentale SRI a été essayée : seule, elle bloque les scripts inline d'hydratation.
- `npm audit` signale `braces` (via `eslint-config-next`, outil de développement uniquement). Aucune version corrigée n'existe ; la CI audite les dépendances de production, qui ne sont pas concernées.
- Les routes actuelles peuvent recevoir plus tard des données de catalogue et une couche commerce sans transformer la V1 en fausse boutique.

## Informations et actifs requis avant publication

- Logo et charte définitifs.
- Photographies autorisées de la collection.
- Noms, descriptions, compositions, dimensions, entretien et prix validés.
- Histoire réelle de la marque et informations de fabrication vérifiables.
- Identité légale complète de l'éditeur.
- Hébergeur et domaine final.
- Adresse de contact publique.
- Prestataire d'e-mailing ou webhook durable, avec procédure de désinscription.
- Durées de conservation et coordonnées d'exercice des droits RGPD.

## Déploiement Hostinger

Le sous-domaine officiel est `mailachic.rimiscky.fr` (un seul « l » dans « mala », domaine `rimiscky.fr` avec un « c »).

Le conteneur de build de Hostinger fournit une glibc antérieure à 2.29, que le binaire natif de Next.js 16 exige. Le déploiement suit donc l'architecture déjà éprouvée sur le portfolio :

1. Le workflow `.github/workflows/deploy-hostinger.yml` construit le site sur un runner GitHub Actions (tests, lint, build) et publie la sortie prête à servir sur la branche `deploy/hostinger`.
2. Le panneau Hostinger doit pointer sur la branche `deploy/hostinger` (jamais `main` ni `feat/**`) en tant qu'application Node.js.
3. L'application Node.js de Hostinger exige un serveur autonome (`output: "standalone"`, soit `.next/standalone/server.js`). La branche déployée contient ce serveur préconstruit, ses fichiers statiques et les sources. Son script `build` (`scripts/hostinger-build.mjs`) réutilise le serveur s'il est présent, le reconstruit sinon, puis copie `.next/static` et `public` à côté de lui ; son script `start` lance `node .next/standalone/server.js`. L'URL publique est fixée au build (`NEXT_PUBLIC_SITE_URL` dans le workflow).
4. L'auto-déploiement Git classique de Hostinger (clone + Composer) ne convient pas : il publierait les sources TypeScript sans les construire et renverrait 403.

## Sources

[1] [Polène - La Maison](https://www.polene-paris.com/pages/about-the-brand)
[2] [Le Tanneur - Notre histoire](https://www.letanneur.com/pages/notre-histoire)
[3] [Léo et Violette - Factory tour](https://www.leoetviolette.com/fr-us/pages/factory-tour)
[4] [Shopify France - Marketing de pré-lancement](https://www.shopify.com/fr/blog/pre-lancement)
