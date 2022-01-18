const Token = artifacts.require("./Token.sol");
const TokenSale = artifacts.require('./TokenSale.sol');

module.exports = function (deployer) {
    deployer.deploy(Token).then(function () {
        return deployer.deploy(TokenSale, Token.address, 100000);// price in eth = 0.0000000000001
    });
};