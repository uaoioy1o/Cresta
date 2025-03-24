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
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
    };
}(), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _authorize = require("./../../mixins/authorize.js"), _authorize2 = _interopRequireDefault(_authorize), _api = require("./../../api/api.js"), _mathUtil = require("./../../utils/mathUtil.js"), _mathUtil2 = _interopRequireDefault(_mathUtil), _storeItem = require("./../../components/storeItem.js"), _storeItem2 = _interopRequireDefault(_storeItem), _storePicker = require("./../../components/storePicker.js"), _storePicker2 = _interopRequireDefault(_storePicker), _storePickerMin = require("./../../components/storePickerMin.js"), _storePickerMin2 = _interopRequireDefault(_storePickerMin), _createStore = require("./../../components/createStore.js"), _createStore2 = _interopRequireDefault(_createStore), _empty = require("./../../components/empty.js"), _empty2 = _interopRequireDefault(_empty), _banner = require("./../../components/banner.js"), _banner2 = _interopRequireDefault(_banner), title = [ "出租", "转让", "求租" ], StoreList = function(e) {
    function t() {
        var e, r, n, i;
        _classCallCheck(this, t);
        for (var a = arguments.length, o = Array(a), s = 0; s < a; s++) o[s] = arguments[s];
        return r = n = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(o))), 
        n.config = {
            navigationStyle: "custom",
            enablePullDownRefresh: !0
        }, n.data = {
            statusBarHeight: wx.getSystemInfoSync().statusBarHeight,
            headerHeight: 40,
            lat1: 0,
            lng1: 0,
            dataSource: [],
            currentPage: 1,
            type: 1,
            title: "出租",
            banner: [],
            isBottom: !1,
            searchParams: {},
            searchKey: "",
            currentCity: {}
        }, n.mixins = [ _authorize2.default ], n.$repeat = {}, n.$props = {
            store_item: {
                "v-bind:item.sync": "item"
            },
            store_picker: {
                "xmlns:v-on": ""
            },
            store_picker_min: {
                "xmlns:v-bind": "",
                "v-bind:currentCity.sync": "currentCity"
            },
            banner: {
                type: "4"
            }
        }, n.$events = {
            store_picker: {
                "v-on:handleSelectPickerType": "handleSelectPickerType"
            },
            store_picker_min: {
                "v-on:handleSelectPickerType": "handleSelectPickerType"
            }
        }, n.components = {
            store_item: _storeItem2.default,
            create_store: _createStore2.default,
            store_picker: _storePicker2.default,
            store_picker_min: _storePickerMin2.default,
            empty: _empty2.default,
            banner: _banner2.default
        }, n.methods = {
            goBack: function() {
                wx.navigateBack();
            },
            handleOpenPage: function(e) {
                if (!e) return !1;
                wx.navigateTo({
                    url: e
                });
            },
            handleChangeBanner: function(e) {
                this.currentBanner = e.detail.current, this.$apply();
            },
            handleCreateStore: function() {
                this.$invoke("create_store", "open");
            },
            handleSelectPickerType: function(e) {
                this.searchParams = e, this.currentPage = 1, this.$apply(), this.handleGetHomeData();
            },
            inputValueChanged: function(e) {
                this.searchKey = e.detail.value, this.currentPage = 1, this.$apply(), this.handleGetHomeData();
            }
        }, i = r, _possibleConstructorReturn(n, i);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "onLoad",
        value: function(e) {
            this.type = e.type || 1, this.title = title[this.type - 1];
            try {
                this.headerHeight = wx.getMenuButtonBoundingClientRect().height + 2 * (wx.getMenuButtonBoundingClientRect().top - wx.getSystemInfoSync().safeArea.top);
            } catch (e) {}
            this.$apply(), this.handleGetHomeData();
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
        key: "handleGetData",
        value: function() {
            this.currentPage = 1, this.$apply(), this.handleGetHomeData();
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
            var e = this, t = wx.getStorageSync("currentCity") || {
                name: "武汉",
                value: "420100"
            }, r = void 0, n = Object.assign({}, {
                page_index: this.currentPage,
                type: this.type,
                title: this.searchKey,
                city_id: t.value
            }, this.searchParams);
            r = 3 == this.type ? (0, _api.getQzShopList)(n) : (0, _api.getShopList)(n), r.then(function(t) {
                if (wx.stopPullDownRefresh(), t && 0 == t.status) {
                    t.result.list.map(function(t) {
                        return t.shop_type = e.type, t;
                    });
                    if (1 == e.currentPage) e.dataSource = t.result.list; else {
                        e.dataSource = e.dataSource.concat(t.result.list);
                    }
                    if (t.result.length < 10 && (e.isBottom = !0), e.$apply(), !t.result.is_popup) return !1;
                    wx.showModal({
                        title: "操作提示",
                        content: "您还未发布转店信息，请先发布转店信息",
                        cancelText: "关闭",
                        confirmText: "立即发布",
                        confirmColor: "#d81e06",
                        success: function(e) {
                            e.confirm ? that.$invoke("create_store", "open") : e.cancel;
                        }
                    });
                }
            });
        }
    }, {
        key: "onShareAppMessage",
        value: function() {}
    } ]), t;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(StoreList, "pages/store/list"));