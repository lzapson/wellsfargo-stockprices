
var stockUpdaterModel = (function () {

    const StocksAndPrices = new Map();

    const stockList = [{
            name: "Wells Fargo & Co",
            symbol: "WFC",
        },
        {
            name: "Citigroup Inc",
            symbol: "C"
        },
        {
            name: "Bank of America Corp",
            symbol: "BAC"
        },
        {
            name: "JPMorgan Chase & Co.",
            symbol: "JPM"
        }
    ]

    class Stock {
        isDirty = false;
        price = null;
        constructor(name, symbol) {
            this.name = name;
            this.symbol = symbol;
        }

        setDirty(isDirty) {
            this.isDirty = isDirty;
        }

    }



    init = function () {
        stockList.forEach(stock => {
            const newStock = new Stock(stock.name, stock.symbol);
            StocksAndPrices.set(stock.symbol, newStock);
        })
        refreshStockPrices();
    }

    function refreshStockPrices() {
        StocksAndPrices.forEach((value, key) => {
            fetch(`/stocks/?symbol=${key}`).then(response => console.log(response.json()))
        })
    }

    return {
        init: function () {
            init();
        }
    }

})();


var stockUpdaterView = (function () {

})()


var stockUpdaterController = (function (model, view) {


    refreshStockPrices = function () {

    }

    setupListeners = function () {
        document.querySelector("#refresh-button").addEventListener('click', refreshStockPrices)
    }


    return {
        init: function () {
            model.init();
        }
    }


})(stockUpdaterModel, stockUpdaterView);

stockUpdaterController.init();

