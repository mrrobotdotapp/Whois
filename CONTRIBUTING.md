# Contributing to Whois Discord

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## Project Structure

The project follows a clean, modular structure:

```
Whois/
├── src/
│   ├── app.js              # Main Express application
│   ├── config/
│   │   ├── index.js        # Configuration loader (supports .env and config.js)
│   │   └── config.example.js
│   ├── routes/
│   │   └── index.js        # Application routes
│   └── utils/
│       └── badges.js       # Discord badge utilities
├── public/                 # Static assets
│   ├── .well-known/        # TWA/web app configuration
│   ├── css/                # Stylesheets
│   ├── js/                 # Client-side JavaScript
│   ├── img/                # Images
│   ├── manifest.json       # PWA/TWA manifest
│   └── service-worker.js   # Service worker for offline support
├── views/                  # EJS templates
│   ├── partials/           # Reusable template parts
│   ├── index.ejs           # Home page
│   ├── user.ejs            # User profile page
│   └── 404.ejs             # Error page
├── docs/                   # Documentation
├── index.js                # Application entry point
└── package.json            # Dependencies and scripts
```

## Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Whois.git
   cd Whois
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure the application**
   
   Option A: Using .env (recommended)
   ```bash
   npm run setup
   # Edit .env file with your Discord bot token
   ```
   
   Option B: Using config.js
   ```bash
   cp src/config/config.example.js src/config/config.js
   # Edit src/config/config.js with your Discord bot token
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## Code Style Guidelines

- Use **2 spaces** for indentation
- Use **single quotes** for strings (except in JSON files)
- Use **semicolons** at the end of statements
- Follow existing code patterns and conventions
- Keep functions small and focused
- Add comments for complex logic

## Adding Features

### Adding a new route
1. Add your route handler in `src/routes/index.js`
2. Follow the existing pattern for route handlers
3. Test your route thoroughly

### Adding a new utility
1. Create a new file in `src/utils/`
2. Export functions using `module.exports`
3. Import where needed

### Modifying the UI
1. Update EJS templates in `views/`
2. Update CSS in `public/css/`
3. Update client-side JS in `public/js/`
4. Test on multiple screen sizes

## PWA/TWA Development

When working on PWA/TWA features:

- Update `public/manifest.json` for app metadata
- Update `public/service-worker.js` for offline functionality
- Update `public/.well-known/assetlinks.json` for Android app linking
- Test with Lighthouse to ensure PWA compliance
- See `docs/TWA_SETUP.md` for detailed TWA information

## Submitting Changes

1. Create a new branch for your feature
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit with clear messages
   ```bash
   git add .
   git commit -m "Add: description of your changes"
   ```

3. Push to your fork
   ```bash
   git push origin feature/your-feature-name
   ```

4. Open a Pull Request with:
   - Clear description of changes
   - Screenshots for UI changes
   - Reference to any related issues

## Testing

Before submitting:
- Test the application locally
- Verify all routes work correctly
- Check console for errors
- Test PWA features (install, offline mode)
- Verify responsive design

## Additional Resources

- [Development Guide](docs/DEVELOPMENT.md) - Detailed architecture and development info
- [TWA Setup Guide](docs/TWA_SETUP.md) - Complete TWA transformation guide
- [Quick Start TWA](docs/QUICK_START_TWA.md) - Quick TWA setup

## Questions?

Feel free to open an issue if you have questions or need help!

## License

By contributing, you agree that your contributions will be licensed under the AGPL-3.0 License.
