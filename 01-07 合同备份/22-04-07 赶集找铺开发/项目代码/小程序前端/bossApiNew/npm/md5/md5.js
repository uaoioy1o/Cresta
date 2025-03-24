!function() {
    var r = require("./../crypt/crypt.js"), n = require("./../charenc/charenc.js").utf8, t = require("./../is-buffer/index.js"), e = require("./../charenc/charenc.js").bin, i = function(o, s) {
        o.constructor == String ? o = s && "binary" === s.encoding ? e.stringToBytes(o) : n.stringToBytes(o) : t(o) ? o = Array.prototype.slice.call(o, 0) : Array.isArray(o) || o.constructor === Uint8Array || (o = o.toString());
        for (var c = r.bytesToWords(o), a = 8 * o.length, u = 1732584193, f = -271733879, g = -1732584194, y = 271733878, l = 0; l < c.length; l++) c[l] = 16711935 & (c[l] << 8 | c[l] >>> 24) | 4278255360 & (c[l] << 24 | c[l] >>> 8);
        c[a >>> 5] |= 128 << a % 32, c[14 + (a + 64 >>> 9 << 4)] = a;
        for (var h = i._ff, v = i._gg, _ = i._hh, d = i._ii, l = 0; l < c.length; l += 16) {
            var b = u, T = f, p = g, j = y;
            u = h(u, f, g, y, c[l + 0], 7, -680876936), y = h(y, u, f, g, c[l + 1], 12, -389564586), 
            g = h(g, y, u, f, c[l + 2], 17, 606105819), f = h(f, g, y, u, c[l + 3], 22, -1044525330), 
            u = h(u, f, g, y, c[l + 4], 7, -176418897), y = h(y, u, f, g, c[l + 5], 12, 1200080426), 
            g = h(g, y, u, f, c[l + 6], 17, -1473231341), f = h(f, g, y, u, c[l + 7], 22, -45705983), 
            u = h(u, f, g, y, c[l + 8], 7, 1770035416), y = h(y, u, f, g, c[l + 9], 12, -1958414417), 
            g = h(g, y, u, f, c[l + 10], 17, -42063), f = h(f, g, y, u, c[l + 11], 22, -1990404162), 
            u = h(u, f, g, y, c[l + 12], 7, 1804603682), y = h(y, u, f, g, c[l + 13], 12, -40341101), 
            g = h(g, y, u, f, c[l + 14], 17, -1502002290), f = h(f, g, y, u, c[l + 15], 22, 1236535329), 
            u = v(u, f, g, y, c[l + 1], 5, -165796510), y = v(y, u, f, g, c[l + 6], 9, -1069501632), 
            g = v(g, y, u, f, c[l + 11], 14, 643717713), f = v(f, g, y, u, c[l + 0], 20, -373897302), 
            u = v(u, f, g, y, c[l + 5], 5, -701558691), y = v(y, u, f, g, c[l + 10], 9, 38016083), 
            g = v(g, y, u, f, c[l + 15], 14, -660478335), f = v(f, g, y, u, c[l + 4], 20, -405537848), 
            u = v(u, f, g, y, c[l + 9], 5, 568446438), y = v(y, u, f, g, c[l + 14], 9, -1019803690), 
            g = v(g, y, u, f, c[l + 3], 14, -187363961), f = v(f, g, y, u, c[l + 8], 20, 1163531501), 
            u = v(u, f, g, y, c[l + 13], 5, -1444681467), y = v(y, u, f, g, c[l + 2], 9, -51403784), 
            g = v(g, y, u, f, c[l + 7], 14, 1735328473), f = v(f, g, y, u, c[l + 12], 20, -1926607734), 
            u = _(u, f, g, y, c[l + 5], 4, -378558), y = _(y, u, f, g, c[l + 8], 11, -2022574463), 
            g = _(g, y, u, f, c[l + 11], 16, 1839030562), f = _(f, g, y, u, c[l + 14], 23, -35309556), 
            u = _(u, f, g, y, c[l + 1], 4, -1530992060), y = _(y, u, f, g, c[l + 4], 11, 1272893353), 
            g = _(g, y, u, f, c[l + 7], 16, -155497632), f = _(f, g, y, u, c[l + 10], 23, -1094730640), 
            u = _(u, f, g, y, c[l + 13], 4, 681279174), y = _(y, u, f, g, c[l + 0], 11, -358537222), 
            g = _(g, y, u, f, c[l + 3], 16, -722521979), f = _(f, g, y, u, c[l + 6], 23, 76029189), 
            u = _(u, f, g, y, c[l + 9], 4, -640364487), y = _(y, u, f, g, c[l + 12], 11, -421815835), 
            g = _(g, y, u, f, c[l + 15], 16, 530742520), f = _(f, g, y, u, c[l + 2], 23, -995338651), 
            u = d(u, f, g, y, c[l + 0], 6, -198630844), y = d(y, u, f, g, c[l + 7], 10, 1126891415), 
            g = d(g, y, u, f, c[l + 14], 15, -1416354905), f = d(f, g, y, u, c[l + 5], 21, -57434055), 
            u = d(u, f, g, y, c[l + 12], 6, 1700485571), y = d(y, u, f, g, c[l + 3], 10, -1894986606), 
            g = d(g, y, u, f, c[l + 10], 15, -1051523), f = d(f, g, y, u, c[l + 1], 21, -2054922799), 
            u = d(u, f, g, y, c[l + 8], 6, 1873313359), y = d(y, u, f, g, c[l + 15], 10, -30611744), 
            g = d(g, y, u, f, c[l + 6], 15, -1560198380), f = d(f, g, y, u, c[l + 13], 21, 1309151649), 
            u = d(u, f, g, y, c[l + 4], 6, -145523070), y = d(y, u, f, g, c[l + 11], 10, -1120210379), 
            g = d(g, y, u, f, c[l + 2], 15, 718787259), f = d(f, g, y, u, c[l + 9], 21, -343485551), 
            u = u + b >>> 0, f = f + T >>> 0, g = g + p >>> 0, y = y + j >>> 0;
        }
        return r.endian([ u, f, g, y ]);
    };
    i._ff = function(r, n, t, e, i, o, s) {
        var c = r + (n & t | ~n & e) + (i >>> 0) + s;
        return (c << o | c >>> 32 - o) + n;
    }, i._gg = function(r, n, t, e, i, o, s) {
        var c = r + (n & e | t & ~e) + (i >>> 0) + s;
        return (c << o | c >>> 32 - o) + n;
    }, i._hh = function(r, n, t, e, i, o, s) {
        var c = r + (n ^ t ^ e) + (i >>> 0) + s;
        return (c << o | c >>> 32 - o) + n;
    }, i._ii = function(r, n, t, e, i, o, s) {
        var c = r + (t ^ (n | ~e)) + (i >>> 0) + s;
        return (c << o | c >>> 32 - o) + n;
    }, i._blocksize = 16, i._digestsize = 16, module.exports = function(n, t) {
        if (void 0 === n || null === n) throw new Error("Illegal argument " + n);
        var o = r.wordsToBytes(i(n, t));
        return t && t.asBytes ? o : t && t.asString ? e.bytesToString(o) : r.bytesToHex(o);
    };
}();