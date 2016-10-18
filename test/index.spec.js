import {describe, it} from 'mocha';
import chai, {assert} from 'chai';
import {dupa} from './../app/to_be_tested'
/* eslint-disable func-names, prefer-arrow-callback */

describe('Mocha Timeout', function () {
    this.timeout(500);
    var arr = [];
    assert.equal(arr.length, 0);

    it('should take around 300ms', function (done) {
        setTimeout(done, 300);
    });

    it('should take around 250ms', function (done) {
        setTimeout(done, 250);
    });

    it('should return foo', () => {
        assert.equal(dupa(), 'foo');
    });
});

/* eslint-enable func-names, prefer-arrow-callback */