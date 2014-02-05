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

    /**
     * устанавливает поисковый запрос в строку поиска по контенту
     * @param query
     */
    this.setSearchQuery = function (query) {
        this.searchInput.sendKeys(query);
    };

    /**
     * кнопка "добавить материалы"
     * @returns {*}
     */
    this.addContentButton = function () {
        return element(by.css('[data-test-id="addContentButton"]'));
    };

    /**
     * кнопка "сохранить" при добавлении текстов
     * @returns {*}
     */
    this.saveTextButton = function () {
        return element(by.css('[data-test-id="saveTextButton"]'));
    };

    /**
     * ссылка "работать над текстом"
     * @returns {*}
     */
    this.textToWorkLink = function () {
        return element(by.css('[data-test-id="textToWorkLink"]'));
    };

    /**
     * поле "название текста"
     * @returns {*}
     */
    this.textTitleInput = function () {
        return element(by.model('text.title'));
    };

    /**
     * устанавливает название текста
     * @param title
     */
    this.setTextTitle = function (title) {
        this.textTitleInput().sendKeys(title);
    };

    /**
     * поле "источник текста"
     * @returns {*}
     */
    this.textSourceInput = function () {
        return element(by.model('text.source'));
    };

    /**
     * устанавливает источник текста
     * @param source
     */
    this.setTextSource = function (source) {
        this.textSourceInput().sendKeys(source);
    };

    /**
     * устанавливает содержимое текста
     * @param content
     */
    this.setTextContent = function (content) {
        var driver = protractor.getInstance().driver;
        driver.executeScript('CKEDITOR.instances.addTextCkeditor.setData("' + content + '")');
        driver.executeScript('CKEDITOR.instances.addTextCkeditor.focus()');
    };
};
