# Assets Directory Guide

This `assets/` folder stores **all visual resources** required by the PostgreSQL Canvas VS Code extension.

## 1. Extension Icons  

| File                     | Purpose                                    | Required Size | Format | Notes |
|--------------------------|--------------------------------------------|---------------|--------|-------|
| `icon.png`               | Primary extension icon shown in VS Code & Marketplace | **128 × 128 px** | PNG (transparent) | Keep important details inside a 96 × 96 px safe-zone to avoid clipping. |
| `logo.svg`               | Scalable logo for documentation & webview use | Any (vector)  | SVG    | Provided placeholder can be replaced with a branded version. |

### Icon Design Tips
* Use a simple silhouette that is recognizable at 32 × 32 px (activity bar).
* Maintain good contrast on both light & dark backgrounds.
* Avoid text—icons are often displayed at very small sizes.

---

## 2. Screenshot Gallery  

Screenshots appear in the Marketplace listing and README.

| Folder / File Pattern                | Purpose                       | Recommended Size        | Format |
|--------------------------------------|-------------------------------|-------------------------|--------|
| `screenshots/canvas.png`             | Main hero image (full canvas) | **1280 × 720 px** (16:9) | PNG |
| `screenshots/sidebar.png`            | Sidebar (history/templates)   | 1280 × 720 px           | PNG |
| `screenshots/dark.png`               | Dark-theme preview            | 1280 × 720 px           | PNG |
| `screenshots/*.gif` (optional)       | Short animations / demos      | Up to 5 MB, 1280 × 720 px | GIF |

Marketplace guidelines:
* Minimum width **≥ 640 px**, height **≥ 360 px**.
* Maximum file size **≤ 5 MB**.
* Use PNG for clarity (GIF only for motion).

---

## 3. Badges & Miscellaneous

Place any additional images (badges, diagrams, blog banners, etc.) in sub-folders under `assets/` to keep the repository tidy.

```
assets/
├── icon.png
├── logo.svg
└── screenshots/
    ├── canvas.png
    ├── sidebar.png
    ├── dark.png
    └── demo.gif
```

---

## 4. Contribution Workflow

1. Add/replace images in the appropriate path.
2. Run `git add assets/...` and commit with a descriptive message.
3. Update `README.md` or `package.json` icons section if filenames change.
4. Verify marketplace preview (`vsce package && vsce publish --yarn`).

---

Happy designing! 🎨
