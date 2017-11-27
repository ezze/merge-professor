import isArray from './isArray';

function each(instance, callback) {
    if (isArray(instance)) {
        for (let i = 0; i < instance.length; i++) {
            if (callback(instance[i], i) === false) {
                break;
            }
        }
    }
    else {
        for (const key in instance) {
            if (!instance.hasOwnProperty(key)) {
                continue;
            }

            if (callback(instance[key], key) === false) {
                break;
            }
        }
    }
}

export default each;
