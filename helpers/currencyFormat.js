function currencyFormat(number) {
    return number.toLocaleString("id-ID", {style:"currency", currency:"IDR"});
};

module.exports = currencyFormat;