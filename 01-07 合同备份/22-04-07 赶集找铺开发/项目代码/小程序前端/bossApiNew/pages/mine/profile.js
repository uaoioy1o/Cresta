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
}(), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _api = require("./../../api/api.js"), _authorize = require("./../../mixins/authorize.js"), _authorize2 = _interopRequireDefault(_authorize), _createStore = require("./../../components/createStore.js"), _createStore2 = _interopRequireDefault(_createStore), _CustomHeader = require("./../../components/CustomHeader.js"), _CustomHeader2 = _interopRequireDefault(_CustomHeader), _storeItem = require("./../../components/storeItem.js"), _storeItem2 = _interopRequireDefault(_storeItem), _tip = require("./../../utils/tip.js"), _tip2 = _interopRequireDefault(_tip), Profile = function(e) {
    function t() {
        var e, o, r, n;
        _classCallCheck(this, t);
        for (var i = arguments.length, a = Array(i), u = 0; u < i; u++) a[u] = arguments[u];
        return o = r = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(a))), 
        r.config = {
            navigationStyle: "custom"
        }, r.$repeat = {}, r.$props = {
            custom_header: {
                "xmlns:v-bind": "",
                "v-bind:icon.sync": "icon1",
                "v-bind:title.sync": "title",
                "v-bind:backgroundColor.sync": "bgcolor"
            },
            store_item: {
                "v-bind:item.sync": "item"
            }
        }, r.$events = {}, r.components = {
            create_store: _createStore2.default,
            custom_header: _CustomHeader2.default,
            store_item: _storeItem2.default
        }, r.data = {
            scrollTop: 0,
            currentTab: 2,
            tourDetail: {},
            statusBarHeight: wx.getSystemInfoSync().statusBarHeight,
            headerHeight: 40,
            icon1: "arrow_left_gray",
            openid: "",
            userphone: "",
            userInfo: {},
            appName: _wepy2.default.$appConfig.baseConfig.app,
            ossHost: _wepy2.default.$appConfig.baseConfig.ossHost
        }, r.mixins = [ _authorize2.default ], r.computed = {}, r.methods = {
            openPage: function(e) {
                var t = this.handleGetUserToken(), o = e.url;
                return "" == o ? (_tip2.default.alert({
                    title: "页面正在升级中......"
                }), !1) : e.requireLogin && !t ? (wx.navigateTo({
                    url: "/pages/authorize"
                }), !1) : void wx.navigateTo({
                    url: o
                });
            },
            closePage: function() {
                _tip2.default.alert({
                    title: "退出登录",
                    success: function() {
                        (0, _api.authLoginOut)({
                            method: "POST"
                        }).then(function(e) {
                            e && 0 == e.status && (_wepy2.default.clearStorageSync("tenglv_phone", ""), _wepy2.default.clearStorageSync("userTokenNew", ""), 
                            _wepy2.default.navigateTo({
                                url: "/pages/mine/info"
                            }), console.log("退出登录", e));
                        });
                    }
                });
            },
            handleCreateStore: function() {
                this.$invoke("create_store", "open");
            }
        }, n = o, _possibleConstructorReturn(r, n);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "onLoad",
        value: function(e) {
            this.openid = e.openid;
            try {
                this.headerHeight = wx.getMenuButtonBoundingClientRect().height + 2 * (wx.getMenuButtonBoundingClientRect().top - wx.getSystemInfoSync().safeArea.top);
            } catch (e) {}
            this.$apply();
        }
    }, {
        key: "onShow",
        value: function() {
            this.handleGetHome();
        }
    }, {
        key: "handleGetPoint",
        value: function() {
            var e = this;
            (0, _api.getMyHome)().then(function(t) {
                e.userInfo = t.result, e.$apply();
            });
        }
    }, {
        key: "handleGetHome",
        value: function() {
            var e = this;
            (0, _api.getShopHome)({
                openid: this.openid
            }).then(function(t) {
                e.tourDetail = t.result;
                var o = t.result.user_info.phone, r = o.substr(0, 3) + " **** " + o.substr(7);
                e.userphone = r, e.$apply();
            });
        }
    }, {
        key: "onPageScroll",
        value: function(e) {
            var t = e.scrollTop;
            this.setData({
                scrollTop: t
            });
        }
    } ]), t;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(Profile, "pages/mine/profile"));