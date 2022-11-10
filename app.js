const express = require("express")
const app = express()
const config = require("./config")
const { Intents } = require('discord.js');
const client = new (require("discord.js")).Client({ intents: [Intents.FLAGS.GUILDS] })
const Badges = require("./Badges")
const PORT = config.PORT || 3000

const moment = require('moment')
moment.locale('en')

client.on("ready", () => {
    client.user.setPresence({ activities: [{ name: 'with Whois' }], status: 'offline' })
})

client.login(config.TOKEN).then(r => r)

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.render("index", {
        error: null
    })
})

app.post("/", async (req, res) => {
    if(req.body.user) res.redirect(`/${req.body.user}`)
    else res.redirect("/404")
})

app.get("/:userID", async (req, res) => {
    const userid = req.params.userID
    //if (!userid) return res.redirect("/404")

    const user = userid === client.user.id ? client.user : await client.users.fetch(getID(userid)).catch(e => {})
    if (!user) return res.render("index", {
        error: "Invalid user ID !"
    })
    if (!user.flags) await user.fetchFlags()
    let flags = []

    if (user.flags === null) {
        Flags = []
    } else {
        Flags = user.flags.toArray()
        if (user.bot && Flags.includes("VERIFIED_BOT")) user.verified = true
        flags = Flags.filter(b => !!Badges[b]).map(m => Badges[m])
        if (user.avatar && user.avatar.startsWith("a_")) flags.push(Badges["DISCORD_NITRO"])
        if (user.flags.has(1 << 18)) flags.push(Badges["CERTIFIED_MODERATOR"])
        if (user.flags.has(1 << 17)) flags.push(Badges["VERIFIED_DEVELOPER"])
        if(user.flags.has(1 << 22)) flags.push(Badges["ACTIVE_DEVELOPER"])
        if (user.bot) {
            flags.push(Badges["BOT"])
        }
    }

    return res.render("user", {
        user,
        flags,
        moment
    })
})

app.all("*", (req, res) => {
    return res.render("404")
})

app.listen(PORT, () => {
    console.log(`Website running on port :${PORT}`)
})


function getID(source) {
    return source
}
