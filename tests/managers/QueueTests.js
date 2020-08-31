const SDL = require('../config.js').node;

const Validator = require('../Validator');

module.exports = function (appClient) {
    const queueTester = new SDL.manager._SubManagerBase(appClient._sdlManager._lifecycleManager);
    queueTester._handleTaskQueue();

    describe('QueueTests', function () {
        it('testQueueGetAndCancelTasks', async function () {
            // add three tasks and inspect the queue state
            const task1 = new SDL.manager._Task().setName('alpha');
            const task2 = new SDL.manager._Task().setName('beta');
            const task3 = new SDL.manager._Task().setName('gamma');

            queueTester._addTask(task1);
            queueTester._addTask(task2);
            queueTester._addTask(task3);

            const taskList = queueTester._getTasks();

            Validator.assertEquals('alpha', taskList[0].getName());
            Validator.assertEquals('beta', taskList[1].getName());
            Validator.assertEquals('gamma', taskList[2].getName());

            queueTester._cancelAllTasks('beta');

            Validator.assertEquals('alpha', taskList[0].getName());
            Validator.assertEquals('beta', taskList[1].getName());
            Validator.assertEquals('gamma', taskList[2].getName());
            Validator.assertEquals(SDL.manager._Task.READY, taskList[0].getState());
            Validator.assertEquals(SDL.manager._Task.CANCELED, taskList[1].getState());
            Validator.assertEquals(SDL.manager._Task.READY, taskList[2].getState());

            queueTester._cancelAllTasks();

            Validator.assertEquals('alpha', taskList[0].getName());
            Validator.assertEquals('beta', taskList[1].getName());
            Validator.assertEquals('gamma', taskList[2].getName());
            Validator.assertEquals(SDL.manager._Task.CANCELED, taskList[0].getState());
            Validator.assertEquals(SDL.manager._Task.CANCELED, taskList[1].getState());
            Validator.assertEquals(SDL.manager._Task.CANCELED, taskList[2].getState());

            // flush the task queue and enable task running
            queueTester._canRunTasks = true;

            await queueTester._invokeTaskQueue();
            Validator.assertEquals(0, taskList.length);
        });

        it('testQueuePriority', async function () {
            queueTester._canRunTasks = false;

            // add three tasks and inspect the queue state
            const task1 = new SDL.manager._Task().setName('alpha').setPriority(1);
            const task2 = new SDL.manager._Task().setName('beta').setPriority(-1);
            const task3 = new SDL.manager._Task().setName('gamma').setPriority(2);
            const task4 = new SDL.manager._Task().setName('delta').setPriority(1);

            queueTester._addTask(task1);
            queueTester._addTask(task2);
            queueTester._addTask(task3);
            queueTester._addTask(task4);

            const taskList = queueTester._getTasks();

            Validator.assertEquals('gamma', taskList[0].getName());
            Validator.assertEquals('alpha', taskList[1].getName());
            Validator.assertEquals('delta', taskList[2].getName());
            Validator.assertEquals('beta', taskList[3].getName());

            // flush the task queue and enable task running
            queueTester._cancelAllTasks();
            queueTester._canRunTasks = true;

            await queueTester._invokeTaskQueue();
        });

        it('testQueueBlocking', async function () {
            queueTester._canRunTasks = false;

            const task1 = new SDL.manager._Task().setName('alpha');
            const task2 = new SDL.manager._Task().setName('beta');
            const task3 = new SDL.manager._Task().setName('gamma');
            task1.onExecute = () => {};
            task2.onExecute = () => {};
            task3.onExecute = () => {};
            task2.switchStates(SDL.manager._Task.BLOCKED);

            queueTester._addTask(task1);
            queueTester._addTask(task2);
            queueTester._addTask(task3);

            queueTester._canRunTasks = true;
            await queueTester._invokeTaskQueue();

            // the second task should block the queue from running
            const taskList = queueTester._getTasks();
            Validator.assertEquals('beta', taskList[0].getName());
            Validator.assertEquals('gamma', taskList[1].getName());

            task2.switchStates(SDL.manager._Task.READY);
            await queueTester._invokeTaskQueue();
            Validator.assertEquals(0, taskList.length);
        });

        it('testQueueConcurrency', async function () {
            queueTester._canRunTasks = false;
            let taskCompleted = false;
            const sleep = async () => {
                await new Promise(res => setTimeout(res, 200));
            };
            const callbackFunc = (oldState, newState) => {
                if (newState === SDL.manager._Task.FINISHED) {
                    taskCompleted = true;
                }
            };
            const task1 = new SDL.manager._Task().setName('alpha')
                .setIsConcurrent(true)
                .setCallback(callbackFunc);
            const task2 = new SDL.manager._Task().setName('beta')
                .setIsConcurrent(true)
                .setCallback(callbackFunc);
            const task3 = new SDL.manager._Task().setName('gamma')
                .setIsConcurrent(true)
                .setCallback(callbackFunc);
            task1.onExecute = sleep;
            task2.onExecute = sleep;
            task3.onExecute = sleep;

            queueTester._addTask(task1);
            queueTester._addTask(task2);
            queueTester._addTask(task3);

            queueTester._canRunTasks = true;
            await queueTester._invokeTaskQueue();

            // this next section should execute immediately, as we are not waiting for the tasks to complete
            Validator.assertEquals(false, taskCompleted);

            // clean up
            queueTester._cancelAllTasks();
            await queueTester._invokeTaskQueue();
        });
    });
};