![Whois](docs/whois.png#gh-light-mode-only)
![Whois](docs/whois-dark.png#gh-dark-mode-only)

> [!WARNING]
> **This project is deprecated.** It is no longer maintained and will not receive updates or bug fixes. For more information, see the [official documentation](https://docs.mrrobot.app/en/whoismrrobotapp).

Get information about Discord users and bots by ID.

## Advantages
- Get information like ID, Username, Discriminator, if it is a bot, created at, total numbers since created.
- If it is a bot, you can directly add the bot from this page.
- **PWA & TWA ready** ! Transform to Android app easily.
- Good Performance and accessibility.
- Nice blurple.
- See the Discord profile
- Well-organized project structure

## Preview

| Home page                                                                                                                          | A profile                                                                                                                      |
|------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------|
| ![Preview of the home page](https://user-images.githubusercontent.com/14293805/162551251-c0976578-cb35-45cb-b2e3-dc667e57b003.png) | ![Preview of a profile](https://user-images.githubusercontent.com/14293805/162551265-2af18a7e-decf-4f96-9449-e585ba6d8535.png) |

## Project Structure

```
Whois/
├── src/
│   ├── app.js              # Main Express application
│   ├── config/             # Configuration files
│   ├── routes/             # Application routes
│   └── utils/              # Utility functions
├── public/                 # Static files
│   ├── .well-known/        # TWA configuration
│   └── manifest.json       # PWA/TWA manifest
├── views/                  # EJS templates
└── index.js                # Entry point
```

## How to install it?

### Option 1: Using .env file (Recommended)
1. Copy `.env.example` to `.env` and fill in your Discord bot token
2. Install all packages with `yarn` or `npm i`
3. Run with `npm start` or `npm run dev`

### Option 2: Using config.js
1. Copy `src/config/config.example.js` to `src/config/config.js` and fill it in with your Discord bot token
2. Install all packages with `yarn` or `npm i`
3. Run with `npm start` or `npm run dev`

## TWA (Trusted Web Activity) Setup

This application is ready to be transformed into an Android app using TWA technology.

**Quick Links:**
- 🚀 [Quick Start Guide](docs/QUICK_START_TWA.md) - Get your Android app in minutes
- 📖 [Complete TWA Setup Guide](docs/TWA_SETUP.md) - Detailed documentation
- ✅ Validate TWA readiness: `npm run validate-twa`

## Thanks to Sponsors 

![Sponsors](https://cdn.jsdelivr.net/gh/thomasbnt/sponsors/sponsors.svg)

If you like this project, don't hesitate to [become a Sponsor](https://github.com/thomasbnt/sponsors), it would support me for the maintenance of several Open Source projects! You can also check my Buy Me a Coffee page for a one-off donation or monthly membership.

[![GitHub Sponsors](https://img.shields.io/badge/GitHub%20Sponsor-%23EA54AE.svg?&style=for-the-badge&logo=github-sponsors&logoColor=white)](https://github.com/sponsors/thomasbnt) [![Support me on Buy Me a Coffee](https://img.shields.io/badge/Support%20me-on%20Buy%20Me%20a%20Coffee-%23FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=white)](https://www.buymeacoffee.com/thomasbnt?via=thomasbnt)

## Made with 💚

<code><img height="20" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/css/css.png"></code> **CSS3** - Style homemade with Discord primary colors (Front-end)

<code><img height="20" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png"></code> **[Discord.js](https://github.com/discordjs/discord.js)** - Library for interacting with the Discord API (Back-end)  

<code><img height="20" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/express/express.png"></code> **[Express.js](https://github.com/expressjs/express)** (Back-end)  

## Licence

The source code is public is under [AGPL-3.0 License](LICENSE). However, the logo <code><img height="20" src="https://whois.mrrobot.app/img/whois.png"></code> is not.
