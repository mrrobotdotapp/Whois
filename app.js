const express = require("express")
const app = express()
const config = require("./config")
const client = new (require("discord.js")).Client()
const Badges = require("./Badges")
const PORT = config.PORT || 3000

const moment = require('moment')
moment.locale('fr')

client.on("ready", () => {
    client.user.setStatus("invisible")
})

client.login(config.TOKEN)

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
        error: "Invalid user ID!"
    })
    if (!user.flags) await user.fetchFlags()

    const Flags = user.flags.toArray()
    if (user.bot && Flags.includes("VERIFIED_BOT")) user.verified = true
    const flags = Flags.filter(b => !!Badges[b]).map(m => Badges[m])
    if (user.avatar && user.avatar.startsWith("a_")) flags.push(Badges["DISCORD_NITRO"])
    if (user.bot) {
        flags.push(Badges["BOT"])
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
    const tokenRegex = /([MN][A-Za-z\d]{23})\.([\w-]{6})\.([\w-]{27})/
    const isToken = tokenRegex.test(source)
    if (isToken) {
        const base64 = source.split(".")[0]
        const id = Buffer.from(base64, 'base64').toString()
        return id
    }
    return source
}
