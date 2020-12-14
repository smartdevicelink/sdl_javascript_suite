class _DispatchGroup {
    constructor () {
        this._count = 0;
        this._runnable = null;
    }
    enter () {
        this._count++;
    }

    leave () {
        this._count--;
        run();
    }

    notify (runnable) {
        this.runnable = runnable;
        run();
    }

    run () {
        if (this._count <= 0 && this._runnable !== null) {
            this._runnable.run();
        }
    }
}

export { _DispatchGroup };