# Plan UI/UX — Page entrée `/ui/entrances/:id`

## Problèmes à corriger (par priorité)

### P1 — Bugs visuels critiques (captures d'écran)

#### A. Espace blanc avant contenu des items sans titre
- **Cause** : `SectionTitle.jsx` rend toujours un `<Typography h4>&nbsp;</Typography>` même si `title` est vide + typo `marginBotton` (prop inexistante)
- **Fix** : ne rendre le `h4` que si `title` est non vide ; corriger `marginBotton → marginBottom`
- **Fichier** : `src/components/appli/Entry/SectionTitle.jsx`

#### B. `<br />` inconditionnels dans Contribution
- **Cause** : `Contribution.jsx` ligne 41 : `<br />` après body même si body absent ; ligne 50 : `<br />` avant reviewer même si absent
- **Fix** : remplacer par des `Box mt={0.5}` conditionnels
- **Fichier** : `src/components/common/Contribution/Contribution.jsx`

#### C. ActionButtons au-dessus du contenu (flex-column)
- **Cause** : `ListItemStyled` est `flex-direction: column`, boutons rendus AVANT le texte → rangée de boutons flottant au-dessus du contenu avec espace vide à gauche
- **Fix** : passer en `flex-direction: row` avec contenu en `flex-grow:1` à gauche et boutons `flex-shrink:0` à droite
- **Fichiers** : `Entry/Locations/Location.jsx`, `Descriptions/Description.jsx`, et mêmes patterns dans Riggings, Histories, Comments

#### D. Espacement excessif entre cartes de sections
- **Cause** : `ScrollableContent` Card a `margin: spacing(2)` → 32px entre deux cartes adjacentes
- **Fix** : `margin: spacing(1) spacing(2)` (8px haut/bas, 16px gauche/droite)
- **Fichier** : `src/components/common/Layouts/Fixed/ScrollableContent.jsx`

#### E. InfoSection double gap
- **Cause** : `gap: spacing(1)` sur wrapper + `margin-bottom: spacing(1)` sur titre = 16px au lieu de 8px
- **Fix** : supprimer `margin-bottom` du `SectionTitle` dans `InfoSection.jsx`
- **Fichier** : `src/components/common/InfoSection.jsx`

#### F. Ratings : `scale(0.85)` au lieu de `size="small"`
- **Cause** : CSS transform réduit visuellement sans réduire l'espace occupé → espace invisible sous les étoiles
- **Fix** : passer `size="small"` via prop, supprimer `SmallRatingsWrapper`
- **Fichier** : `src/components/appli/Entry/Properties.jsx`

---

### P1 — Layout

#### G. HalfSplitContainer : supprimer `flex-direction: row` à `lg+`
- **Cause** : À 1200px+, carte ET properties se partagent 500px en ligne → carte minuscule
- **Fix** : supprimer le breakpoint `lg` dans `HalfSplitContainer`, toujours `flex-direction: column`. Donner `min-height: 200px` à la carte dans ce contexte.
- **Fichier** : `src/components/appli/Entry/index.jsx`

---

### P1 — Boutons de révision

#### H. Fusionner le bouton "Revisions" footer dans le ButtonGroup header (icon-only)
- **Situation** : Le footer a un `SnapshotButton` "Revisions" (entrée seule, `HistoryIcon`). Le header a un `SnapshotButton` "All Revisions" (`TimelineIcon`, `getAll=true`). Deux boutons similaires à des endroits différents.
- **Fix** :
  1. Supprimer le `SnapshotButtonStyled` du `CardActions` footer dans `Entry/index.jsx`
  2. Le passer en prop `entranceSnapshot` à `FixedContent` et l'insérer dans le `ButtonGroup` du `CardHeader`
  3. Les deux boutons icon-only (pas de texte) — le composant `SnapshotButton` supporte déjà l'icon-only quand `label` est absent
  4. `HistoryIcon` = révisions de cette entrée seule, tooltip i18n `"Revision history of this entrance"`
  5. `TimelineIcon` = toutes les révisions, retirer le texte "All Revisions", tooltip i18n `"All revisions (entrance + sections)"`
- **Fichiers** :
  - `src/components/appli/Entry/index.jsx` — retirer footer button, passer prop
  - `src/components/common/Layouts/Fixed/FixedContent.jsx` — ajouter le bouton dans ButtonGroup, maj tooltip
  - `src/components/appli/Entry/Snapshots/UtilityFunction.js` — tooltip i18n
  - fichiers de traduction : `packages/web-app/public/locales/fr/translation.json` et `en/translation.json`

---

### P2 — Coordonnées

#### I. Format coordonnées compact + WGS84 conservé
- Le label `Coordinates (WGS84)` reste intact (info système de référence importante)
- Changer la valeur de `"Lat. (N) / Long. (E) = 45.1234, 6.5678"` → `"45.1234° N, 6.5678° E"`
- **Fichier** : `src/components/appli/Entry/Properties.jsx:94-101`

---

### P2 — AuthorAndDate footer

#### J. AuthorAndDate : déplacer dans le CardContent (subheader ou bas du scroll)
- Actuellement dans `CardActions` en bas du sticky panel — peu visible si contenu déborde
- Utiliser le prop `subheader` disponible sur `FixedContent` → affichage compact sous le titre
- **Fichier** : `src/components/appli/Entry/index.jsx`

---

## Fichiers à modifier

| Fichier | Item |
|---------|------|
| `src/components/appli/Entry/SectionTitle.jsx` | A |
| `src/components/common/Contribution/Contribution.jsx` | B |
| `src/components/appli/Entry/Locations/Location.jsx` | C |
| `src/components/appli/Descriptions/Description.jsx` | C |
| `src/components/appli/Entry/Riggings/Rigging.jsx` | C |
| `src/components/appli/Entry/Histories/History.jsx` | C |
| `src/components/appli/Entry/Comments/Comment.jsx` | C |
| `src/components/common/Layouts/Fixed/ScrollableContent.jsx` | D |
| `src/components/common/InfoSection.jsx` | E |
| `src/components/appli/Entry/Properties.jsx` | F, I |
| `src/components/appli/Entry/index.jsx` | G, H, J |
| `src/components/common/Layouts/Fixed/FixedContent.jsx` | H |
| `src/components/appli/Entry/Snapshots/UtilityFunction.js` | H |
| `public/locales/fr/translation.json` + `en/translation.json` | H |
