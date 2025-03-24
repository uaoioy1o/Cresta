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
        for (var o = 0; o < t.length; o++) {
            var r = t[o];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, o, r) {
        return o && e(t.prototype, o), r && e(t, r), t;
    };
}(), _wepy = require("./npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy);

require("./npm/wepy-async-function/index.js");

var _wepyRedux = require("./npm/wepy-redux/lib/index.js"), _store = require("./store/index.js"), _store2 = _interopRequireDefault(_store), store = (0, 
_store2.default)();

(0, _wepyRedux.setStore)(store);

var _default = function(e) {
    function t() {
        _classCallCheck(this, t);
        var e = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
        return e.config = {
            pages: [ "pages/home/index", "pages/home/chooseCity", "pages/home/find", "pages/home/detail", "pages/home/user", "pages/authorize" ],
            subPackages: [ {
                root: "pages/mine",
                pages: [ "vip", "chatList", "info", "message", "top", "coupon/index", "aboutus", "shopList2", "refresh", "match", "speed", "profile", "service", "contact/foot", "shopList", "feedback", "followList", "problem" ]
            }, {
                root: "pages/store",
                pages: [ "apply", "chat", "market", "private", "search", "applyQz", "xieyi", "vip", "detail", "list" ]
            } ],
            permission: {
                "scope.userLocation": {
                    desc: "你的位置信息将用于小程序位置接口的效果展示"
                }
            },
            window: {
                backgroundTextStyle: "light",
                navigationBarBackgroundColor: "#ffffff",
                navigationBarTextStyle: "black"
            }
        }, e.globalData = {
            userInfo: null
        }, e.use("requestfix"), e.use("promisify"), e;
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "onLaunch",
        value: function() {}
    }, {
        key: "getUserInfo",
        value: function(e) {
            var t = this;
            if (this.globalData.userInfo) return this.globalData.userInfo;
            _wepy2.default.getUserInfo({
                success: function(o) {
                    t.globalData.userInfo = o.userInfo, e && e(o.userInfo);
                }
            });
        }
    } ]), t;
}(_wepy2.default.app);

App(require("./npm/wepy/lib/wepy.js").default.$createApp(_default, {
    noPromiseAPI: [ "createSelectorQuery" ],
    area: "ekt8",
    prod: !0,
    baseConfig: {
        appid: "wx7fd4a1a379956c3f",
        api: "https://bossapi.xbzdchica.com/api/",
        name: "BOSS找店",
        app: "boss",
        defaultThemeColor: "#FFE60F",
        colorTextMine: "#333",
        ossHost: "https://zd-mode.oss-cn-hangzhou.aliyuncs.com/",
        agreement: "https://zd-mode-content.oss-cn-hangzhou.aliyuncs.com/"
    }
}));