const expect = require('chai').expect;
const SDL = require('../config.js').node;

const Validator = require('../Validator');

module.exports = function (appClient) {
    describe('TaskTests', function () {
        it('testTaskGetterSetter', function (done) {
            const callback = () => {};
            // test getter/setters
            const tester = new SDL.manager._Task('sweet');
            tester.setCallback(callback)
                .setIsConcurrent(true)
                .setPriority(7);

            Validator.assertEquals('sweet', tester.getName());
            Validator.assertEquals(callback, tester.getCallback());
            Validator.assertEquals(true, tester.getIsConcurrent());
            Validator.assertEquals(7, tester.getPriority());

            tester.setName('sour');

            Validator.assertEquals('sour', tester.getName());

            Validator.assertEquals(SDL.manager._Task.READY, tester.getState());
            expect(tester.getId()).to.exist;

            done();
        });

        it('testTaskSwitchStates', function (done) {
            let callbackCalled = false;

            const callback = (oldState, newState) => {
                Validator.assertEquals(SDL.manager._Task.READY, oldState);
                Validator.assertEquals(SDL.manager._Task.CANCELED, newState);
                callbackCalled = true;
            };

            const tester = new SDL.manager._Task();
            tester.setCallback(callback);
            tester.switchStates(SDL.manager._Task.CANCELED);

            Validator.assertEquals(true, callbackCalled);

            done();
        });

        it('testTaskRunner', function (done) {
            let executeCalled = false;

            const tester = new SDL.manager._Task();
            tester.onExecute = (task) => {
                // task should be in progress when running
                executeCalled = true;
                Validator.assertEquals(SDL.manager._Task.IN_PROGRESS, task.getState());
            };
            tester.run()
                .then(() => {
                    // task should be finished once the async function ends
                    Validator.assertEquals(SDL.manager._Task.FINISHED, tester.getState());
                    Validator.assertEquals(true, executeCalled);
                    done();
                });
        });
    });
};