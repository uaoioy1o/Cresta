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
}(), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _api = require("./../../api/api.js"), _authorize = require("./../../mixins/authorize.js"), _authorize2 = _interopRequireDefault(_authorize), _storeItem = require("./../../components/storeItem.js"), _storeItem2 = _interopRequireDefault(_storeItem), _empty = require("./../../components/empty.js"), _empty2 = _interopRequireDefault(_empty), _tip = require("./../../utils/tip.js"), _tip2 = _interopRequireDefault(_tip), _banner = require("./../../components/banner.js"), _banner2 = _interopRequireDefault(_banner), FollowList = function(e) {
    function t() {
        var e, n, r, o;
        _classCallCheck(this, t);
        for (var a = arguments.length, i = Array(a), l = 0; l < a; l++) i[l] = arguments[l];
        return n = r = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(i))), 
        r.config = {
            navigationBarTitleText: "我的关注",
            enablePullDownRefresh: !0
        }, r.$repeat = {}, r.$props = {
            store_item: {
                "xmlns:v-bind": "",
                "v-bind:item.sync": "item",
                "xmlns:v-on": "",
                bottom: "hidden",
                btnType: "follow"
            },
            empty: {
                title: "暂未关注店铺"
            },
            banner: {
                type: "12"
            }
        }, r.$events = {
            store_item: {
                "v-on:handleCancelFollow": "handleCancelFollow"
            }
        }, r.components = {
            store_item: _storeItem2.default,
            empty: _empty2.default,
            banner: _banner2.default
        }, r.data = {
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
            triggered: !1,
            dataSource: [],
            isBottom: !1
        }, r.mixins = [ _authorize2.default ], r.methods = {
            openPage: function(e) {
                this.currentType = e, this.$apply(), this.handleSearch(1);
            },
            handleCancelFollow: function(e) {
                var t = this;
                (0, _api.cancleFollow)({
                    id: e.id
                }).then(function(e) {
                    _tip2.default.toast("取消成功"), t.handleSearch(t.currentPage);
                });
            }
        }, o = n, _possibleConstructorReturn(r, o);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "onPullDownRefresh",
        value: function() {
            this.currentPage = 1, this.handleSearch(this.currentPage), this.$apply();
        }
    }, {
        key: "onReachBottom",
        value: function() {
            this.isBottom || (this.currentPage++, this.handleSearch(this.currentPage), this.$apply());
        }
    }, {
        key: "handleSearch",
        value: function(e) {
            var t = this;
            (0, _api.followList)({
                type: this.currentType,
                page_index: e
            }).then(function(n) {
                wx.stopPullDownRefresh(), t.dataSource = 1 == e ? n.result : t.dataSource.concat(n.result), 
                n.result.length < 15 && (t.isBottom = !0), t.$apply();
            });
        }
    }, {
        key: "onShow",
        value: function() {
            this.handleSearch(this.currentPage);
        }
    } ]), t;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(FollowList, "pages/mine/followList"));