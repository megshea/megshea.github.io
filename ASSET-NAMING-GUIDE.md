# Portfolio Asset Naming Guide

Upload assets into `images/` or `videos/`. This is the running reference for new portfolio uploads.

## Selected Work thumbnails (Home and Work)

The filenames below are **recommended names for replacement images**. The current site still uses the existing files listed alongside them. After uploading a new image, update the project's `image` path in `js/projects.js` to activate it on both Home and Work.

| Project | Recommended replacement | Current file |
|---|---|---|
| DecoverAI | `images/decoverai-card.jpg` | `images/decoverai-thumbnail.jpg` |
| Photography | `images/photography-card.jpg` | `images/DSC_0332.jpg` |
| Min Shaw | `images/min-shaw-card.png` | `images/MIN SHAW logo v2.png` |
| Recipe Roulette | `images/recipe-roulette-card.png` | `images/recipe roulette mockup.png` |
| Sunstainable Surfboards | `images/sunstainable-card.jpg` | `images/sunstainable-surfboards.png` |
| Kiraku | `images/kiraku-card.png` | `images/kiraku mockup.png` |

Suggested card image dimensions: **1200 × 900 px (4:3)**. Use JPG for photos and PNG for graphics or mockups when useful.

## Floating homepage thumbnails

These are separate from the Selected Work cards, and paths are in `index.html`.

| Project | Current file |
|---|---|
| Photography | `images/DSC_0332.jpg` |
| Min Shaw | `images/MIN SHAW logo v2.png` |
| Sunstainable Surfboards | `videos/sunstainable-loop.mp4` (poster: `images/sunstainable-surfboards.png`) |
| Kiraku | `images/kiraku mockup.png` |
| DecoverAI | `videos/decoverai-loop.mp4` (poster: `images/decoverai-thumbnail.jpg`) |
| Recipe Roulette | `images/recipe roulette mockup.png` |

## Photography collections

These filenames are **already wired up**: uploading them to `images/` fills the placeholders automatically.

| Section | Filename range | Slots |
|---|---|---|
| Musician Portraits | `musician-portraits-01.jpg` to `musician-portraits-06.jpg` | 6 |
| Portraits | `portraits-01.jpg` to `portraits-09.jpg` | 9 |
| UC Berkeley College of Natural Resources Commencement | `cnr-commencement-01.jpg` to `cnr-commencement-06.jpg` | 6 |
| Grad Shoot | `grad-shoot-01.jpg` to `grad-shoot-06.jpg` | 6 |
| Couples Grad Shoot | `couples-grad-01.jpg` to `couples-grad-03.jpg` | 3 |
| RA-ON Performance | `raon-performance-01.jpg` to `raon-performance-03.jpg` | 3 |

Use lowercase letters, hyphens, two-digit numbering, and the exact `.jpg` extension.

## Video files

- Homepage loops: `videos/decoverai-loop.mp4`, `videos/sunstainable-loop.mp4`
- Full DecoverAI videos: embed the official YouTube versions once published.

## Where to change things

- `js/projects.js` — project order, visibility, selected-work thumbnails, photography collections
- `index.html` — floating homepage images and videos
- `css/style.css` — positioning and image styling

Update this guide whenever new assets are added.
