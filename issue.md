# UI / UX overhaul

This PR bundles many small-to-medium improvements aimed at making the site feel more consistent, more readable and easier to use. The changes are grouped below by the user-facing concern they address rather than by commit.

## Consistent page layout and titles

- Introduced a shared `PageTitle` component and applied it across pages so titles look the same everywhere (font size, spacing, icon placement).
- Uniformised the global page layout: `PageContainer`, `PageHeader`, `PageTabs`, `FixedContent` and `ScrollableContent` now share the same paddings, breakpoints and scroll behaviour.
- Aligned entity pages (Country, Region, Massif, Network, Organization, Entry, Person, Account, Document) with the same structural pattern so navigating between them no longer feels like jumping between different apps.
- Improved background contrast so content stands out more clearly from the page chrome.

## Homepage and main navigation

- Reworked the main homepage buttons for better hierarchy and readability.
- Polished the Header and Footer to match the new layout.
- Uniformised secondary buttons that previously had inconsistent shapes/colors.

## Persons: authors vs. speleos

- Introduced a clear visual distinction between an "author" (someone credited on documents) and a "speleo" (a caver profile), with:
  - a dedicated author icon,
  - a dedicated `AuthorBody` and `CaverBody` rendering,
  - context-appropriate icons throughout lists and cards.
- This removes a long-standing confusion where both roles rendered identically.

## Messages / conversations

- Full pass on the Messages feature:
  - Cleaner conversation detail view with clearer authorship, timestamps and threading.
  - Redesigned compose dialog.
  - URLs and email addresses inside messages are now clickable (linkified).
  - Fixed several visual issues (margins, alert boxes) around messages.

## Riggings

- Reworked the riggings editor UX:
  - Simpler obstacle toolbar and anchor toolbar.
  - Clearer obstacle cards and row actions.
  - Better column legend on the read view.

## Licenses

- New `LicenseTag` / `LicenseBadge` components with proper CC icons (CC-BY, CC-BY-SA, CC-BY-NC, CC-BY-NC-SA, CC-BY-ND, CC-BY-NC-ND, CC0) and the French "Licence Ouverte".
- License information is now explained to the user rather than shown as a raw code.
- Translations added in every supported language for the new license copy.
- Removed the outdated CC-BY-SA.png in favor of proper SVG assets.

## Documents

- Distinct icon for the "document editor" role.
- Fixed chip color for the BBS subject.
- Moved the "Import science observation" button to a more discoverable location.
- Polished the Add-file and Authors sections of the document form.
- Cleaned up the Import CSV flow (button placement, container layout).

## Search

- Replaced the custom autocomplete with the standard MUI autocomplete for a more predictable behaviour.
- Fixed the search sliders' rendering.
- When searching for a locality, a marker is now displayed on the map to show the match.

## Delete / validation actions

- Deletion actions are now consistently shown in red across the app (buttons, action rows, admin views).
- Delete buttons render consistently regardless of the surrounding component.
- Improved the UX of validation buttons (moderation flows, document validation).

## Tables and lists

- Sticky scroll behaviour on entity tables so headers stay visible on long lists.
- Better loading state on tables.
- Small tweaks to mobile entity lists.

## Guidelines

- Added a dedicated "guidelines" icon and used it wherever guidelines are referenced, making the feature easier to spot.

## Alerts and sensitive content

- Fixed the alert box margin.
- Reworked the "sensitive cave" message so it reads as a real warning instead of a subtle note.

## Links

- Unified link styling across the app (internal `AppLink` and external links now look and behave consistently).
- Fixed several email links that were not properly formatted as `mailto:`.

## Admin

- Better rendering of the "deleted" section (deleted entities card, fallback icon on recent changes).

## Miscellaneous

- New reusable hooks: `useLongPress`, `useMeasuredHeight`.
- `SectionStack` layout helper to compose page sections consistently.
- Small cleanups in `grottoTheme` to support the visual changes above.

---

No functional behaviour on the API side was changed. All translation files were updated in sync so no language is left with missing keys.
