var EzdictDashboard = require('./pages/ezdictDashboard');
var EzdictIndex = require('./pages/ezdictIndex');

describe('dashboard page', function () {
    var ezdictDashboard,
        ezdictIndex,
        ptor = protractor.getInstance(),
        SLEEP_TIMEOUT = 4000;

    ezdictIndex = new EzdictIndex();
    ezdictIndex.get();
    ezdictIndex.loginButton.click();
    ezdictIndex.setLogin('protractor@protractor.com');
    ezdictIndex.setLoginPassword('protractor');
    ezdictIndex.completeLoginButton.click();
    ptor.sleep(SLEEP_TIMEOUT);

    beforeEach(function () {
        ezdictDashboard = new EzdictDashboard();
        ezdictDashboard.get();
        ptor.driver.executeScript('$.fx.off = true;');
    });

    it('checks user logout', function () {
        ezdictDashboard.logoutButton.click();
        ptor.sleep(SLEEP_TIMEOUT);
        expect(ptor.getCurrentUrl()).not.toContain('/home');
        ptor.manage().deleteAllCookies();
    });
});
