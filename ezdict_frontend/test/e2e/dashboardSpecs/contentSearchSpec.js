var EzdictDashboard = require('../pages/ezdictDashboard');

describe('dashboard page', function () {
    var ezdictDashboard,
        ptor = protractor.getInstance();

    beforeEach(function () {
        ezdictDashboard = new EzdictDashboard();
        ezdictDashboard.get();
        ptor.driver.executeScript('$.fx.off = true;');
    });

    it('tests content search', function () {
        ezdictDashboard.setSearchQuery('testagain');
        ezdictDashboard.searchButton.click();
        expect(element(by.repeater('text in textSearchResult').row(0).column('title')).getText()).toEqual('testagain');
        expect(element(by.repeater('text in textSearchResult').row(1).column('title')).getText()).toEqual('testagain');
    });
});
