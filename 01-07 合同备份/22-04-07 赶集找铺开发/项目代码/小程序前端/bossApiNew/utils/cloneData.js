function getType(e) {
    var t = Object.prototype.toString;
    return {
        "[object Boolean]": "boolean",
        "[object Number]": "number",
        "[object String]": "string",
        "[object Function]": "function",
        "[object Array]": "array",
        "[object Date]": "date",
        "[object RegExp]": "regExp",
        "[object Undefined]": "undefined",
        "[object Null]": "null",
        "[object Object]": "object"
    }[t.call(e)];
}

function deepClone(e) {
    var t, o = getType(e);
    if ("array" === o) t = []; else {
        if ("object" !== o) return e;
        t = {};
    }
    if ("array" === o) for (var r = 0, n = e.length; r < n; r++) t.push(deepClone(e[r])); else if ("object" === o) for (var c in e) t[c] = deepClone(e[c]);
    return t;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = deepClone;