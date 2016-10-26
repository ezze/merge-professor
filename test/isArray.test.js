import chai from 'chai';
chai.should();

import isArray from '../src/isArray';

describe('is array', () => {
    it('empty array is array', () => {
        isArray([]).should.equal(true);
    });

    it('non-empty array is array', () => {
        isArray([1, 2, 3]).should.equal(true);
    });

    it('object is not array', () => {
        isArray({ foo: 'bar' }).should.equal(false);
    });

    it('null is not array', () => {
        isArray(null).should.equal(false);
    });

    it('boolean is not array', () => {
        isArray(true).should.equal(false);
    });

    it('number is not array', () => {
        isArray(2.4).should.equal(false);
    });

    it('string is not array', () => {
        isArray('hello world').should.equal(false);
    });

    it('function is not array', () => {
        isArray(() => {}).should.equal(false);
    });

    it('date is not array', () => {
        isArray(new Date()).should.equal(false);
    });
});
