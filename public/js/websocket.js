{

    const stocks = {
        MSFT: 0,
        AMZN: 0,
        AAPL: 0,
        GOOGL: 0
    }
    /**
     * Web Socket - get Stock prices using finnhub.io - Stream real-time trades for US stocks, forex and crypto. 
     */

    const socket = new WebSocket('wss://ws.finnhub.io?token=brig0b7rh5rf00gkcetg');

    // Connection opened -> Subscribe
    socket.addEventListener('open', function (event) {
        socket.send(JSON.stringify({
            'type': 'subscribe',
            'symbol': 'MSFT'
        }))
        socket.send(JSON.stringify({
            'type': 'subscribe',
            'symbol': 'AMZN'
        }))
        socket.send(JSON.stringify({
            'type': 'subscribe',
            'symbol': 'AAPL'
        }))
        socket.send(JSON.stringify({
            'type': 'subscribe',
            'symbol': 'GOOGL'
        }))
    });


    // Listen for messages
    socket.addEventListener('message', function (event) {
            const { s, p } = JSON.parse(event.data).data[0];
            if (s && p && p !== stocks[s]) {
                stocks[s] = p;
                document.querySelector(`.price__${s}`).textContent = p.toFixed(2);
            }     
    });



    // Unsubscribe
    var unsubscribe = function (symbol) {
        socket.send(JSON.stringify({
            'type': 'unsubscribe',
            'symbol': symbol
        }))
    }

}