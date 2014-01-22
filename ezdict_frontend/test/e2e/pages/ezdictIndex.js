/**
 * This is an object representing the index page
 * @module EzdictIndex
 */
module.exports = function () {
    this.emailInput = element(by.model('user.email'));
    this.nicknameInput = element(by.model('user.nickname'));
    this.passwordInput = element(by.model('password'));
    this.loginInput = element(by.model('loginData.username'));
    this.loginPasswordInput = element(by.model('loginData.password'));
    this.registerButton = element(by.id('reg-button'));
    this.completeRegisterButton = element(by.className('reg-button'));
    this.loginButton = element(by.id('login-button'));
    this.completeLoginButton = element(by.css('.login-form button'));

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

    this.setLogin = function (value) {
        this.loginInput.sendKeys(value);
    }

    this.setLoginPassword = function (value) {
        this.loginPasswordInput.sendKeys(value);
    }

    this.login = function () {
        this.loginButton.click();
        this.setLogin('protractor@protractor.com');
        this.setLoginPassword('protractor');
        this.completeLoginButton.click();
    }
};
