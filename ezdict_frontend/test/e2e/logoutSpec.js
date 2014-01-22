var EzdictDashboard = require('./pages/ezdictDashboard');
var EzdictIndex = require('./pages/ezdictIndex');

describe('dashboard page', function () {
    var ezdictDashboard,
        ezdictIndex,
        ptor = protractor.getInstance(),
        SLEEP_TIMEOUT = 4000;

    it('checks user logout', function () {
        ezdictIndex = new EzdictIndex();
        ezdictIndex.get();
        ezdictIndex.login();
        ptor.sleep(SLEEP_TIMEOUT);
        ezdictDashboard = new EzdictDashboard();
        ezdictDashboard.get();
        ptor.driver.executeScript('$.fx.off = true;');
        ezdictDashboard.logoutButton.click();
        ptor.sleep(SLEEP_TIMEOUT);
        expect(ptor.getCurrentUrl()).not.toContain('/home');
        ptor.manage().deleteAllCookies();
    });
});
