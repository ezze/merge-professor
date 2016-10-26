import isBoolean from './isBoolean';
import isString from './isString';
import isArray from './isArray';
import isObject from './isObject';

import each from './each';

import findIndexByProperties from './findIndexByProperties';
import getOrderedProperties from './getOrderedProperties';

function merge() {
    let objects = Array.prototype.slice.call(arguments),
        overwriteExistingOnly = false,
        ids = [];

    if (objects.length && isBoolean(objects[objects.length - 1])) {
        overwriteExistingOnly = objects.pop();
    }

    while (objects.length && isString(objects[objects.length - 1])) {
        ids.push(objects.pop());
    }

    let result = isArray(objects[0]) ? [] : {};

    each(objects, (o, i) => {
        let createNew = i === 0 || !overwriteExistingOnly;
        each(o, (value, name) => {
            // Value is array
            if (isArray(value)) {
                if (!result[name] || !isArray(result[name])) {
                    if (createNew) {
                        result[name] = [].concat(value);
                    }
                    return;
                }

                result[name] = merge.apply(null, [result[name], value]
                    .concat(ids)
                    .concat(overwriteExistingOnly)
                );
                return;
            }

            // Value is object
            if (isObject(value)) {
                if (isArray(result)) {
                    let itemIndex = findIndexByProperties(result, getOrderedProperties(value, ids));
                    if (itemIndex >= 0) {
                        result[itemIndex] = merge.apply(null, [result[itemIndex], value]
                            .concat(ids)
                            .concat([overwriteExistingOnly])
                        );
                        return;
                    }

                    if (createNew) {
                        result.push(value);
                    }
                    return;
                }

                if (!result[name] || !isObject(result[name])) {
                    if (createNew) {
                        result[name] = merge({}, value);
                    }
                    return;
                }

                result[name] = merge.apply(null, [result[name], value]
                    .concat(ids)
                    .concat([overwriteExistingOnly])
                );
                return;
            }

            // Value is primitive
            if (isArray(result)) {
                result.push(value);
            }
            else {
                if (createNew || result[name] !== undefined) {
                    result[name] = value;
                }
            }
        });
    });

    return result;
}

export default merge;
