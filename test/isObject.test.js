import chai from 'chai';
chai.should();

import isObject from '../src/isObject';

describe('is object', () => {
    it('empty object is object', () => {
        isObject({}).should.equal(true);
    });

    it('non-empty object is object', () => {
        isObject({ one: 1, two: 2, three: 3 }).should.equal(true);
    });

    it('array is not object', () => {
        isObject([1, 2, 3]).should.equal(false);
    });

    it('null is not object', () => {
        isObject(null).should.equal(false);
    });

    it('boolean is not object', () => {
        isObject(true).should.equal(false);
    });

    it('number is not object', () => {
        isObject(2.4).should.equal(false);
    });

    it('string is not object', () => {
        isObject('hello world').should.equal(false);
    });

    it('function is not object', () => {
        isObject(() => {}).should.equal(false);
    });

    it('date is not object', () => {
        isObject(new Date()).should.equal(false);
    });
});
