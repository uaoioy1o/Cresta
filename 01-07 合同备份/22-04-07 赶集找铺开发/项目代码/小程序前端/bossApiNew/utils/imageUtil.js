function chooseImage(e, o) {
    wx.chooseImage({
        count: e,
        sizeType: [ "original", "compressed" ],
        sourceType: [ "album", "camera" ],
        success: function(e) {
            var s = e.tempFilePaths;
            console.log("temptemp", s), o && "function" == typeof o && o(s);
        }
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.chooseImage = chooseImage;