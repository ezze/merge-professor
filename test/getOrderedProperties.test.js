import chai from 'chai';
chai.should();

import getOrderedProperties from '../src/getOrderedProperties';

describe('get ordered properties', () => {
    const o = { id: 25994, name: 'Terra', visible: true };

    it('empty object and empty fields', () => {
        getOrderedProperties({}, []).should.deep.equal([]);
    });

    it('empty object and one field', () => {
        getOrderedProperties({}, ['id']).should.deep.equal([]);
    });

    it('empty fields', () => {
        getOrderedProperties(o, []).should.deep.equal([]);
    });

    it('one field', () => {
        getOrderedProperties(o, ['id']).should.deep.equal([
            { name: 'id', value: 25994 }
        ]);
    });

    it('two fields', () => {
        getOrderedProperties(o, ['name', 'id']).should.deep.equal([
            { name: 'name', value: 'Terra' },
            { name: 'id', value: 25994 }
        ]);
    });

    it('missed fields', () => {
        getOrderedProperties(o, ['identifier', 'name']).should.deep.equal([
            { name: 'name', value: 'Terra' }
        ]);
    });
});
