var EzdictDashboard = require('../pages/ezdictDashboard');

describe('dashboard page', function () {
    var ezdictDashboard,
        ptor = protractor.getInstance();

    beforeEach(function () {
        ezdictDashboard = new EzdictDashboard();
        ezdictDashboard.get();
        ptor.driver.executeScript('$.fx.off = true;');
    });

    it('tests text adding', function () {
        ezdictDashboard.addContentButton().click();
        ezdictDashboard.setTextTitle('test');
        ezdictDashboard.setTextSource('test');
        ezdictDashboard.setTextContent('test');
        ezdictDashboard.saveTextButton().click();
        expect(ezdictDashboard.textToWorkLink().isDisplayed()).toBeTruthy();
    });
});
