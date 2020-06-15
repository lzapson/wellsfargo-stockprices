const fs = require('fs')
const url = require('url')
const express = require('express')
const axios = require('axios')
const WebSocket = require('ws')


/**
 * Web Socket - get Stock prices using finnhub.io - Stream real-time trades for US stocks, forex and crypto. 
 */

// var ws = new WebSocket('wss://api.tiingo.com/iex');

// var subscribe = {
//     'eventName':'subscribe',
//     'authorization': '4f329d3ebe77b1634915729f96b1f9b244f318ae',
//     'eventData': {
//         'thresholdLevel': 5,
//         'tickers': ['spy']
//     }
// }
// ws.on('open', function open() {
//     ws.send(JSON.stringify(subscribe));
// });

// ws.on('message', function(data, flags) {
//     console.log(data)
// });


// const socket = new WebSocket('wss://ws.finnhub.io?token=brig0b7rh5rf00gkcetg');

// // Connection opened -> Subscribe
// socket.addEventListener('open', function (event) {
//     socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}))
//     // socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'C'}))
//     // socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'BAC'}))
//     // socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'JPM'}))
// });

// // Listen for messages
// socket.addEventListener('message', function (event) {
//     console.log('Message from server ', event.data);
// });

// // Unsubscribe
//  var unsubscribe = function(symbol) {
//     socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}))
// }


/**
 * Express Server
 */

const app = express();

// Express server access to static HTML 
app.use(express.static('public'))

// Dynamic HTML using templates
let tickerHtml = fs.readFileSync(`${__dirname}/templates/ticker.html`, 'utf-8')
tickerHtml = tickerHtml.replace('{%SYMBOL%}', "BAC")


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

app.get('/websocket', (req, res) => {
    res
        .status(200)
        .json({
            "tickerHtml": tickerHtml
        })
})

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