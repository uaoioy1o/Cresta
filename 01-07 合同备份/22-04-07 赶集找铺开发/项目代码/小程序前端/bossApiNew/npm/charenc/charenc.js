var charenc = {
    utf8: {
        stringToBytes: function(n) {
            return charenc.bin.stringToBytes(unescape(encodeURIComponent(n)));
        },
        bytesToString: function(n) {
            return decodeURIComponent(escape(charenc.bin.bytesToString(n)));
        }
    },
    bin: {
        stringToBytes: function(n) {
            for (var e = [], r = 0; r < n.length; r++) e.push(255 & n.charCodeAt(r));
            return e;
        },
        bytesToString: function(n) {
            for (var e = [], r = 0; r < n.length; r++) e.push(String.fromCharCode(n[r]));
            return e.join("");
        }
    }
};

module.exports = charenc;