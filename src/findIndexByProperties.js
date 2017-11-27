import isObject from './isObject';

function findIndexByProperties(array, properties) {
    for (let i = 0; i < properties.length; i++) {
        const property = properties[i];
        for (let j = 0; j < array.length; j++) {
            const item = array[j];
            if (isObject(item) && item[property.name] === property.value) {
                return j;
            }
        }
    }

    return -1;
}

export default findIndexByProperties;
