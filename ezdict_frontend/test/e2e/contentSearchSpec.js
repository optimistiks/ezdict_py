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

    it('tests content search', function () {
        ezdictDashboard.setSearchQuery('testagain');
        ezdictDashboard.searchButton.click();
        expect(element(ezdictDashboard.searchResultByRepeater.row(0).column('title')).getText()).toEqual('testagain');
        expect(element(ezdictDashboard.searchResultByRepeater.row(1).column('title')).getText()).toEqual('testagain');
    });

    afterEach(function () {
        ptor.manage().deleteAllCookies();
    });
});
