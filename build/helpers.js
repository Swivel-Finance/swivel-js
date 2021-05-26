/**
 * Defines a property with writable permission
 */
function defineWriteOnly(object, name, value) {
    Object.defineProperty(object, name, {
        enumerable: false,
        value: value,
        writable: true,
    });
}
/**
 * Clone an object with all writable properties
 */
function cloneWithWriteAccess(o) {
    if (Array.isArray(o))
        return o.map((item) => cloneWithWriteAccess(item));
    if (typeof o === 'object') {
        const result = {};
        for (const key in o) {
            if (o.hasOwnProperty(key)) {
                const value = o[key];
                if (value === undefined)
                    continue;
                defineWriteOnly(result, key, cloneWithWriteAccess(value));
            }
        }
        return result;
    }
    return o;
}
export { cloneWithWriteAccess };
//# sourceMappingURL=helpers.js.map