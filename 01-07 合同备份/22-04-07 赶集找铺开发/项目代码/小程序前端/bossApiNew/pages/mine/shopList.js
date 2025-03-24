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
}(), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _api = require("./../../api/api.js"), _authorize = require("./../../mixins/authorize.js"), _authorize2 = _interopRequireDefault(_authorize), _storeItem = require("./../../components/storeItem.js"), _storeItem2 = _interopRequireDefault(_storeItem), _empty = require("./../../components/empty.js"), _empty2 = _interopRequireDefault(_empty), _banner = require("./../../components/banner.js"), _banner2 = _interopRequireDefault(_banner), ShopList = function(e) {
    function t() {
        var e, r, n, o;
        _classCallCheck(this, t);
        for (var a = arguments.length, i = Array(a), u = 0; u < a; u++) i[u] = arguments[u];
        return r = n = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(i))), 
        n.config = {
            navigationBarTitleText: "我的店铺",
            enablePullDownRefresh: !0
        }, n.$repeat = {}, n.$props = {
            store_item: {
                "xmlns:v-bind": "",
                "v-bind:item.sync": "item",
                "xmlns:v-on": "",
                btnType: "store",
                bottom: "hidden"
            },
            banner: {
                type: "15"
            }
        }, n.$events = {
            store_item: {
                "v-on:handleGetList": "handleSearch"
            }
        }, n.components = {
            store_item: _storeItem2.default,
            empty: _empty2.default,
            banner: _banner2.default
        }, n.data = {
            goodsType: [ {
                name: "转让",
                value: 2
            }, {
                name: "出租",
                value: 1
            }, {
                name: "求租",
                value: 3
            } ],
            currentType: 2,
            pageSize: 10,
            currentPage: 1,
            dataSource: [],
            triggered: !1,
            isBottom: !1
        }, n.mixins = [ _authorize2.default ], n.methods = {
            openPage: function(e) {
                this.currentType = e, this.$apply(), this.handleSearch();
            },
            handleSearch: function() {
                this.handleSearch();
            }
        }, o = r, _possibleConstructorReturn(n, o);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "onPullDownRefresh",
        value: function() {
            this.currentPage = 1, this.$apply(), this.handleSearch();
        }
    }, {
        key: "onReachBottom",
        value: function() {
            this.isBottom || (this.currentPage++, this.$apply(), this.handleSearch());
        }
    }, {
        key: "handleSearch",
        value: function() {
            var e = this;
            (0, _api.myShopList)({
                type: this.currentType,
                page_index: this.currentPage
            }).then(function(t) {
                wx.stopPullDownRefresh(), 1 == e.currentPage ? e.dataSource = t.result : e.dataSource = e.dataSource.concat(t.result), 
                t.result.length < 15 && (e.isBottom = !0), e.$apply();
            });
        }
    }, {
        key: "onShow",
        value: function() {
            this.handleSearch();
        }
    } ]), t;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(ShopList, "pages/mine/shopList"));