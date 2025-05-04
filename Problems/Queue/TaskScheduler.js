/**
 * The task is to build a task scheduler that can limit the number of tasks running concurrently. The scheduler should have a concurrency limit, and when the number of running tasks reaches this limit, any new tasks should be placed in a waiting queue until a running task finishes.
 */
class TaskScheduler {
    constructor(concurrencyLimit) {
        this.concurrencyLimit = concurrencyLimit;
        this.runningTasks = 0;
        this.taskQueue = [];
    }

    async _taskRunner(task) {
        this.runningTasks++;
        try {
            await task();
        } catch (error) {
            console.error("Task failed:", error);
        } finally {
            this.runningTasks--;
            this._getNextTask();
        }
    }

    addTask(task) {
        if (this.runningTasks < this.concurrencyLimit) {
            this._taskRunner(task);
        } else {
            this.taskQueue.push(task);
        }
    }

    _getNextTask() {
        if (this.taskQueue.length > 0 && this.runningTasks < this.concurrencyLimit) {
            const nextTask = this.taskQueue.shift();
            this._taskRunner(nextTask);
        }
    }
}

// Example usage:
const scheduler = new TaskScheduler(2);

const createTask = (id, duration) => async () => {
    console.log(`Task ${id} started`);
    await new Promise(resolve => setTimeout(resolve, duration));
    console.log(`Task ${id} finished`);
};

scheduler.addTask(createTask(1, 2000));
scheduler.addTask(createTask(2, 1000));
scheduler.addTask(createTask(3, 3000));
scheduler.addTask(createTask(4, 1500));