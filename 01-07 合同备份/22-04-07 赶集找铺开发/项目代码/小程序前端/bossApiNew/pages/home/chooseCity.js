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
}(), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _authorize = require("./../../mixins/authorize.js"), _authorize2 = _interopRequireDefault(_authorize), _api = require("./../../api/api.js"), title = [ "出租", "转让", "求租" ], ChooseCity = function(e) {
    function t() {
        var e, r, n, a;
        _classCallCheck(this, t);
        for (var i = arguments.length, o = Array(i), u = 0; u < i; u++) o[u] = arguments[u];
        return r = n = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(o))), 
        n.config = {
            navigationBarTitleText: "选择城市"
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
            currentProvince: 11e4,
            currentCity: {},
            province: [],
            city: []
        }, n.mixins = [ _authorize2.default ], n.components = {}, n.methods = {
            handleCreateStore: function() {
                this.$invoke("create_store", "open");
            },
            handleSelectPickerType: function(e) {
                this.searchParams = e, this.currentPage = 1, this.handleGetHomeData(this.type, this.currentPage), 
                this.$apply();
            },
            changeType: function(e) {
                this.currentProvince = e.value, this.$apply(), this.handleGetHomeData(e.value);
            },
            changeCity: function(e) {
                this.currentCity = e, wx.setStorageSync("currentCity", e), wx.setStorageSync("currentProvince", this.currentProvince), 
                this.$apply();
                var t = getCurrentPages(), r = t[t.length - 2];
                r && r.handleGetData && r.handleGetData(), wx.navigateBack();
            }
        }, a = r, _possibleConstructorReturn(n, a);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "onLoad",
        value: function(e) {
            this.currentCity = wx.getStorageSync("currentCity") || {
                name: "武汉",
                value: "420100"
            };
            try {
                this.headerHeight = wx.getMenuButtonBoundingClientRect().height + 2 * (wx.getMenuButtonBoundingClientRect().top - wx.getSystemInfoSync().safeArea.top);
            } catch (e) {}
            this.$apply();
        }
    }, {
        key: "onShow",
        value: function() {
            this.handleGetHomeData(0);
        }
    }, {
        key: "handleGetHomeData",
        value: function(e) {
            var t = this;
            (0, _api.getRegion)({
                pid: e
            }).then(function(r) {
                wx.stopPullDownRefresh(), r && 0 == r.status && (0 == e ? (t.province = r.result.area_province, 
                t.city = r.result.area_city) : ([ 11e4, 12e4, 31e4, 5e5 ].indexOf(e), t.city = r.result.area_city), 
                t.$apply());
            });
        }
    } ]), t;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(ChooseCity, "pages/home/chooseCity"));