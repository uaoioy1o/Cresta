function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _asyncToGenerator(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, n) {
            function o(r, a) {
                try {
                    var i = t[r](a), u = i.value;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return void n(e);
                }
                if (!i.done) return Promise.resolve(u).then(function(e) {
                    o("next", e);
                }, function(e) {
                    o("throw", e);
                });
                e(u);
            }
            return o("next");
        });
    };
}

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var _createClass = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, n, o) {
        return n && e(t.prototype, n), o && e(t, o), t;
    };
}(), _wepy = require("./../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _constant = require("./../utils/constant.js"), _api = require("./../api/api.js"), AuthorizeMixin = function(e) {
    function t() {
        var e, n, o, r;
        _classCallCheck(this, t);
        for (var a = arguments.length, i = Array(a), u = 0; u < a; u++) i[u] = arguments[u];
        return n = o = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(i))), 
        o.methods = {}, r = n, _possibleConstructorReturn(o, r);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "handleLoginByCode",
        value: function() {
            function e(e, n, o) {
                return t.apply(this, arguments);
            }
            // var t = _asyncToGenerator(regeneratorRuntime.mark(function e(t, n, o) {
            //     return regeneratorRuntime.wrap(function(e) {
            //         for (;;) switch (e.prev = e.next) {
            //           case 0:
            //             (0, _api.userLogin)({
            //                 method: "POST",
            //                 code: encodeURIComponent(t.code),
            //                 iv: encodeURIComponent(t.iv),
            //                 data: encodeURIComponent(t.encryptData)
            //             }).then(function(e) {
            //                 wx.removeStorageSync(_constant.USER_TOKEN), e.result && e.result.token && (1 == e.result.is_bind && _wepy2.default.setStorageSync(_constant.USER_TOKEN, e.result.token),
            //                 n && n(e.result));
            //             }).catch(function(e) {
            //                 console.log(e);
            //             });
            //
            //           case 1:
            //           case "end":
            //             return e.stop();
            //         }
            //     }, e, this);
            // }));
            return e;
        }()
    }, {
        key: "handleGetLocation",
        value: function(e) {
            wx.getLocation({
                type: "wgs84",
                success: function(t) {
                    "getLocation:ok" == t.errMsg && e({
                        lat: t.latitude,
                        lng: t.longitude
                    });
                }
            });
        }
    }, {
        key: "handleGetUserToken",
        value: function() {
            return _wepy2.default.getStorageSync(_constant.USER_TOKEN);
        }
    }, {
        key: "openLocation",
        value: function(e) {
            wx.openLocation({
                latitude: parseFloat(e.latitude),
                longitude: parseFloat(e.longitude),
                scale: 15,
                name: e.name,
                address: e.address
            });
        }
    }, {
        key: "handleAuth",
        value: function() {
            function e(e, n, o) {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e(t, n, o) {
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        (0, _api.getUserPhone)({
                            method: "POST",
                            code: encodeURIComponent(t.code),
                            iv: encodeURIComponent(t.iv),
                            data: encodeURIComponent(t.encryptData)
                        }).then(function(e) {
                            wx.removeStorageSync(_constant.USER_PHONE), n && n();
                        }).catch(function(e) {
                            console.log(e);
                        });

                      case 1:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    } ]), t;
}(_wepy2.default.mixin);

exports.default = AuthorizeMixin;