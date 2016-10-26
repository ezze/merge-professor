import each from './each';

function getOrderedProperties(o, fields) {
    let result = [];
    each(fields, field => {
        if (o[field] !== undefined) {
            result.push({
                name: field,
                value: o[field]
            });
        }
    });
    return result;
}

export default getOrderedProperties;
