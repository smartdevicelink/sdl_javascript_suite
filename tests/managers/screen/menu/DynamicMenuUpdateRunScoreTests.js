const SDL = require('../../../config.js').node;

const Validator = require('../../../Validator');
const Test = require('../../../Test.js');

module.exports = function (appClient) {
    describe('DynamicMenuUpdateRunScoreTests', function () {
        it('testSettersAndGetters', function () {
            const oldStatus = [SDL.manager.screen.menu.enums._MenuCellState.KEEP, SDL.manager.screen.menu.enums._MenuCellState.DELETE];
            const updatedStatus = [SDL.manager.screen.menu.enums._MenuCellState.KEEP, SDL.manager.screen.menu.enums._MenuCellState.ADD];
            const runScore = new SDL.manager.screen.menu._DynamicMenuUpdateRunScore(oldStatus, updatedStatus, Test.GENERAL_INT);

            Validator.assertEquals(runScore.getScore(), Test.GENERAL_INT);
            Validator.assertEquals(runScore.getOldStatus(), oldStatus);
            Validator.assertEquals(runScore.getUpdatedStatus(), updatedStatus);
        });
    });
};