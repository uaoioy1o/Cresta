function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _defineProperty(e, t, r) {
    return t in e ? Object.defineProperty(e, t, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = r, e;
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
        for (var r = 0; r < t.length; r++) {
            var a = t[r];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(e, a.key, a);
        }
    }
    return function(t, r, a) {
        return r && e(t.prototype, r), a && e(t, a), t;
    };
}(), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _authorize = require("./../../mixins/authorize.js"), _authorize2 = _interopRequireDefault(_authorize), _api = require("./../../api/api.js"), _mathUtil = require("./../../utils/mathUtil.js"), _mathUtil2 = _interopRequireDefault(_mathUtil), _storeItem = require("./../../components/storeItem.js"), _storeItem2 = _interopRequireDefault(_storeItem), _storePicker = require("./../../components/storePicker.js"), _storePicker2 = _interopRequireDefault(_storePicker), _createStore = require("./../../components/createStore.js"), _createStore2 = _interopRequireDefault(_createStore), _empty = require("./../../components/empty.js"), _empty2 = _interopRequireDefault(_empty), _banner = require("./../../components/banner.js"), _banner2 = _interopRequireDefault(_banner), title = [ "出租", "转让", "求租" ], Search = function(e) {
    function t() {
        var e, r, a, n;
        _classCallCheck(this, t);
        for (var i = arguments.length, o = Array(i), s = 0; s < i; s++) o[s] = arguments[s];
        return r = a = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(o))), 
        a.config = {
            navigationStyle: "custom",
            enablePullDownRefresh: !0
        }, a.data = {
            statusBarHeight: wx.getSystemInfoSync().statusBarHeight,
            headerHeight: 40,
            lat1: 0,
            lng1: 0,
            dataSource: [],
            currentPage: 1,
            goodsType: [ {
                name: "出租",
                value: 1
            }, {
                name: "转让",
                value: 2
            }, {
                name: "求租",
                value: 3
            } ],
            type: 1,
            title: "出租",
            banner: [],
            isBottom: !1,
            searchParams: {},
            searchKey: "",
            shoptype: "search",
            pageTitle: {
                search: "搜索店铺",
                visit_desc: "热度排行",
                transfer_fee_asc: "高性价比",
                service_time_desc: "急转店铺",
                special: "冷门行业",
                transfer_fee: "找合伙人"
            }
        }, a.mixins = [ _authorize2.default ], a.$repeat = {}, a.$props = {
            store_item: {
                "xmlns:v-bind": "",
                "v-bind:item.sync": "item"
            },
            store_picker: {
                top: "44",
                "xmlns:v-on": ""
            }
        }, a.$events = {
            store_picker: {
                "v-on:handleSelectPickerType": "handleSelectPickerType"
            }
        }, a.components = {
            store_item: _storeItem2.default,
            create_store: _createStore2.default,
            store_picker: _storePicker2.default,
            empty: _empty2.default,
            banner: _banner2.default
        }, a.methods = {
            goBack: function() {
                wx.navigateBack();
            },
            handleChangeBanner: function(e) {
                this.currentBanner = e.detail.current, this.$apply();
            },
            handleCreateStore: function() {
                this.$invoke("create_store", "open");
            },
            handleSelectPickerType: function(e) {
                this.searchParams = Object.assign({}, this.searchParams, e), this.currentPage = 1, 
                this.$apply(), this.handleGetHomeData();
            },
            inputValueChanged: function(e) {
                this.searchKey = e.detail.value, this.currentPage = 1, this.$apply(), this.handleGetHomeData();
            },
            openPage: function(e) {
                this.type = e, this.currentPage = 1, this.$apply(), this.handleGetHomeData();
            }
        }, n = r, _possibleConstructorReturn(a, n);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "onLoad",
        value: function(e) {
            this.type = e.type || 1, this.title = title[this.type - 1], this.shoptype = e.shoptype || "search";
            try {
                this.headerHeight = wx.getMenuButtonBoundingClientRect().height + 2 * (wx.getMenuButtonBoundingClientRect().top - wx.getSystemInfoSync().safeArea.top);
            } catch (e) {}
            this.$apply();
        }
    }, {
        key: "onShow",
        value: function() {
            if ("search" == this.shoptype) return !1;
            "special" == this.shoptype ? this.searchParams = {
                trade_id: 138
            } : this.searchParams = _defineProperty({}, this.shoptype, 1), this.$apply(), this.handleGetHomeData();
        }
    }, {
        key: "onPullDownRefresh",
        value: function() {
            this.currentPage = 1, this.$apply(), this.handleGetHomeData();
        }
    }, {
        key: "onReachBottom",
        value: function() {
            this.isBottom || (this.currentPage++, this.$apply(), this.handleGetHomeData());
        }
    }, {
        key: "handleGetHomeData",
        value: function() {
            var e = this;
            if (!this.searchKey && "search" == this.shoptype) return !1;
            var t = wx.getStorageSync("currentCity") || {
                name: "武汉",
                value: "420100"
            }, r = void 0, a = Object.assign({}, {
                page_index: this.currentPage,
                type: this.type,
                title: this.searchKey,
                city_id: t.value
            }, this.searchParams);
            r = 3 == this.type ? (0, _api.getQzShopList)(a) : (0, _api.getShopList)(a), r.then(function(t) {
                if (wx.stopPullDownRefresh(), t && 0 == t.status) {
                    var r = t.result.list.map(function(t) {
                        return t.shop_type = e.type, t;
                    });
                    1 == e.currentPage ? e.dataSource = r : e.dataSource = e.dataSource.concat(r), t.result.length < 20 && (e.isBottom = !0), 
                    e.$apply();
                }
            });
        }
    }, {
        key: "onShareAppMessage",
        value: function() {}
    } ]), t;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(Search, "pages/store/search"));