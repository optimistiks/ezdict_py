var EzdictIndex = require('./pages/ezdictIndex');

describe('angularjs homepage', function () {
    it('should greet the named user', function () {
        var ezdictIndex = new EzdictIndex();
        console.log(ezdictIndex);
        ezdictIndex.get();

        ezdictIndex.setNickname('Julie');

        expect(ezdictIndex.nicknameInput.getText()).toEqual('Hello Julie!');
    });
});