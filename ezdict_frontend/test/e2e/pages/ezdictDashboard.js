/**
 * This is an object representing the dashboard page
 * @module EzdictDashboard
 */
module.exports = function () {
    this.logoutButton = element(by.css('.exit-button button'));
    this.searchButton = element(by.css('button.search-button'));
    this.searchInput = element(by.css('input.content-search'));

    this.get = function () {
        browser.get('http://ezdict.loc/home');
    };

    this.setSearchQuery = function (query) {
        this.searchInput.sendKeys(query);
    }
};
