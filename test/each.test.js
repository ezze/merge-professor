import chai from 'chai';
chai.should();

import each from '../src/each';

describe('each', () => {
    it('each array iteration has value and key', () => {
        each([1, 2, 3], (value, key) => {
            value.should.equal(key + 1);
        });
    });

    it('each object iteration has value and key', () => {
        each({ one: 1, two: 2, three: 3 }, (value, key) => {
            switch (value) {
                case 1: key.should.equal('one'); break;
                case 2: key.should.equal('two'); break;
                case 3: key.should.equal('three'); break;
            }
        });
    });

    it('each breaks for array', () => {
        let i = 0;
        each([1, 2, 3], value => {
            i++;
            if (value === 2) {
                return false;
            }
        });
        i.should.equal(2);
    });

    it('each breaks for object', () => {
        let i = 0;
        each({ one: 1, two: 2, three: 3 }, (value, key) => {
            i++;
            if (key === 'two') {
                return false;
            }
        });
        i.should.equal(2);
    });

    it('each iterates only over own object properties', () => {
        function Satellite() {
            this.id = 25994;
            this.name = 'Terra';
        }

        Satellite.prototype.visible = false;

        const own = [];
        each(new Satellite, (value, key) => {
            own.push(key);
        });
        own.should.deep.equal(['id', 'name']);
    });
});
