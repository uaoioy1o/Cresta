function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _asyncToGenerator(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, r) {
            function n(a, u) {
                try {
                    var i = t[a](u), o = i.value;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return void r(e);
                }
                if (!i.done) return Promise.resolve(o).then(function(e) {
                    n("next", e);
                }, function(e) {
                    n("throw", e);
                });
                e(o);
            }
            return n("next");
        });
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.wxRequest = void 0;

var _wepy = require("./../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _tip = require("./tip.js"), _tip2 = _interopRequireDefault(_tip), _md = require("./../npm/md5/md5.js"), _md2 = _interopRequireDefault(_md), _sha = require("./../npm/sha1/sha1.js"), _sha2 = _interopRequireDefault(_sha), _constant = require("./constant.js"), generateKey = function() {
    var e = new Date(), t = Date.UTC(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate(), e.getUTCHours(), e.getUTCMinutes(), e.getUTCSeconds(), e.getUTCMilliseconds());
    return {
        timestamp: t,
        key: (0, _md2.default)(t.toString(2))
    };
}, signPost = function(e, t, r, n) {
    var a = [ "key=" + r, "noncestr=" + t, "timestamp=" + n ];
    return (0, _sha2.default)(a.join("&"));
}, getNoncestr = function() {
    return (0, _md2.default)(Math.round(1e9 * Math.random()));
}, wxRequest = exports.wxRequest = function() {
    var e = _asyncToGenerator(regeneratorRuntime.mark(function e() {
        var t, r, n, a, u, i, o, s, d = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, p = arguments[1];
        return regeneratorRuntime.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return -1 == p.indexOf("get_new_mark") && _tip2.default.loading(), t = getNoncestr(), 
                r = generateKey(), n = [ "noncestr=" + t, "timestamp=" + r.timestamp, "sign=" + signPost(d, t, r.key, r.timestamp) ], 
                a = _wepy2.default.getStorageSync("currentCity") || {
                    name: "武汉",
                    value: "420100"
                }, u = _wepy2.default.getStorageSync(_constant.USER_TOKEN), d.city_id = a.value, 
                setTimeout(function() {
                    _tip2.default.loaded();
                }, 1e4), e.next = 10, _wepy2.default.request({
                    url: p.indexOf("?") > 0 ? p + "&" + n.join("&") : p + "?" + n.join("&"),
                    method: d.method || "POST",
                    data: d,
                    header: {
                        "Content-Type": "application/json",
                        "Client-Agent": "wxapp",
                        Authorization: "Bearer " + u,
                        "Client-Version": "v1.1.4",
                        Accept: "application/json;"
                    }
                });

              case 10:
                if (i = e.sent, _tip2.default.loaded(), !i || 200 != i.statusCode) {
                    e.next = 29;
                    break;
                }
                if (0 != i.data.status) {
                    e.next = 19;
                    break;
                }
                return o = i.data, o.params = d, e.abrupt("return", Promise.resolve(o));

              case 19:
                if (10008 != i.data.status && 10001 != i.data.status) {
                    e.next = 25;
                    break;
                }
                return wx.removeStorageSync(_constant.USER_TOKEN), wx.navigateTo({
                    url: "/pages/authorize"
                }), e.abrupt("return", {});

              case 25:
                return 32003 != i.data.status && 36999 != i.data.status && (s = i.data.msg || i.data.message, 
                _tip2.default.error(s)), e.abrupt("return", i.data);

              case 27:
                e.next = 31;
                break;

              case 29:
                return _tip2.default.error(i.statusCode + ",系统异常，请稍后再试"), e.abrupt("return", {});

              case 31:
              case "end":
                return e.stop();
            }
        }, e, void 0);
    }));
    return function() {
        return e.apply(this, arguments);
    };
}();