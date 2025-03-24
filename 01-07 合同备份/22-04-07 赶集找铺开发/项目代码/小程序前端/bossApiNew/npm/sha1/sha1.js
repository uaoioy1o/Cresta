!function() {
    var r = require("./../crypt/crypt.js"), e = require("./../charenc/charenc.js").utf8, t = require("./../charenc/charenc.js").bin, n = function(t) {
        t.constructor == String ? t = e.stringToBytes(t) : "undefined" != typeof Buffer && "function" == typeof Buffer.isBuffer && Buffer.isBuffer(t) ? t = Array.prototype.slice.call(t, 0) : Array.isArray(t) || (t = t.toString());
        var n = r.bytesToWords(t), s = 8 * t.length, o = [], i = 1732584193, f = -271733879, c = -1732584194, u = 271733878, a = -1009589776;
        n[s >> 5] |= 128 << 24 - s % 32, n[15 + (s + 64 >>> 9 << 4)] = s;
        for (var y = 0; y < n.length; y += 16) {
            for (var g = i, l = f, B = c, p = u, v = a, d = 0; d < 80; d++) {
                if (d < 16) o[d] = n[y + d]; else {
                    var h = o[d - 3] ^ o[d - 8] ^ o[d - 14] ^ o[d - 16];
                    o[d] = h << 1 | h >>> 31;
                }
                var b = (i << 5 | i >>> 27) + a + (o[d] >>> 0) + (d < 20 ? 1518500249 + (f & c | ~f & u) : d < 40 ? 1859775393 + (f ^ c ^ u) : d < 60 ? (f & c | f & u | c & u) - 1894007588 : (f ^ c ^ u) - 899497514);
                a = u, u = c, c = f << 30 | f >>> 2, f = i, i = b;
            }
            i += g, f += l, c += B, u += p, a += v;
        }
        return [ i, f, c, u, a ];
    }, s = function(e, s) {
        var o = r.wordsToBytes(n(e));
        return s && s.asBytes ? o : s && s.asString ? t.bytesToString(o) : r.bytesToHex(o);
    };
    s._blocksize = 16, s._digestsize = 20, module.exports = s;
}();