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