const url = require('url')
const express = require('express')
const axios = require('axios')

async function getStock(symbol) {
        const response = await axios.get(`https://api.tiingo.com/tiingo/daily/${symbol}/prices`, {
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': 'Token 4f329d3ebe77b1634915729f96b1f9b244f318ae'
        }
    })
    return response.data
}

const app = express();

app.use(express.static('public'))

// Server

app.get('/', (req, res) => {
    res
        .status(200)
        .json({
            "message": "Hello from the server"
        })
})

app.get('/stocks', (req, res) => {
    const {pathname, query} = url.parse(req.url, true);
    getStock(query.symbol).then(data => {
        res
        .status(200)
        .json({
            "data": data
        })
    })
})

app.post('/', (req, res) => {
    res.send('You can post to this endpoint')
})


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`)
})