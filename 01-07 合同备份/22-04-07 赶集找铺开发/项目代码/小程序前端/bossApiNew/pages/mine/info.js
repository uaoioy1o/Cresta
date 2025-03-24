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
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}(), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _api = require("./../../api/api.js"), _authorize = require("./../../mixins/authorize.js"), _authorize2 = _interopRequireDefault(_authorize), _tabBar = require("./../../components/tabBar.js"), _tabBar2 = _interopRequireDefault(_tabBar), _createStore = require("./../../components/createStore.js"), _createStore2 = _interopRequireDefault(_createStore), _tip = require("./../../utils/tip.js"), _tip2 = _interopRequireDefault(_tip), _banner = require("./../../components/banner.js"), _banner2 = _interopRequireDefault(_banner), Info = function(e) {
    function t() {
        var e, n, r, i;
        _classCallCheck(this, t);
        for (var o = arguments.length, a = Array(o), u = 0; u < o; u++) a[u] = arguments[u];
        return n = r = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(a))), 
        r.config = {
            navigationStyle: "custom"
        }, r.$repeat = {}, r.$props = {
            tab_bar: {
                "xmlns:v-on": "",
                "xmlns:v-bind": "",
                "v-bind:currentTab.once": "currentTab"
            },
            banner: {
                type: "9"
            }
        }, r.$events = {
            tab_bar: {
                "v-on:handleCreateStore": "handleCreateStore"
            }
        }, r.components = {
            tab_bar: _tabBar2.default,
            create_store: _createStore2.default,
            banner: _banner2.default
        }, r.data = {
            scrollTop: 0,
            currentTab: 2,
            statusBarHeight: wx.getSystemInfoSync().statusBarHeight,
            headerHeight: 40,
            userphone: "",
            refresh_point: 0,
            userInfo: {},
            code: "",
            icon: [ {
                title: "刷新",
                icon: "icon_1",
                url: "/pages/mine/shopList2?service=refresh",
                requireLogin: !0
            }, {
                title: "匹配",
                icon: "icon_3",
                url: "/pages/mine/shopList2?service=match",
                requireLogin: !0
            }, {
                title: "置顶",
                icon: "icon_4",
                url: "/pages/mine/shopList2?service=top",
                requireLogin: !0
            } ],
            column: [ [ {
                title: "服务记录",
                icon: "mine_icon_1",
                url: "/pages/mine/service",
                tip: "查看进展",
                requireLogin: !0
            }, {
                title: "我的消息",
                url: "/pages/mine/message",
                icon: "mine_icon_2",
                tip: "查看未读消息",
                requireLogin: !0
            }, {
                title: "我的咨询",
                url: "/pages/mine/chatList",
                icon: "mine_icon_7",
                requireLogin: !0
            }, {
                title: "投诉与反馈",
                url: "/pages/mine/feedback",
                icon: "mine_icon_3",
                requireLogin: !0
            } ], [ {
                title: "邀请好友",
                url: "",
                icon: "mine_icon_4",
                tip: "",
                requireLogin: !1
            }, {
                title: "联系客服",
                url: "/pages/mine/service",
                icon: "mine_icon_5",
                tip: "9:30-11:30 14:00-17:30(周六,周日休息)",
                requireLogin: !0
            }, {
                title: "关于我们",
                url: "/pages/mine/aboutus",
                icon: "mine_icon_6",
                requireLogin: !0
            } ] ],
            appName: _wepy2.default.$appConfig.baseConfig.app,
            ossHost: _wepy2.default.$appConfig.baseConfig.ossHost
        }, r.mixins = [ _authorize2.default ], r.methods = {
            openPage: function(e) {
                var t = this.handleGetUserToken(), n = e.url;
                return e.requireLogin && !t ? (wx.navigateTo({
                    url: "/pages/authorize"
                }), !1) : "mine_icon_5" == e.icon ? (wx.makePhoneCall({
                    phoneNumber: "02785570180"
                }), !1) : void wx.navigateTo({
                    url: n
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
            },
            openProfile: function(e) {
                wx.navigateTo({
                    url: e
                });
            }
        }, i = n, _possibleConstructorReturn(r, i);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "onLoad",
        value: function() {
            var e = wx.getStorageSync("tenglv_phone"), t = e.substr(0, 3) + " **** " + e.substr(7);
            this.userphone = t;
            try {
                this.headerHeight = wx.getMenuButtonBoundingClientRect().height + 2 * (wx.getMenuButtonBoundingClientRect().top - wx.getSystemInfoSync().safeArea.top);
            } catch (e) {}
            this.$apply();
        }
    }, {
        key: "onShow",
        value: function() {
            this.handleGetPoint();
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
        key: "onPageScroll",
        value: function(e) {
            var t = e.scrollTop;
            this.setData({
                scrollTop: t
            });
        }
    }, {
        key: "onShareAppMessage",
        value: function() {
            return {
                path: "/pages/home/index"
            };
        }
    } ]), t;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(Info, "pages/mine/info"));