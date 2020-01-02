const Validator = require('./../../../Validator.js');

exports.tests = function () {
    before(function () {
        this.msg = this.create();
    });

    it('testJson', function (done) {
        Validator.validateJson(this.msg, this.getExpectedParameters());
        done();
    });
};