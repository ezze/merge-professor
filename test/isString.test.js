import chai from 'chai';
chai.should();

import isString from '../src/isString';

describe('is string', () => {
    it('string is string', () => {
        isString('hello world').should.equal(true);
    });

    it('array is not string', () => {
        isString([1, 2, 3]).should.equal(false);
    });

    it('object is not string', () => {
        isString({ foo: 'bar' }).should.equal(false);
    });

    it('null is not string', () => {
        isString(null).should.equal(false);
    });

    it('number is not string', () => {
        isString(2.4).should.equal(false);
    });

    it('boolean is not string', () => {
        isString(true).should.equal(false);
    });

    it('function is not string', () => {
        isString(() => {}).should.equal(false);
    });

    it('date is not string', () => {
        isString(new Date()).should.equal(false);
    });
});
