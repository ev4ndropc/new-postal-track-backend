const fetch = require('node-fetch')

const runCrons = async () => {
    const autoTracker = await fetch(`${process.env.APP_URL}/queue/get`).then(r=>r.json())
}

setInterval(() => {
    runCrons()
}, 10000)