var EzdictDashboard = require('../pages/ezdictDashboard');

describe('dashboard page', function () {
    var ezdictDashboard,
        ptor = protractor.getInstance();

    beforeEach(function () {
        ezdictDashboard = new EzdictDashboard();
        ezdictDashboard.get();
        ptor.driver.executeScript('$.fx.off = true;');
    });

    it('tests text opening', function () {
        ezdictDashboard.setSearchQuery('testagain');
        ezdictDashboard.searchButton.click();
        element(by.repeater('text in textSearchResult').row(0).column('title')).click();
        expect(element(by.css('[data-test-id="textHeader"]')).getText()).toEqual('testagain');
        expect(element(by.css('[data-test-id="textBody"]')).getText()).toBeDefined();
    });
});
