import fetch from "node-fetch"

const Redis = require("ioredis")

const NOMICS_API_ENDPOINT = "https://api.nomics.com/v1"
const NOMICS_API_KEY = process.env.NOMICS_API_KEY
const NOMICS_CURRENCY_NAME = "BNB"

const BNB_PRICE_REDIS_KEY = "bnb_price"
const BNB_PRICE_EXPIRE_SECONDS = 10

module.exports = async (req, res) => {
    const client = new Redis(process.env.REDIS_URL)

    let price = 0

    // check if bnb price is cached
    const isCached = await client.exists(BNB_PRICE_REDIS_KEY)

    if (isCached) {
        price = await client.get(BNB_PRICE_REDIS_KEY)
    } else {
        price = await fetchPrice()
        await client.set(BNB_PRICE_REDIS_KEY, price)
        await client.expire(BNB_PRICE_REDIS_KEY, BNB_PRICE_EXPIRE_SECONDS)
    }

    res.json({ price: Number(price) })
}

async function fetchPrice() {
    const url = `${NOMICS_API_ENDPOINT}/exchange-rates?key=${NOMICS_API_KEY}`

    const response = await fetch(url)
    const json = await response.json()

    for (let currency of json) {
        if (currency.currency !== NOMICS_CURRENCY_NAME) continue

        return currency.rate
    }

    return 0
}