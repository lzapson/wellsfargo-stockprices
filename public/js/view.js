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