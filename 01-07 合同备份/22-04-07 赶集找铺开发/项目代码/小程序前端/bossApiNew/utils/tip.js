function _classCallCheck(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _createClass = function() {
    function e(e, n) {
        for (var t = 0; t < n.length; t++) {
            var o = n[t];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(n, t, o) {
        return t && e(n.prototype, t), o && e(n, o), n;
    };
}(), Tips = function() {
    function e() {
        _classCallCheck(this, e), this.isLoading = !1;
    }
    return _createClass(e, null, [ {
        key: "success",
        value: function(e) {
            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 500;
            if (setTimeout(function() {
                wx.showToast({
                    title: e,
                    icon: "success",
                    mask: !0,
                    duration: n
                });
            }, 300), n > 0) return new Promise(function(e, t) {
                setTimeout(function() {
                    e();
                }, n);
            });
        }
    }, {
        key: "confirm",
        value: function(e) {
            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "提示";
            return new Promise(function(o, i) {
                wx.showModal({
                    title: t,
                    content: e,
                    showCancel: !0,
                    success: function(e) {
                        e.confirm ? o(n) : e.cancel && i(n);
                    },
                    fail: function(e) {
                        i(n);
                    }
                });
            });
        }
    }, {
        key: "toast",
        value: function(e, n) {
            var t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "success";
            setTimeout(function() {
                wx.showToast({
                    title: e,
                    icon: t,
                    mask: !0,
                    duration: 1e3
                });
            }, 100), n && setTimeout(function() {
                n();
            }, 1e3);
        }
    }, {
        key: "alert",
        value: function(e) {
            wx.showModal({
                title: "提示",
                content: e.title,
                showCancel: !1,
                success: function(n) {
                    e.success && e.success();
                }
            });
        }
    }, {
        key: "error",
        value: function(e) {
            wx.showModal({
                title: "提示",
                content: e,
                showCancel: !1
            });
        }
    }, {
        key: "loading",
        value: function() {
            var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "加载中";
            e.isLoading || (e.isLoading = !0, wx.showLoading({
                title: n,
                mask: !0
            }));
        }
    }, {
        key: "loaded",
        value: function() {
            e.isLoading && (e.isLoading = !1, wx.hideLoading());
        }
    }, {
        key: "share",
        value: function(n, t, o) {
            return {
                title: n,
                path: t,
                desc: o,
                success: function(n) {
                    e.toast("分享成功");
                }
            };
        }
    } ]), e;
}();

exports.default = Tips, Tips.isLoading = !1;