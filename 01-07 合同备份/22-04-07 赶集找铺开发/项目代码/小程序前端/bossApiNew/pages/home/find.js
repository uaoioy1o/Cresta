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
}(), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _authorize = require("./../../mixins/authorize.js"), _authorize2 = _interopRequireDefault(_authorize), _api = require("./../../api/api.js"), _mathUtil = require("./../../utils/mathUtil.js"), _mathUtil2 = _interopRequireDefault(_mathUtil), _findStoreItem = require("./../../components/findStoreItem.js"), _findStoreItem2 = _interopRequireDefault(_findStoreItem), _storePicker = require("./../../components/storePicker.js"), _storePicker2 = _interopRequireDefault(_storePicker), _createStore = require("./../../components/createStore.js"), _createStore2 = _interopRequireDefault(_createStore), _empty = require("./../../components/empty.js"), _empty2 = _interopRequireDefault(_empty), _banner = require("./../../components/banner.js"), _banner2 = _interopRequireDefault(_banner), title = [ "出租", "转店", "找店" ], Find = function(e) {
    function t() {
        var e, r, n, a;
        _classCallCheck(this, t);
        for (var i = arguments.length, o = Array(i), s = 0; s < i; s++) o[s] = arguments[s];
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
            type: 2,
            title: "出租",
            banner: [],
            isBottom: !1,
            searchParams: {}
        }, n.mixins = [ _authorize2.default ], n.$repeat = {}, n.$props = {
            find_store_item: {
                "xmlns:v-bind": "",
                "v-bind:item.sync": "item"
            },
            banner: {
                "xmlns:wx": "",
                type: "6"
            }
        }, n.$events = {}, n.components = {
            find_store_item: _findStoreItem2.default,
            create_store: _createStore2.default,
            store_picker: _storePicker2.default,
            empty: _empty2.default,
            banner: _banner2.default
        }, n.methods = {
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
                this.searchParams = e, this.currentPage = 1, this.handleGetHomeData(this.type, this.currentPage), 
                this.$apply();
            }
        }, a = r, _possibleConstructorReturn(n, a);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "onLoad",
        value: function(e) {
            this.type = e.type || 2, this.title = title[this.type - 1], this.$apply(), this.handleGetHomeData(this.type, this.currentPage);
            try {
                this.headerHeight = wx.getMenuButtonBoundingClientRect().height + 2 * (wx.getMenuButtonBoundingClientRect().top - wx.getSystemInfoSync().safeArea.top);
            } catch (e) {}
        }
    }, {
        key: "onPullDownRefresh",
        value: function() {
            this.currentPage = 1, this.handleGetHomeData(this.type, this.currentPage), this.$apply();
        }
    }, {
        key: "onReachBottom",
        value: function() {
            this.isBottom || (this.currentPage++, this.handleGetHomeData(this.type, this.currentPage), 
            this.$apply());
        }
    }, {
        key: "onShareAppMessage",
        value: function() {}
    }, {
        key: "handleGetHomeData",
        value: function(e, t) {
            var r = this, n = void 0;
            n = 3 == e ? (0, _api.accumulateFindShop)(Object.assign({}, {
                page_index: t
            }, this.searchParams)) : (0, _api.accumulateTransferList)(Object.assign({}, {
                page_index: t
            }, this.searchParams)), n.then(function(e) {
                wx.stopPullDownRefresh(), e && 0 == e.status && (r.dataSource = 1 == t ? e.result : r.dataSource.concat(e.result), 
                e.result.length < 10 && (r.isBottom = !0), r.$apply());
            });
        }
    } ]), t;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(Find, "pages/home/find"));