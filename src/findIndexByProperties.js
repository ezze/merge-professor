import isObject from './isObject';

function findIndexByProperties(array, properties) {
    for (let i = 0; i < properties.length; i++) {
        let property = properties[i];
        for (let j = 0; j < array.length; j++) {
            let item = array[j];
            if (isObject(item) && item[property.name] === property.value) {
                return j;
            }
        }
    }

    return -1;
}

export default findIndexByProperties;
