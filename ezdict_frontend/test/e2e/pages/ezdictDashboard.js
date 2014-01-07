/**
 * This is an object representing the dashboard page
 * @module EzdictDashboard
 */
module.exports = function () {
    this.logoutButton = element(by.css('.exit-button button'));

    this.get = function () {
        browser.get('http://ezdict.loc/home');
    };
};
