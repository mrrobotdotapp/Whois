const express = require('express');
const path = require('path');
const { Intents } = require('discord.js');
const client = new (require('discord.js')).Client({ intents: [Intents.FLAGS.GUILDS] });

// Load configuration
const config = require('./config');

const PORT = config.PORT || 3000;

// Initialize Express app
const app = express();

// Discord client setup
client.on('ready', () => {
    client.user.setPresence({ activities: [{ name: 'with Whois' }], status: 'offline' });
});

client.login(config.TOKEN).catch(err => {
    console.error('Failed to login to Discord:', err);
});

// Store Discord client in app for routes to access
app.set('discordClient', client);

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Middleware
app.use(express.static(path.join(__dirname, '../public'), { dotfiles: 'allow' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const routes = require('./routes');
app.use('/', routes);

// Start server
app.listen(PORT, () => {
    console.log(`Website running on port :${PORT}`);
});

module.exports = app;
