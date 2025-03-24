function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
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
});

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
}(), _wepy = require("./../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _authorize = require("./../mixins/authorize.js"), _authorize2 = _interopRequireDefault(_authorize), _constant = require("./../utils/constant.js"), Authorize = function(e) {
    function t() {
        var e, n, o, r;
        _classCallCheck(this, t);
        for (var i = arguments.length, a = Array(i), u = 0; u < i; u++) a[u] = arguments[u];
        return n = o = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(a))), 
        o.config = {
            navigationBarTitleText: "授权登录"
        }, o.data = {
            canIUse: wx.canIUse("button.open-type.getPhoneNumber"),
            code: "",
            token: "",
            showMobileBtn: !1,
            title: ""
        }, o.mixins = [ _authorize2.default ], o.methods = {
            getPhoneNumber: function(e) {
                console.log(e);
                var t = this;
                "getPhoneNumber:ok" == e.detail.errMsg && this.handleAuth({
                    code: this.code,
                    iv: e.detail.iv,
                    encryptData: e.detail.encryptedData
                }, function() {
                    console.log("that.token", t.token), _wepy2.default.setStorageSync(_constant.USER_TOKEN, t.token), 
                    wx.navigateBack();
                });
            },
            getUserProfile: function(e) {
                var t = this;
                wx.getUserProfile({
                    lang: "zh_CN",
                    desc: "用于完善会员资料",
                    success: function(e) {
                        t.handleLoginByCode({
                            code: t.code,
                            iv: e.iv,
                            encryptData: e.encryptedData
                        }, function(e) {
                            0 == e.is_bind ? (t.token = e.token, t.showMobileBtn = !0, t.handleLogin(), t.$apply()) : wx.navigateBack();
                        });
                    }
                });
            },
            cancelbind: function() {
                wx.navigateTo({
                    url: "/pages/home/index"
                });
            }
        }, r = n, _possibleConstructorReturn(o, r);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "onShow",
        value: function() {
            this.handleLogin(), this.title = _wepy2.default.$appConfig.baseConfig.name, this.$apply();
        }
    }, {
        key: "handleLogin",
        value: function() {
            var e = this;
            wx.login({
                success: function(t) {
                    t.code ? (e.code = t.code, e.$apply()) : console.log("登录失败！" + t.errMsg);
                }
            });
        }
    } ]), t;
}(_wepy2.default.page);

Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(Authorize, "pages/authorize"));