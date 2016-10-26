import isArray from './isArray';

function isObject(instance) {
    return !(instance instanceof Date) && !isArray(instance) && typeof instance === 'object';
}

export default isObject;
