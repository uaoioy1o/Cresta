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
}(), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _authorize = require("./../../mixins/authorize.js"), _authorize2 = _interopRequireDefault(_authorize), _api = require("./../../api/api.js"), _mathUtil = require("./../../utils/mathUtil.js"), _mathUtil2 = _interopRequireDefault(_mathUtil), _tabBar = require("./../../components/tabBar.js"), _tabBar2 = _interopRequireDefault(_tabBar), _storeItem = require("./../../components/storeItem.js"), _storeItem2 = _interopRequireDefault(_storeItem), _recommendItem = require("./../../components/recommendItem.js"), _recommendItem2 = _interopRequireDefault(_recommendItem), _createStore = require("./../../components/createStore.js"), _createStore2 = _interopRequireDefault(_createStore), Index = function(e) {
    function t() {
        var e, n, o, r;
        _classCallCheck(this, t);
        for (var a = arguments.length, i = Array(a), s = 0; s < a; s++) i[s] = arguments[s];
        return n = o = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(i))), 
        o.config = {
            navigationStyle: "custom",
            enablePullDownRefresh: !0
        }, o.data = {
            homeData: {
                branner: [],
                shop_list: [],
                statistical: {
                    login_num: 0,
                    transfer_shop: 0,
                    find_shop: 0
                }
            },
            currentPage: 1,
            recommendList: [],
            statusBarHeight: wx.getSystemInfoSync().statusBarHeight,
            headerHeight: 40,
            lat1: 0,
            lng1: 0,
            currentBanner: 0,
            showMoreIcon: !1,
            currentCity: {},
            type: "recommend",
            scrollTop: 0,
            navData: [ {
                name: "转让信息",
                icon: "nav_01",
                url: "/pages/store/list?type=2",
                requireLogin: !1
            }, {
                name: "出租信息",
                icon: "nav_02",
                url: "/pages/store/list?type=1",
                requireLogin: !1
            }, {
                name: "求租信息",
                icon: "nav_03",
                url: "/pages/store/list?type=3",
                requireLogin: !1
            }, {
                name: "特色类别",
                icon: "nav_04",
                url: "/pages/scenic/list",
                requireLogin: !1
            } ],
            subMenu: [ {
                name: "热度排行",
                icon: "btn_icon_5",
                url: "/pages/store/search?shoptype=visit_desc",
                requireLogin: !1
            }, {
                name: "高性价比",
                icon: "btn_icon_6",
                url: "/pages/store/search?shoptype=transfer_fee_asc",
                requireLogin: !1
            }, {
                name: "急转店铺",
                icon: "btn_icon_7",
                url: "/pages/store/search?shoptype=service_time_desc",
                requireLogin: !1
            }, {
                name: "冷门行业",
                icon: "btn_icon_8",
                url: "/pages/store/search?shoptype=special",
                requireLogin: !1
            }, {
                name: "找合伙人",
                icon: "btn_icon_9",
                url: "/pages/store/search?shoptype=transfer_fee",
                requireLogin: !1
            } ],
            isBottom: !1,
            tips: [],
            branner: [
                {
                    image_src:"banner_03.png"
                }
            ],
            branner2: [
                {
                    image_src:"banner_02.png"
                },
                {
                    image_src:"banner_01.png"
                }

            ],
            incomplete_shop: 0,
            incomplete_shop_type: 0,
            appName: _wepy2.default.$appConfig.baseConfig.app,
            ossHost: _wepy2.default.$appConfig.baseConfig.ossHost
        }, o.mixins = [ _authorize2.default ], o.$repeat = {}, o.$props = {
            tab_bar: {
                "xmlns:v-on": "",
                currentTab: "{{0}}"
            },
            store_item: {
                "xmlns:v-bind": "",
                "v-bind:item.sync": "item"
            }
        }, o.$events = {
            tab_bar: {
                "v-on:handleCreateStore": "handleCreateStore"
            }
        }, o.components = {
            tab_bar: _tabBar2.default,
            store_item: _storeItem2.default,
            create_store: _createStore2.default,
            recommend_item: _recommendItem2.default
        }, o.methods = {
            handlePay: function() {
                _wepy2.default.navigateTo({
                    url: "/pages/store/apply?id=" + this.incomplete_shop + "&status=repay&type=" + this.incomplete_shop_type
                });
            },
            handleChangeBanner: function(e) {
                this.currentBanner = e.detail.current, this.$apply();
            },
            handleChangeType: function(e) {
                this.type = e, this.currentPage = 1, this.isBottom = !1, this.$apply(), this.handleGetData();
            },
            handleOpenPage: function(e) {
                if (!e) return !1;
                wx.navigateTo({
                    url: e
                });
            },
            handleScrollTop: function() {
                wx.pageScrollTo({
                    scrollTop: 0
                });
            },
            navTap: function(e) {
                var t = this.handleGetUserToken(), n = e.url;
                return e.requireLogin && !t ? (wx.navigateTo({
                    url: "/pages/authorize"
                }), !1) : "nav_04" === e.icon ? (this.showMoreIcon = !this.showMoreIcon, !1) : void _wepy2.default.navigateTo({
                    url: n
                });
                debugger
            },
            seeAllArea: function() {
                _wepy2.default.navigateTo({
                    url: "/pages/scenic/list"
                });
            },
            handleCreateStore: function() {
                this.$invoke("create_store", "open");
            }
        }, r = n, _possibleConstructorReturn(o, r);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "onPageScroll",
        value: function(e) {
            this.scrollTop = e.scrollTop, this.$apply();
        }
    }, {
        key: "onShow",
        value: function() {
            this.currentCity = wx.getStorageSync("currentCity") || {
                name: "武汉",
                value: "420100"
            }, this.$apply();
        }
    }, {
        key: "onLoad",
        value: function(e) {
            try {
                this.headerHeight = wx.getMenuButtonBoundingClientRect().height + 2 * (wx.getMenuButtonBoundingClientRect().top - wx.getSystemInfoSync().safeArea.top);
            } catch (e) {}
            this.getLocation(), this.$apply();
        }
    }, {
        key: "onPullDownRefresh",
        value: function() {
            this.currentPage = 1, this.isBottom = !1, this.$apply(), this.handleGetData();
        }
    }, {
        key: "onReachBottom",
        value: function() {
            this.isBottom || (this.currentPage++, this.$apply(), this.handleGetData());
        }
    }, {
        key: "handleGetData",
        value: function() {
            "shop" == this.type ? this.handleGetHomeData() : this.handleGetRecommend();
        }
    }, {
        key: "handleGetRecommend",
        value: function() {
            var e = this, t = {
                page_index: this.currentPage,
                city_id: this.currentCity.value
            };
            1 == this.currentPage && (0, _api.getHomeData)(t).then(function(t) {
                t.result.shop_list = [], e.homeData = t.result, e.tips = t.result.tips, //e.branner = t.result.branner,
                e.incomplete_shop = t.result.incomplete_shop, e.incomplete_shop_type = t.result.incomplete_shop_type, 
                e.$apply();
            }), (0, _api.getQzShopList)(t).then(function(t) {
                wx.stopPullDownRefresh();
                var n = t.result.list.map(function(e) {
                    return e.shop_type = 3, e;
                });
                e.homeData.shop_list = e.homeData.shop_list.concat(n), t.result.length < 20 && (e.isBottom = !0), 
                e.$apply();
            });
        }
    }, {
        key: "handleGetHomeData",
        value: function() {
            var e = this, t = void 0, n = {
                page_index: this.currentPage,
                city_id: this.currentCity.value
            };
            n.type = 2, t = (0, _api.getShopList)(n), t.then(function(t) {
                if (wx.stopPullDownRefresh(), t && 0 == t.status) {
                    if (1 == e.currentPage) e.homeData.shop_list = t.result.list; else {
                        var n = e;
                        if (e.homeData.shop_list = e.homeData.shop_list.concat(t.result.list), !t.result.is_popup) return !1;
                        wx.showModal({
                            title: "操作提示",
                            content: "您还未发布转店信息，请先发布转店信息",
                            cancelText: "关闭",
                            confirmText: "立即发布",
                            confirmColor: "#d81e06",
                            success: function(e) {
                                e.confirm ? (n.$invoke("create_store", "open"), console.log("用户点击确定")) : e.cancel && console.log("用户点击取消");
                            }
                        });
                    }
                    t.result.length < 20 && (e.isBottom = !0), e.$apply();
                }
            });
        }
    }, {
        key: "onShareAppMessage",
        value: function() {}
    }, {
        key: "getLocation",
        value: function() {
            var e = this;
            wx.getLocation({
                success: function(t) {
                    (0, _api.locationCity)({
                        x: t.latitude,
                        y: t.longitude
                    }).then(function(t) {
                        var n = {
                            name: "武汉",
                            value: "420100"
                        };
                        t.result && t.result.city_id && (n = {
                            name: t.result.city_name,
                            value: t.result.city_id
                        }), e.currentCity = n, wx.setStorageSync("currentCity", n), e.$apply();
                    }).finally(function() {
                        e.handleGetData();
                    });
                },
                fail: function() {
                    e.handleGetData();
                }
            });
        }
    } ]), t;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(Index, "pages/home/index"));