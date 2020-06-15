const url = require('url')
const express = require('express')
const axios = require('axios')


/**
 * Express Server
 */

const app = express();

// Express server access to static HTML 
app.use(express.static('public'))


/**
 * API - get Stock prices using api.tiingo.com - A Reliable, Enterprise-Grade Financial Markets API
 */


async function getStock(symbol) {
    try {
        const response = await axios.get(`https://api.tiingo.com/tiingo/daily/${symbol}/prices`, {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Token 4f329d3ebe77b1634915729f96b1f9b244f318ae'
            }
        })
        return response.data

    } catch (error) {
        console.log(error)
    }
}



/**
 * Server Routes
 */

app.get('/api', (req, res) => {
    const {
        query
    } = url.parse(req.url, true);
    getStock(query.symbol).then(data => {
        res
            .status(200)
            .json({
                "data": data
            })
    })
})


// run server

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`)
})