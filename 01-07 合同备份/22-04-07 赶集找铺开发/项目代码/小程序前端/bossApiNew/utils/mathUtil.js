function getDistance(t, a, e, M) {
    var h = t * Math.PI / 180, s = e * Math.PI / 180, o = h - s, n = a * Math.PI / 180 - M * Math.PI / 180, r = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(o / 2), 2) + Math.cos(h) * Math.cos(s) * Math.pow(Math.sin(n / 2), 2)));
    return r *= 6378.137, r = Math.round(1e4 * r) / 1e4, r.toFixed(2);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = getDistance;