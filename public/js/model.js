var stockUpdaterModel = (function () {

    const stocksAndPrices = new Map();

    const stockList = [{
        name: "Microsoft",
        symbol: "MSFT",
    },
    {
        name: "Amazon",
        symbol: "AMZN"
    },
    {
        name: "Apple",
        symbol: "AAPL"
    },
    {
        name: "Google",
        symbol: "GOOGL"
    }
]

    class Stock {
        isDirty = false;
        price = {};
        constructor(name, symbol) {
            this.name = name;
            this.symbol = symbol;
        }
        setDirty(isDirty) {
            this.isDirty = isDirty;
        }
    }

    const init = function () {
        stockList.forEach(({
            name,
            symbol
        }) => {
            const newStock = new Stock(name, symbol);
            stocksAndPrices.set(symbol, newStock);
        })
    }

    const getStockList = function () {
        return stockList;
    }

    const setStockPrice = function (symbol, price) {
        const stock = stocksAndPrices.get(symbol);
        if (stock && (stock.price.low !== price.low || stock.price.high !== price.high)) {
            stock.price = {
                ...price
            };
            stock.isDirty = true;
        }
    }

    const getDirtyStocks = function () {
        const dirtyList = [];
        stocksAndPrices.forEach(({
            isDirty,
            price
        }, key) => {
            if (isDirty) {
                isDirty = false;
                dirtyList.push({
                    symbol: key,
                    price
                })
            }
        })
        return dirtyList;
    }

    const refreshStockPrice = async function (symbol) {
        try {
            const response = await fetch(`/api/?symbol=${symbol}`)
            return response.json();
        } catch (error) {

        }

    }

    return {
        init: init,
        getStockList: getStockList,
        refreshStockPrice: refreshStockPrice,
        setStockPrice: setStockPrice,
        getDirtyStocks: getDirtyStocks
    }

})();