import chai from 'chai';
chai.should();

import merge from '../src/merge';

describe('merge', () => {
    it('two empty objects', () => {
        merge({}, {}).should.deep.equal({});
    });

    it('empty and plain objects', () => {
        const o = { id: 25994, name: 'Terra', visible: true };
        const expected = o;
        merge({}, o).should.deep.equal(expected);
        merge(o, {}).should.deep.equal(expected);
    });

    it('two plain objects', () => {
        merge({
            id: 25994,
            name: 'Terra'
        }, {
            visible: true
        }).should.deep.equal({
            id: 25994,
            name: 'Terra',
            visible: true
        });
    });

    it('two plain objects with dates', () => {
        const date = new Date('2016-10-01T15:00:00Z');
        merge(
            { id: 25994, name: 'Terra' },
            { visible: true, date: date }
        ).should.deep.equal({
            id: 25994,
            name: 'Terra',
            visible: true,
            date: date
        });
    });

    it('two intersected plain objects', () => {
        merge({
            id: 25994,
            name: 'Terra',
            visible: true
        }, {
            id: 27424,
            name: 'Aqua',
            group: 'Remote sensing'
        }).should.deep.equal({
            id: 27424,
            name: 'Aqua',
            visible: true,
            group: 'Remote sensing'
        });
    });

    it('plain object and object with plain nested object', () => {
        merge({
            language: 'ru',
            sidebarPanelId: 'satellite'
        }, {
            map: {
                name: 'Map',
                visible: true
            }
        }).should.deep.equal({
            language: 'ru',
            sidebarPanelId: 'satellite',
            map: {
                name: 'Map',
                visible: true
            }
        });
    });

    it('intersected plain object and object with plain nested object', () => {
        merge({
            language: 'ru',
            sidebarPanelId: 'satellite'
        }, {
            language: {
                en: 'English',
                ru: 'Russian'
            }
        }).should.deep.equal({
            language: {
                en: 'English',
                ru: 'Russian'
            },
            sidebarPanelId: 'satellite'
        })
    });

    it('two objects with nested intersected plain objects', () => {
        const o1 = {
            language: {
                en: 'English',
                ru: 'Русский'
            },
            sidebarPanelId: 'satellite'
        };

        const o2 = {
            language: {
                ru: 'Russian',
                de: 'German'
            },
            sidebarPanelId: 'geocoding'
        };

        merge(o1, o2).should.deep.equal({
            language: {
                en: 'English',
                ru: 'Russian',
                de: 'German'
            },
            sidebarPanelId: 'geocoding'
        });
        merge(o2, o1).should.deep.equal({
            language: {
                en: 'English',
                ru: 'Русский',
                de: 'German'
            },
            sidebarPanelId: 'satellite'
        });
    });

    it('two empty arrays', () => {
        merge([], []).should.deep.equal([]);
    });

    it('empty array and plain array', () => {
        const a = [1, 2, 3];
        const expected = a;
        merge([], a).should.deep.equal(expected);
        merge(a, []).should.deep.equal(expected);
    });

    it('two plain arrays', () => {
        merge([1, 2, 3], ['one', 'two', 'three']).should.deep.equal([1, 2, 3, 'one', 'two', 'three']);
    });

    it('two mixed arrays', () => {
        merge(
            [1, 2, 3, { id: 25994, name: 'Terra', visible: true }],
            [{ id: 25994, visible: false }, 'one', 'two', 'three'],
            'id'
        ).should.deep.equal([1, 2, 3, { id: 25994, name: 'Terra', visible: false }, 'one', 'two', 'three']);
    });

    it('two arrays of objects with intersected identifiers', () => {
        const a1 = [
            { id: 25994, name: 'Terra', visible: true },
            { id: 27424, name: 'Aqua', visible: false }
        ];

        const a2 = [
            { id: 27424, name: 'AQUA' },
            { id: 25994, visible: false }
        ];

        merge(a1, a2, 'id').should.deep.equal([
            { id: 25994, name: 'Terra', visible: false },
            { id: 27424, name: 'AQUA', visible: false }
        ]);
        merge(a2, a1, 'id').should.deep.equal([
            { id: 27424, name: 'Aqua', visible: false },
            { id: 25994, name: 'Terra', visible: true },
        ]);
        merge(a1, a2, 'name').should.deep.equal([
            { id: 25994, name: 'Terra', visible: true },
            { id: 27424, name: 'Aqua', visible: false },
            { id: 27424, name: 'AQUA' },
            { id: 25994, visible: false }
        ]);
        merge(a2, a1, 'name').should.deep.equal([
            { id: 27424, name: 'AQUA' },
            { id: 25994, visible: false },
            { id: 25994, name: 'Terra', visible: true },
            { id: 27424, name: 'Aqua', visible: false }
        ]);
    });

    it('two objects with nested arrays', () => {
        const o1 = {
            satellites: [
                { id: 25994, name: 'Terra', visible: true },
                { id: 27424, name: 'Aqua', visible: false }
            ]
        };

        const o2 = {
            satellites: [
                { id: 27424, name: 'AQUA', visible: true },
                { id: 40069, name: 'Terra' }
            ]
        };

        merge(o1, o2, 'id').should.deep.equal({
            satellites: [
                { id: 25994, name: 'Terra', visible: true },
                { id: 27424, name: 'AQUA', visible: true },
                { id: 40069, name: 'Terra' }
            ]
        });
        merge(o2, o1, 'id').should.deep.equal({
            satellites: [
                { id: 27424, name: 'Aqua', visible: false },
                { id: 40069, name: 'Terra' },
                { id: 25994, name: 'Terra', visible: true }
            ]
        });
        merge(o1, o2, 'id', 'name').should.deep.equal({
            satellites: [
                { id: 40069, name: 'Terra', visible: true },
                { id: 27424, name: 'AQUA', visible: true }
            ]
        });
        merge(o1, o2, 'name', 'id').should.deep.equal({
            satellites: [
                { id: 40069, name: 'Terra', visible: true },
                { id: 27424, name: 'AQUA', visible: true }
            ]
        });
        merge(o2, o1, 'name', 'id').should.deep.equal({
            satellites: [
                { id: 27424, name: 'Aqua', visible: false },
                { id: 25994, name: 'Terra', visible: true }
            ]
        });
    });

    it('two plain objects, overwriting existing only', () => {
        const o1 = { id: 25994, name: 'Terra', visible: false };
        const o2 = { sidebarPanelId: 'satellite', visible: true };

        merge(o1, o2, true).should.deep.equal({
            id: 25994, name: 'Terra', visible: true
        });
        merge(o2, o1, true).should.deep.equal({
            sidebarPanelId: 'satellite', visible: false
        });
    });

    it('two objects with nested objects, overwriting existing only', () => {
        const o1 = {
            language: { en: 'English', ru: 'Русский' },
            sidebarPanelId: 'satellite',
            user: { name: 'Alice', age: 30 }
        };
        const o2 = {
            language: { ru: 'Russian', de: 'German' },
            sidebarPanelId: 'geocoding'
        };

        merge(o1, o2, true).should.deep.equal({
            language: { en: 'English', ru: 'Russian' },
            sidebarPanelId: 'geocoding',
            user: { name: 'Alice', age: 30 }
        });
        merge(o2, o1, true).should.deep.equal({
            language: { ru: 'Русский', de: 'German' },
            sidebarPanelId: 'satellite'
        });
    });

    it('two objects with plain nested arrays, overwriting existing only', () => {
        const o1 = {
            language: ['en', 'ru'],
            sidebarPanelId: 'satellite'
        };
        const o2 = {
            language: ['de'],
            sidebarPanelId: 'geocoding',
            user: ['Alice', 'Bob']
        };

        merge(o1, o2, true).should.deep.equal({
            language: ['en', 'ru', 'de'],
            sidebarPanelId: 'geocoding'
        });
        merge(o2, o1, true).should.deep.equal({
            language: ['de', 'en', 'ru'],
            sidebarPanelId: 'satellite',
            user: ['Alice', 'Bob']
        });
    });

    it('two objects with nested arrays, overwriting existing only', () => {
        const o1 = {
            satellites: [
                { id: 25994, name: 'Terra', visible: true },
                { id: 27424, name: 'Aqua', visible: false }
            ]
        };
        const o2 = {
            satellites: [
                { id: 25994, visible: false },
                { id: 40069, name: 'Meteor-M №2', visible: true }
            ]
        };

        merge(o1, o2, 'id', true).should.deep.equal({
            satellites: [
                { id: 25994, name: 'Terra', visible: false },
                { id: 27424, name: 'Aqua', visible: false }
            ]
        });
        merge(o2, o1, 'id', true).should.deep.equal({
            satellites: [
                { id: 25994, visible: true },
                { id: 40069, name: 'Meteor-M №2', visible: true }
            ]
        });
    });
});
