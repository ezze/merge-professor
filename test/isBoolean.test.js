import chai from 'chai';
chai.should();

import isBoolean from '../src/isBoolean';

describe('is boolean', () => {
    it('boolean is boolean', () => {
        isBoolean(false).should.equal(true);
        isBoolean(true).should.equal(true);
    });

    it('array is not boolean', () => {
        isBoolean([1, 2, 3]).should.equal(false);
    });

    it('object is not boolean', () => {
        isBoolean({ foo: 'bar' }).should.equal(false);
    });

    it('null is not boolean', () => {
        isBoolean(null).should.equal(false);
    });

    it('number is not boolean', () => {
        isBoolean(0).should.equal(false);
        isBoolean(1).should.equal(false);
    });

    it('string is not boolean', () => {
        isBoolean('hello world').should.equal(false);
    });

    it('function is not boolean', () => {
        isBoolean(() => {}).should.equal(false);
    });

    it('date is not boolean', () => {
        isBoolean(new Date()).should.equal(false);
    });
});
