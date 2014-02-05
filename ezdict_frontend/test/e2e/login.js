var EzdictIndex = require('./pages/ezdictIndex');

describe('login for further dashboard tests', function () {

    it('does a login', function () {
        console.log('\n...now we login for dashboard testing...');
        var ezdictIndex = new EzdictIndex();
        var ptor = protractor.getInstance();
        ezdictIndex.get();
        ptor.driver.executeScript('$.fx.off = true;');
        ezdictIndex.login();
    });

});

