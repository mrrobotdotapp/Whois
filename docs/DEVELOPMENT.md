# Development Guide

This guide helps you understand and contribute to the Whois Discord project.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                     Client Browser                       │
│  ┌────────────────────────────────────────────────────┐ │
│  │  PWA Features                                       │ │
│  │  - Service Worker (offline support)                │ │
│  │  - Manifest (installable app)                      │ │
│  │  - Responsive UI (mobile-first)                    │ │
│  └────────────────────────────────────────────────────┘ │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTP/HTTPS
                       ▼
┌─────────────────────────────────────────────────────────┐
│                  Express.js Server                       │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Routes (src/routes/index.js)                      │ │
│  │  - GET /                → Home page                │ │
│  │  - POST /whois          → Search redirect          │ │
│  │  - GET /:userID         → User profile             │ │
│  └────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Static Files (public/)                            │ │
│  │  - CSS, JS, Images                                 │ │
│  │  - manifest.json, service-worker.js                │ │
│  │  - .well-known/assetlinks.json (TWA)               │ │
│  └────────────────────────────────────────────────────┘ │
└──────────────────────┬──────────────────────────────────┘
                       │ Discord API
                       ▼
┌─────────────────────────────────────────────────────────┐
│                   Discord.js Client                      │
│  - Fetches user information                             │
│  - Parses badges and flags                              │
│  - Authenticates with bot token                         │
└─────────────────────────────────────────────────────────┘
```

## Project Structure Explained

### `/src` - Application Source Code

#### `src/app.js`
Main Express application setup:
- Initializes Express server
- Configures middleware
- Connects Discord.js client
- Sets up routes and views
- Starts the server

#### `src/config/`
Configuration management:
- `index.js` - Configuration loader (config.js)
- `config.example.js` - Template for configuration

#### `src/routes/`
Route handlers:
- `index.js` - All application routes
  - Home page
  - User search
  - User profile display

#### `src/utils/`
Utility functions and data:
- `badges.js` - Discord badge definitions and mappings

### `/public` - Static Assets

#### PWA Files
- `manifest.json` - PWA/TWA configuration
- `service-worker.js` - Offline caching strategy
- `.well-known/assetlinks.json` - Android app linking

#### Assets
- `css/` - Stylesheets
- `js/` - Client-side JavaScript
- `img/` - Images and icons

### `/views` - EJS Templates
- `index.ejs` - Home page
- `user.ejs` - User profile page
- `404.ejs` - Error page
- `partials/` - Reusable components

## Key Features

### 1. Discord User Lookup
- Fetches user information by Discord ID
- Displays profile, badges, account age
- Shows bot-specific information

### 2. PWA Features
- **Installable**: Can be installed as a standalone app
- **Offline Support**: Service worker caches essential resources
- **Responsive**: Works on all screen sizes

### 3. TWA Ready
- Properly configured manifest
- Asset links for Android verification
- Optimized icons for Android

## Development Workflow

### 1. Setup Environment

```bash
# Clone and install
git clone https://github.com/mrrobotdotapp/Whois.git
cd Whois
npm install

# Configure
cp src/config.example.js src/config.js
```

### 2. Run Development Server

```bash
npm run dev
```

Visit: http://localhost:8000

### 3. Make Changes

When developing:
- Edit source files in `src/`
- Restart server to see backend changes
- Refresh browser to see frontend changes
- Use browser DevTools for debugging

### 4. Test PWA Features

```bash
# Serve over HTTPS (required for PWA features)
# Use ngrok or similar tool for HTTPS tunnel
npx ngrok http 8000
```

Then test:
- Installation prompt
- Offline functionality
- Service worker updates

### 5. Validate TWA Readiness

```bash
npm run validate-twa
```

## Code Style

### JavaScript
```javascript
// Use single quotes
const message = 'Hello';

// Use semicolons
const x = 5;

// Use const/let, not var
const immutable = 'value';
let mutable = 0;

// Arrow functions for callbacks
array.map(item => item.value);

// Async/await for promises
async function fetchData() {
    const result = await api.fetch();
    return result;
}
```

### EJS Templates
```ejs
<!-- Use partials for reusable components -->
<%- include('./partials/header.ejs') %>

<!-- Escape output by default -->
<%= user.name %>

<!-- Unescaped HTML when needed -->
<%- rawHtml %>

<!-- JavaScript logic -->
<% if (user.bot) { %>
    <span class="badge">BOT</span>
<% } %>
```

### CSS
```css
/* Use BEM-like naming */
.profile-card { }
.profile-card__header { }
.profile-card__header--highlighted { }

/* Mobile-first media queries */
.element {
    /* Mobile styles */
}

@media (min-width: 768px) {
    .element {
        /* Desktop styles */
    }
}
```

## Common Tasks

### Adding a New Route

1. Edit `src/routes/index.js`:
```javascript
router.get('/new-route', (req, res) => {
    res.render('new-view', { data: 'value' });
});
```

2. Create view in `views/new-view.ejs`

### Adding a New Badge

Edit `src/utils/badges.js`:
```javascript
NEW_BADGE: {
    name: "Badge Name",
    url: "/img/badges/badge-icon.png"
}
```

### Updating Service Worker

1. Edit `public/service-worker.js`
2. Update `CACHE_NAME` version
3. Test offline functionality

### Modifying Manifest

1. Edit `public/manifest.json`
2. Validate with `npm run validate-twa`
3. Test installation

## Debugging

### Backend Issues
```bash
# Check logs
node index.js

# Use Node debugger
node --inspect index.js
# Open chrome://inspect
```

### Frontend Issues
- Use browser DevTools (F12)
- Check Console tab for errors
- Use Network tab for requests
- Use Application tab for PWA features

### Discord API Issues
- Verify bot token is correct
- Check bot permissions
- Review Discord.js documentation
- Check rate limits

## Testing

### Manual Testing Checklist
- [ ] Home page loads
- [ ] Search for valid user ID works
- [ ] User profile displays correctly
- [ ] Badges display correctly
- [ ] 404 page shows for invalid IDs
- [ ] PWA installation works
- [ ] Offline mode works
- [ ] Responsive design works on mobile

### TWA Testing
- [ ] `npm run validate-twa` passes
- [ ] Asset links accessible via HTTPS
- [ ] Icons display correctly
- [ ] No URL bar when running as TWA

## Performance Tips

1. **Images**: Use WebP format when possible
2. **Caching**: Configure proper cache headers
3. **Minification**: Minify CSS/JS for production
4. **CDN**: Consider using CDN for static assets
5. **Service Worker**: Cache strategically

## Security Considerations

1. **Never commit** `.env` or `config.js` files
2. **Validate** all user inputs
3. **Use HTTPS** in production
4. **Keep dependencies** updated
5. **Review** bot token permissions regularly

## Deployment

### Heroku
```bash
heroku create
heroku config:set DISCORD_TOKEN=your_token
git push heroku main
```

### Docker
```dockerfile
FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
CMD ["npm", "start"]
```

### Environment Variables
Required:
- `DISCORD_TOKEN` - Your Discord bot token
- `PORT` - Server port (default: 8000)

## Resources

- [Express.js Docs](https://expressjs.com/)
- [Discord.js Guide](https://discordjs.guide/)
- [EJS Documentation](https://ejs.co/)
- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [TWA Documentation](https://developer.chrome.com/docs/android/trusted-web-activity/)

## Need Help?

- Open an issue on GitHub
- Check existing issues for similar problems
- Review the [Contributing Guide](../CONTRIBUTING.md)
