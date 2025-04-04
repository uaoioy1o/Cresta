function isBuffer(f) {
    return !!f.constructor && "function" == typeof f.constructor.isBuffer && f.constructor.isBuffer(f);
}

function isSlowBuffer(f) {
    return "function" == typeof f.readFloatLE && "function" == typeof f.slice && isBuffer(f.slice(0, 0));
}

module.exports = function(f) {
    return null != f && (isBuffer(f) || isSlowBuffer(f) || !!f._isBuffer);
};