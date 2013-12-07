/**
 * This is an object representing the index page
 * @module EzdictIndex
 */
module.exports = function () {
    this.emailInput = element(by.model('user.email'));
    this.nicknameInput = element(by.model('user.nickname'));
    this.passwordInput = element(by.model('user.password'));

    this.get = function () {
        browser.get('http://ezdict.loc');
    };

    this.setEmail = function (value) {
        this.emailInput.sendKeys(value);
    };

    this.setNickname = function (value) {
        this.nicknameInput.sendKeys(value);
    };

    this.setPassword = function (value) {
        this.passwordInput.sendKeys(value);
    };
};