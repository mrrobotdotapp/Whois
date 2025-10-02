# Changelog

All notable changes to this project will be documented in this file.

## [2.1.0] - Project Restructure for TWA

### Added

#### Project Structure
- **New directory structure** for better organization
  - `src/` - Application source code
  - `src/config/` - Configuration management
  - `src/routes/` - Route handlers
  - `src/utils/` - Utility functions
  - `scripts/` - Development scripts
  - `docs/` - Documentation

#### Configuration
- **Modern .env support** with dotenv package
- Flexible configuration system supporting both `.env` and `config.js`
- `.env.example` template for easy setup
- `npm run setup` command for quick configuration

#### Documentation
- **CONTRIBUTING.md** - Comprehensive contribution guidelines
- **docs/TWA_SETUP.md** - Complete TWA transformation guide
- **docs/QUICK_START_TWA.md** - Quick start guide for TWA
- **docs/DEVELOPMENT.md** - Architecture and development guide

#### Tools & Scripts
- **TWA Validation Script** (`npm run validate-twa`)
  - Validates manifest.json
  - Checks asset links configuration
  - Verifies icon requirements
  - Checks service worker presence

### Changed

#### Core Application
- Moved `app.js` to `src/app.js` with improved structure
- Moved `Badges.js` to `src/utils/badges.js`
- Moved `config.example.js` to `src/config/config.example.js`
- Created new `index.js` as main entry point
- Separated routing logic into `src/routes/index.js`

#### PWA/TWA Configuration
- **manifest.json improvements**:
  - Changed `display` from `fullscreen` to `standalone` (better for TWA)
  - Removed `purpose: "any maskable"` from root (moved to specific icons)
  - Added `purpose: "any maskable"` to 192x192 and 512x512 icons
  - Changed `background_color` from `#fff` to `#5865F2` (brand consistency)
  - Simplified `start_url` from `/?utm_source=pwa` to `/`

#### package.json
- Updated `main` field from `app.js` to `index.js`
- Added new scripts:
  - `setup` - Quick configuration setup
  - `validate-twa` - Validate TWA readiness
- Added `dotenv` dependency for environment variable support

#### Documentation
- Updated README.md with:
  - New project structure section
  - Dual configuration methods (env and config.js)
  - TWA setup quick links
  - Better organization
- Updated .gitignore for new structure

### Technical Details

#### File Migrations
```
Before                  →  After
----------------------------------------
app.js                  →  src/app.js (refactored)
Badges.js              →  src/utils/badges.js
config.example.js      →  src/config/config.example.js
-                      →  index.js (new entry point)
-                      →  src/routes/index.js (extracted routes)
-                      →  src/config/index.js (config loader)
```

#### Compatibility
- ✅ Backward compatible with existing deployments
- ✅ Supports both `.env` and `config.js` configuration methods
- ✅ All existing routes and functionality preserved
- ✅ PWA features fully maintained

### Benefits

1. **Better Organization**: Clean, modular structure following Node.js best practices
2. **TWA Ready**: Optimized manifest and configuration for Android TWA conversion
3. **Developer Friendly**: Comprehensive documentation and tooling
4. **Modern Configuration**: Environment variable support with dotenv
5. **Validation Tools**: Built-in TWA validation script
6. **Maintainable**: Separation of concerns (routes, config, utils)

### Migration Guide

For existing installations:

1. **Backup your configuration**:
   ```bash
   cp config.js config.backup.js
   ```

2. **Pull updates**:
   ```bash
   git pull origin main
   ```

3. **Install new dependencies**:
   ```bash
   npm install
   ```

4. **Migrate configuration** (choose one):
   
   Option A: Using .env (recommended)
   ```bash
   npm run setup
   # Edit .env with your bot token
   ```
   
   Option B: Using config.js
   ```bash
   cp src/config/config.example.js src/config/config.js
   # Copy your token from config.backup.js
   ```

5. **Test the application**:
   ```bash
   npm start
   ```

6. **Validate TWA readiness**:
   ```bash
   npm run validate-twa
   ```

### For Developers

New development workflow:
- Routes → Edit `src/routes/index.js`
- Utils → Add to `src/utils/`
- Config → Use `src/config/`
- Static files → `public/` (unchanged)
- Views → `views/` (unchanged)

See [CONTRIBUTING.md](CONTRIBUTING.md) and [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) for details.

## [2.0.0] - Previous Versions

See git history for previous changes.

---

## Version Schema

This project follows [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)
