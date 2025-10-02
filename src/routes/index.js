const express = require('express');
const router = express.Router();
const Badges = require('../utils/badges');
const moment = require('moment');

moment.locale('en');

// Home route
router.get('/', (req, res) => {
    res.render('index', {
        error: null
    });
});

// Whois POST route
router.post('/whois', async (req, res) => {
    if (req.body.user) res.redirect(`/${req.body.user}`);
    else res.redirect('/404');
});

// User profile route
router.get('/:userID', async (req, res) => {
    const userid = req.params.userID;
    const client = req.app.get('discordClient');

    const user = userid === client.user.id ? client.user : await client.users.fetch(getID(userid)).catch(e => {});
    if (!user) return res.render('index', {
        error: 'Invalid user ID !'
    });
    if (!user.flags) await user.fetchFlags();
    let flags = [];
    let Flags;

    if (user.flags === null) {
    } else {
        Flags = user.flags.toArray();
        if (user.bot && Flags.includes('VERIFIED_BOT')) user.verified = true;
        flags = Flags.filter(b => !!Badges[b]).map(m => Badges[m]);
        if (user.avatar && user.avatar.startsWith('a_')) flags.push(Badges['DISCORD_NITRO']);
        if (user.flags.has(1 << 18)) flags.push(Badges['CERTIFIED_MODERATOR']);
        if (user.flags.has(1 << 17)) flags.push(Badges['VERIFIED_DEVELOPER']);
        if (user.flags.has(1 << 22) && !flags.includes(Badges['ACTIVE_DEVELOPER'])) {
            flags.push(Badges['ACTIVE_DEVELOPER']);
        }
        if (user.bot) {
            flags.push(Badges['BOT']);
        }
    }

    return res.render('user', {
        user,
        flags,
        moment
    });
});

// 404 route
router.all(/(.*)/, (req, res) => {
    return res.render('404');
});

function getID(source) {
    return source;
}

module.exports = router;
