const _uuid = function () {
    return Math.random().toString(16).slice(2);
};

export { _uuid };