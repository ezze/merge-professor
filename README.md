# merge-professor

[![Build Status](https://travis-ci.org/ezze/merge-professor.svg?branch=dev)](https://travis-ci.org/ezze/merge-professor)
[![Coverage Status](https://coveralls.io/repos/github/ezze/merge-professor/badge.svg)](https://coveralls.io/github/ezze/merge-professor)

Advanced recursive merge utility for JavaScript objects and arrays.

## Features

- Supports multiple objects or arrays to merge in single function call.
- Merges objects recursively.
- Allows to merge object items of arrays by specified identifier fields.
- Has an option to merge properties existing only in first object. 
- Free to use. :)

## Installation

```bash
npm install merge-professor --save
```
    
## Usage

- require with Node.js:

    ```javascript
    var merge = require('merge-professor');
    ```

- in browser include `dist/merge.js` or `dist/merge.min.js` script:

    ```javascript
    var merge = window.mergeProfessor;
    ```
    
and then    
    
```javascript    
var o = merge({ a: 1 }, { b: 2 });                        // { a: 1, b: 2 }
var a = merge([1, 2, 3], ['one', 'two', 'three']);        // [1, 2, 3, 'one', 'two', 'three']
```

## Examples

- merge plain objects and arrays:

    ```javascript
    var o = merge({ a: 1 }, { b: 2 });                    // { a: 1, b: 2 }
    var a = merge([1, 2, 3], ['one', 'two', 'three']);    // [1, 2, 3, 'one', 'two', 'three']
    ```
- merge objects recursively:

    ```javascript
    var o1 = {
        language: {
            en: 'English',
            ru: 'Русский'
        },
        sidebarPanelId: 'satellite'
    };

    var o2 = {
        language: {
            ru: 'Russian',
            de: 'German'
        },
        sidebarPanelId: 'geocoding'
    };

    var o = merge(o1, o2);    // {
                              //     language: {
                              //         en: 'English',
                              //         ru: 'Russian',
                              //         de: 'German'
                              //     },
                              //     sidebarPanelId: 'geocoding'
                              // }
    ```

- merge arrays uniting their object items by specified identifier field: 

    ``` javascript
    var a1 = [
        { id: 25994, name: 'Terra', visible: true },
        { id: 27424, name: 'Aqua', visible: false }
    ];

    var a2 = [
        { id: 27424, name: 'AQUA' },
        { id: 25994, visible: false }
    ];

    var a = merge(a1, a2, 'id');    // [
                                    //     { id: 25994, name: 'Terra', visible: false },
                                    //     { id: 27424, name: 'AQUA', visible: false }
                                    // ]
    ```
    
    or even objects with nested arrays uniting their object items by more than single identifier field:

    ```javascript                                    
    var o1 = {
        satellites: [
            { id: 25994, name: 'Terra', visible: true },
            { id: 27424, name: 'Aqua', visible: false }
        ]
    };

    var o2 = {
        satellites: [
            { id: 27424, name: 'AQUA', visible: true },
            { id: 40069, name: 'Terra' }
        ]
    };
    
    var o = merge(o1, o2, 'id', 'name');    // {
                                            //     satellites: [
                                            //         { id: 40069, name: 'Terra', visible: true },
                                            //         { id: 27424, name: 'AQUA', visible: true }
                                            //     ]
                                            // }
    ```

- merge properties existing only in first object:

    ```javascript
    var o1 = { id: 25994, name: 'Terra', visible: false };
    var o2 = { sidebarPanelId: 'satellite', visible: true };

    var o = merge(o1, o2, true);    // { id: 25994, name: 'Terra', visible: true });
    ```
    
- merge with all available options:
    
    ```javascript
    var o1 = {
        satellites: [
            { id: 25994, name: 'Terra', visible: true },
            { id: 27424, name: 'Aqua', visible: false }
        ]
    };
  
    var o2 = {
        satellites: [
            { id: 25994, visible: false },
            { id: 40069, name: 'Meteor-M №2', visible: true }
        ]
    };
  
    var o = merge(o1, o2, 'id', true);    // {
                                          //     satellites: [
                                          //         { id: 25994, name: 'Terra', visible: false },
                                          //         { id: 27424, name: 'Aqua', visible: false }
                                          //     ]
                                          // }
    ```
                                        
## Building

In order to build library run:
                                          
    npm run build
    
## Testing
    
Run unit tests:
    
    npm test
    
## Contribution
    
Before making a pull request, please, be sure that your changes are rebased to `dev` branch.

## License

[MIT](LICENSE)
