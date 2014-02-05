var EzdictIndex = require('./pages/ezdictIndex');

describe('index page', function () {
    var ezdictIndex,
        timestamp = Date.now(),
        ptor = protractor.getInstance(),
        SLEEP_TIMEOUT = 4000;

    beforeEach(function () {
        ezdictIndex = new EzdictIndex();
        ezdictIndex.get();
        ptor.driver.executeScript('$.fx.off = true;');
    });

    it('checks user registration', function () {
        console.log('Testing index page...');
        ezdictIndex.registerButton.click();
        ezdictIndex.setEmail('test@test.test' + timestamp);
        ezdictIndex.setNickname('test' + timestamp);
        ezdictIndex.setPassword('test' + timestamp);
        ezdictIndex.completeRegisterButton.click();
        ptor.sleep(SLEEP_TIMEOUT);
        expect(ptor.getCurrentUrl()).toContain('/home');
        ptor.manage().deleteAllCookies();
    });

    it('checks user login', function () {
        ezdictIndex.loginButton.click();
        ezdictIndex.setLogin('test@test.test' + timestamp);
        ezdictIndex.setLoginPassword('test' + timestamp);
        ezdictIndex.completeLoginButton.click();
        ptor.sleep(SLEEP_TIMEOUT);
        expect(ptor.getCurrentUrl()).toContain('/home');
        ptor.manage().deleteAllCookies();
    });
});
