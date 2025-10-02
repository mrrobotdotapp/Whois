# Source Code Directory

This directory contains the core application source code, organized for maintainability and scalability.

## Directory Structure

```
src/
├── app.js              # Main Express application
├── config/             # Configuration management
│   ├── index.js        # Configuration loader
│   └── config.example.js
├── routes/             # Route handlers
│   └── index.js        # Application routes
└── utils/              # Utility functions
    └── badges.js       # Discord badge definitions
```

## Files Explained

### `app.js` - Main Application

The core Express application file that:
- Initializes the Express server
- Sets up middleware (JSON, URL-encoded, static files)
- Configures view engine (EJS)
- Connects to Discord API via Discord.js
- Imports and uses routes
- Starts the HTTP server

**Key responsibilities:**
- Server configuration
- Discord client setup
- Middleware setup
- Route registration

### `config/` - Configuration

#### `config/index.js`
Smart configuration loader that supports multiple sources:
- Loads from `.env` file (if present)
- Falls back to `config.js` file
- Validates required configuration
- Provides helpful error messages

**Configuration priority:**
1. `config.js` (if exists) - takes precedence
2. `.env` file variables
3. Default values

#### `config/config.example.js`
Template file showing required configuration structure. Copy this to:
- `src/config/config.js` for JS-based config, or
- `.env` in project root for environment variables

### `routes/` - Route Handlers

#### `routes/index.js`
All HTTP route handlers for the application:

**Routes:**
- `GET /` - Home page with search form
- `POST /whois` - Processes search and redirects
- `GET /:userID` - Displays user/bot profile
- `GET /*` - 404 error handler

**Features:**
- User data fetching via Discord API
- Badge parsing and mapping
- Error handling for invalid IDs
- Template rendering

### `utils/` - Utilities

#### `utils/badges.js`
Discord badge definitions and mappings:
- Maps Discord flag names to badge info
- Provides badge names and icon URLs
- Used by route handlers to display user badges

**Badge types:**
- Staff, Partner, Nitro
- HypeSquad variants
- Verified Bot/Developer
- Bug Hunter levels
- Moderator Alumni
- Active Developer

## Usage Examples

### Adding a New Route

1. Open `src/routes/index.js`
2. Add your route handler:

```javascript
router.get('/my-route', (req, res) => {
    res.render('my-view', {
        data: 'value'
    });
});
```

### Adding a Utility

1. Create `src/utils/my-utility.js`:

```javascript
module.exports = {
    myFunction: (param) => {
        // Your logic here
        return result;
    }
};
```

2. Import in your route:

```javascript
const myUtility = require('../utils/my-utility');
```

### Accessing Configuration

In any file:

```javascript
const config = require('./config');

console.log(config.PORT);
console.log(config.TOKEN);
```

### Accessing Discord Client

The Discord client is stored in Express app locals:

```javascript
router.get('/my-route', async (req, res) => {
    const client = req.app.get('discordClient');
    const user = await client.users.fetch('123456789');
    res.json(user);
});
```

## Best Practices

1. **Separation of Concerns**
   - Routes handle HTTP requests/responses
   - Utils contain reusable logic
   - Config is centralized

2. **Error Handling**
   - Always use try-catch for async operations
   - Return meaningful error messages
   - Log errors for debugging

3. **Code Style**
   - Use const/let, not var
   - Use arrow functions for callbacks
   - Add comments for complex logic
   - Follow existing patterns

4. **Async/Await**
   - Prefer async/await over .then()
   - Handle errors with try-catch
   - Don't forget to await async calls

## Testing Changes

After modifying source files:

```bash
# Restart the server
npm start

# Or for development with auto-reload (if nodemon is installed)
npm run dev
```

## Common Issues

### "Cannot find module"
- Check relative paths in require statements
- Ensure file exists at specified path
- Use `../` to go up directories

### "Configuration not found"
- Ensure config.js or .env file exists
- Check file is in correct location
- Verify file is not in .gitignore

### Discord client errors
- Verify bot token is correct
- Check bot has proper intents
- Ensure network connectivity

## Related Documentation

- [Architecture Overview](../docs/DEVELOPMENT.md)
- [Contributing Guide](../CONTRIBUTING.md)
- [Configuration Options](./config/config.example.js)

## File Modification Guidelines

When editing source files:

1. **Test locally** before committing
2. **Update documentation** if behavior changes
3. **Maintain backward compatibility** when possible
4. **Follow existing code patterns**
5. **Add comments** for complex logic

## Need Help?

- Check the [Development Guide](../docs/DEVELOPMENT.md)
- Review existing code for examples
- Open an issue on GitHub
- Ask in project discussions
