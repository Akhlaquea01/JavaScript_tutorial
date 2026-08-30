/**
 * Runs async tasks with a concurrency limit; once the limit is reached,
 * new tasks wait in a FIFO queue until a running task finishes.
 * Time: O(1) per addTask  Space: O(n) queued tasks
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