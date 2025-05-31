# PostgreSQL Canvas VS Code Extension

[![Version](https://img.shields.io/visual-studio-marketplace/v/your-publisher-name.postgres-canvas?color=blue&label=VS%20Marketplace)](https://marketplace.visualstudio.com/items?itemName=your-publisher-name.postgres-canvas)
[![Downloads](https://img.shields.io/visual-studio-marketplace/d/your-publisher-name.postgres-canvas.svg)](https://marketplace.visualstudio.com/items?itemName=your-publisher-name.postgres-canvas)
[![License](https://img.shields.io/github/license/miolabs/MIOSQLVisualStudioExtension.svg)](LICENSE)
[![Build](https://github.com/miolabs/MIOSQLVisualStudioExtension/actions/workflows/ci.yml/badge.svg)](https://github.com/miolabs/MIOSQLVisualStudioExtension/actions)

## Table of Contents
1. [Project Overview](#project-overview)
2. [Key Features](#key-features)
3. [Screenshots / Demo](#screenshots--demo)
4. [Installation](#installation)
5. [Usage Guide](#usage-guide)
6. [Configuration Options](#configuration-options)
7. [Architecture Overview](#architecture-overview)
8. [Development Setup](#development-setup)
9. [External API Integration](#external-api-integration)
10. [Contributing](#contributing)
11. [Roadmap](#roadmap)
12. [License](#license)

---

## Project Overview
**PostgreSQL Canvas** is a Visual Studio Code extension that brings an interactive multi-panel workspace for PostgreSQL databases.  
It unifies query authoring, execution, result exploration, history, and reusable templates in a single canvas while seamlessly integrating with existing PostgreSQL connection tooling or a custom “venue” API that resolves credentials and schema metadata.

**Purpose**
* Speed up everyday data tasks for developers, data engineers, and analysts.
* Reduce context switching between editors, CLI tools, and docs.
* Encourage best-practice sharing through query templates.

---

## Key Features
| Feature | Description |
|---------|-------------|
| 🖼 **Three-Pane Canvas** | Query Builder, Results Grid, and Sidebar (History & Templates) arranged in one view. |
| 🔌 **Flexible Connections** | Use the _PostgreSQL_ extension connection picker **or** auto-resolve host/port via an external Venue API. |
| 💾 **Query History** | Every executed statement is timestamped, duration-tracked, and replay-able. |
| 📑 **Templates** | Save frequently used SQL snippets with tags & descriptions and share them across workspaces. |
| 🗺 **Schema Insight** | Fetch tables/views/functions via API for smarter autocomplete (road-map). |
| 📤 **Export Results** | Quickly export result sets to CSV, JSON, Markdown, or HTML. |
| 🔒 **Secure Credentials** | Passwords stored with VS Code Secret Storage, never plain-text. |
| 🚀 **One-Click Run** | Run selection or whole document with ⌘ ⌥ ↩ / Ctrl Alt Enter. |

---

## Screenshots / Demo
| Canvas | Sidebar Templates | Dark Theme |
|--------|-------------------|-----------|
| ![Canvas](assets/screenshots/canvas.png) | ![Sidebar](assets/screenshots/sidebar.png) | ![Dark](assets/screenshots/dark.png) |

_A 2-minute demo video is available on the [Marketplace page](https://marketplace.visualstudio.com/items?itemName=your-publisher-name.postgres-canvas)._

---

## Installation

### Marketplace (recommended)
1. Open VS Code Extension Marketplace.
2. Search for **“PostgreSQL Canvas”**.
3. Click **Install** and reload when prompted.

### Development / VSIX
```bash
git clone https://github.com/miolabs/MIOSQLVisualStudioExtension.git
cd MIOSQLVisualStudioExtension
npm install
npm run package          # produces postgres-canvas-<ver>.vsix in ./dist
code --install-extension dist/postgres-canvas-*.vsix
```

Requires **VS Code ≥ 1.70** and **Node ≥ 18** for local builds.

---

## Usage Guide

### 1. Connect to Database
Command Palette → **PostgreSQL: Connect to Venue**  
Select a venue or connection profile and enter credentials if prompted.

### 2. Open Query Canvas
Command Palette → **PostgreSQL: Open Query Canvas**  
The workspace splits into three panels: Builder (top-left), Results (bottom), Sidebar (right).

### 3. Write & Run SQL
1. Type SQL in the Builder panel or open an existing `.sql` file.  
2. Press **Run Query** (toolbar) or **⌘ ⌥ ↩ / Ctrl Alt Enter**.  
3. Results appear instantly; history and templates update.

### 4. Save Template
Click **Save as Template**, provide a name/description/tags.  
Find it later under the **Templates** tab in the sidebar.

### 5. Export Results
In the Results toolbar choose **Export → CSV/JSON/MD/HTML**.

---

## Configuration Options

| Setting | Default | Description |
|---------|---------|-------------|
| `pgCanvas.venueApiUrl` | `""` | Base URL of your Venue API. |
| `pgCanvas.apiAuthToken` | `""` | Bearer token for the API (supports `env:` variables). |
| `pgCanvas.defaultVenue` | `""` | Venue to auto-connect on startup. |
| `pgCanvas.autoConnect` | `false` | Enable automatic connection to `defaultVenue`. |
| `pgCanvas.maxHistoryItems` | `50` | Rolling history size. |
| `pgCanvas.resultLimit` | `1000` | LIMIT applied when none specified. |
| `pgCanvas.saveCredentials` | `true` | Persist credentials in Secret Storage. |

_Edit via **Settings UI** or `settings.json`._

---

## Architecture Overview
```
┌───────────────────── VS Code Workspace ─────────────────────┐
│  Query Builder  ──► CanvasManager ──► PostgreSQL Pool       │
│  Results Webview ◄──(postMessage)──► pg (node)              │
│  Sidebar Webview  ◄── templates/history state ──────────────┤
└──────────────────────────────────────────────────────────────┘
            ▲                 │
            │ REST/JSON       ▼
            │          Venue / Schema API
            └────────────────────────────
```
* **Extension Host (Node):** `extension.ts` registers commands, manages state, routes messages.
* **Webviews (HTML/TS):** Sandbox UIs bundled with webpack (`webviews/`).
* **Connection Layer:** `pg` connection pool or delegation to PostgreSQL extension.
* **External API Client:** `src/connection/configService.ts` fetches venue & schema metadata.

---

## Development Setup
```bash
# clone
git clone https://github.com/miolabs/MIOSQLVisualStudioExtension.git
cd MIOSQLVisualStudioExtension

# install deps
npm install

# build extension + webviews
npm run compile        # or `npm run watch` for live rebuild

# launch Extension Development Host
code .                 # press F5 or use built-in Run/Debug
```
Tests run with Mocha:
```bash
npm test
```

Lint & format:
```bash
npm run lint
```

---

## External API Integration

The **Venue API** is an optional REST service to centralize connection info.

### Endpoints (expected)
| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/venues` | List available venues. |
| `GET` | `/venues/{name}` | Resolve host, port, db, SSL & default schema. |
| `GET` | `/venues/{name}/schema` | Return tables, views, functions metadata (future intellisense). |

Authentication is via `Authorization: Bearer <token>` header.  
Set `pgCanvas.venueApiUrl` and `pgCanvas.apiAuthToken` in settings.

---

## Contributing
1. **Fork** the repo, create a branch `feat/awesome-idea`.
2. Follow the coding standards (`eslint`, `prettier`).
3. Include tests where reasonable.
4. Submit a PR with a clear description and screenshot / GIF if UI-related.

All contributors must agree to the [Developer Certificate of Origin](https://developercertificate.org/).

---

## Roadmap
- [ ] Monaco-based SQL editor with autocomplete & diagnostics
- [ ] Visual drag-n-drop query builder
- [ ] Schema browser & ER diagram
- [ ] Multiple concurrent database sessions
- [ ] Live dashboard widgets (charts)
- [ ] Settings sync & template sharing via Gist

---

## License
This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---

_Built with ❤️ by the **MIOLabs** team – bringing autonomy to software engineering._
