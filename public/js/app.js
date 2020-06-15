var stockUpdaterModel = (function () {

    const stocksAndPrices = new Map();

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


var stockUpdaterView = (function () {

    const DOMstrings = {
        STOCK_LIST: "stock__list",
        STOCK_LIST_ITEM: "stock__list--item",
        STOCK_NAME: "stock__name",
        STOCK_SYMBOL: "stock__symbol",
        STOCK_PRICE: "stock__price",
        STOCK_PRICE_TEXT: "stock__price--text",
        STOCK_PRICE_OPEN: "stock__price--open",
        STOCK_PRICE_CLOSE: "stock__price--close",
        STOCK_PRICE_LOW: "stock__price--low",
        STOCK_PRICE_HIGH: "stock__price--high"

    }

    const addStockListItem = function (name, symbol) {
        const listItem = document.createElement("LI");
        listItem.className = `${DOMstrings.STOCK_LIST_ITEM} item__${symbol}`;
        const innerHtml = `
        <span class=${DOMstrings.STOCK_SYMBOL}>${symbol}</span>
        <span class=${DOMstrings.STOCK_PRICE_TEXT}>open</span>
        <span class="${DOMstrings.STOCK_PRICE} ${DOMstrings.STOCK_PRICE_OPEN}"></span>
        <span class=${DOMstrings.STOCK_PRICE_TEXT}>close</span>
        <span class="${DOMstrings.STOCK_PRICE} ${DOMstrings.STOCK_PRICE_CLOSE}"></span>
        <span class=${DOMstrings.STOCK_PRICE_TEXT}>low</span>
        <span class="${DOMstrings.STOCK_PRICE} ${DOMstrings.STOCK_PRICE_LOW}"></span>
        <span class=${DOMstrings.STOCK_PRICE_TEXT}>high</span>
        <span class="${DOMstrings.STOCK_PRICE} ${DOMstrings.STOCK_PRICE_HIGH}"></span>
        `;
        listItem.innerHTML = innerHtml;
        document.querySelector(`.${DOMstrings.STOCK_LIST}`).appendChild(listItem);
    }

    const renderPrice = function (symbol, price) {
        const item = document.querySelector(`.item__${symbol}`);
        item.querySelector(`.${DOMstrings.STOCK_PRICE_OPEN}`).textContent = price.open.toFixed(2);
        item.querySelector(`.${DOMstrings.STOCK_PRICE_CLOSE}`).textContent = price.close.toFixed(2);
        item.querySelector(`.${DOMstrings.STOCK_PRICE_LOW}`).textContent = price.low.toFixed(2);
        item.querySelector(`.${DOMstrings.STOCK_PRICE_HIGH}`).textContent = price.high.toFixed(2);
    }

    return {
        addStockListItem: addStockListItem,
        renderPrice: renderPrice
    }

})()


var stockUpdaterController = (function (model, view) {
    refreshStockPrices = function () {
        model.getStockList().forEach(({
            symbol
        }) => {
            model.refreshStockPrice(symbol)
                .then(stockPrices => model.setStockPrice(symbol, stockPrices.data[0]))
                .catch(error => console.log(error))
        })
    }

    updateUI = function () {
        setTimeout(() => {
            model.getDirtyStocks().forEach(({
                symbol,
                price
            }) => {
                view.renderPrice(symbol, price);
            })

        }, 2000)
    }

    const init = function () {
        model.init();
        model.getStockList().forEach(({
            name,
            symbol
        }) => view.addStockListItem(name, symbol))
        refreshStockPrices();
        updateUI();
    }


    return {
        init: init
    }


})(stockUpdaterModel, stockUpdaterView);

stockUpdaterController.init();