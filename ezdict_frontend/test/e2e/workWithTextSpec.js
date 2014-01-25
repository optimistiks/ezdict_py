var EzdictDashboard = require('./pages/ezdictDashboard');
var EzdictIndex = require('./pages/ezdictIndex');

describe('dashboard page', function () {
    var ezdictDashboard,
        ezdictIndex,
        ptor = protractor.getInstance(),
        SLEEP_TIMEOUT = 4000,
        isAuthenticated = false;

    beforeEach(function () {
        ezdictDashboard = new EzdictDashboard();
        if (isAuthenticated === false) {
            ezdictIndex = new EzdictIndex();
            ezdictIndex.get();
            ezdictIndex.login();
            ptor.sleep(SLEEP_TIMEOUT);
            isAuthenticated = true;
        } else {
            ezdictDashboard.get();
        }
        ptor.driver.executeScript('$.fx.off = true;');
    });

    it('tests text opening', function () {
        ezdictDashboard.setSearchQuery('testagain');
        ezdictDashboard.searchButton.click();
        element(by.repeater('text in textSearchResult').row(0).column('title')).click();
        expect(element(by.css('[data-test-id="textHeader"]')).getText()).toEqual('testagain');
        expect(element(by.css('[data-test-id="textBody"]')).getText()).toBeDefined();
    });

    afterEach(function () {
        ptor.manage().deleteAllCookies();
    });
});
