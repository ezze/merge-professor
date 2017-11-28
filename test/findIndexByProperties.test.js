import chai from 'chai';
chai.should();

import isArray from '../src/isArray';
import each from '../src/each';

import findIndexByProperties from '../src/findIndexByProperties';

describe('find index by properties', () => {
    const test = (a, items) => {
        if (!isArray(items)) {
            items = [items];
        }

        each(items, item => {
            findIndexByProperties(a, item.properties).should.equal(item.result);
        });
    };

    const a = [
        { id: 25994, name: 'Terra', visible: true },
        { id: 27424, name: 'Aqua', visible: false },
        { id: 40069, name: 'Meteor-M №2' }
    ];

    const b = [
        'one',
        { id: 25994, name: 'Terra', visible: true },
        5,
        [{ id: 40069, name: 'Meteor-M №2' }],
        { id: 27424, name: 'Aqua', visible: false },
    ];

    it('empty array and empty properties', () => {
        test([], { properties: [], result: -1 });
    });

    it('empty array and one property', () => {
        test([], { properties: [{ name: 'id', value: 25994 }], result: -1 });
    });

    it('empty properties', () => {
        test(a, { properties: [], result: - 1 });
    });

    it('one property', () => {
        test(a, [
            { properties: [{ name: 'id', value: 25994 }], result: 0 },
            { properties: [{ name: 'name', value: 'Aqua' }], result: 1 },
            { properties: [{ name: 'id', value: 40069 }], result: 2 },
            { properties: [{ name: 'id', value: 12345 }], result: -1 }
        ]);
    });

    it('two properties', () => {
        test(a, [
            { properties: [{ name: 'id', value: 25994 }, { name: 'name', value: 'Terra' }], result: 0 },
            { properties: [{ name: 'id', value: 25994 }, { name: 'name', value: 'Aqua' }], result: 0 },
            { properties: [{ name: 'name', value: 'Aqua' }, { name: 'id', value: 25994 }], result: 1 },
            { properties: [{ name: 'id', value: 12345 }, { name: 'name', value: 'Aqua' }], result: 1 },
            { properties: [{ name: 'id', value: 40069 }, { name: 'name', value: 'Terra' }], result: 2 },
            { properties: [{ name: 'id', value: 12345 }, { name: 'name', value: 'NPP' }], result: -1 }
        ]);
    });

    it('missing properties', () => {
        test(a, [
            { properties: [{ name: 'identifier', value: 25994 }], result: -1 },
            { properties: [{ name: 'identifier', value: 25994 }, { name: 'name', value: 'Aqua' }], result: 1 }
        ]);
    });

    it('mixed array', () => {
        test(b, [
            { properties: [{ name: 'id', value: 25994 }], result: 1 },
            { properties: [{ name: 'id', value: 12345 }, { name: 'name', value: 'Aqua' }], result: 4 }
        ]);
    });
});
