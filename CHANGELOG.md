# Changelog
All notable changes to **PostgreSQL Canvas** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

## [0.1.0] – 2025-05-31
### Added
- Initial release of PostgreSQL Canvas extension.  
- Three-pane **Query Canvas** layout: Query Builder, Results Grid, and History / Templates sidebar.  
- Connection workflow using either existing *PostgreSQL* extension profiles or an external **Venue API** for host/port/schema discovery.  
- Secure credential prompts with optional storage via VS Code Secret Storage.  
- Rolling **Query History** with execution metrics and re-run support.  
- **Query Templates** system with name, description and tag metadata.  
- Result exporting to **CSV**, **JSON**, **Markdown**, and **HTML**.  
- Bundled `analysis.sql` sample template containing common database inspection queries.  
- Core TypeScript/webpack build, ESLint configuration, and project scaffolding files (`package.json`, `tsconfig.json`, `webpack.config.js`).  

[Unreleased]: https://github.com/miolabs/MIOSQLVisualStudioExtension/compare/0.1.0...HEAD
[0.1.0]: https://github.com/miolabs/MIOSQLVisualStudioExtension/releases/tag/0.1.0
