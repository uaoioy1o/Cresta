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
}), exports.default = void 0;

var _createClass = function() {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var r = t[a];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, a, r) {
        return a && e(t.prototype, a), r && e(t, r), t;
    };
}(), _wepy = require("./../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _api = require("./../api/api.js"), _tip = require("./../utils/tip.js"), _tip2 = _interopRequireDefault(_tip), _cloneData = require("./../utils/cloneData.js"), _cloneData2 = _interopRequireDefault(_cloneData), StorePicker = function(e) {
    function t() {
        var e, a, r, n;
        _classCallCheck(this, t);
        for (var i = arguments.length, s = Array(i), u = 0; u < i; u++) s[u] = arguments[u];
        return a = r = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(s))), 
        r.props = {
            top: String
        }, r.data = {
            statusBarHeight: wx.getSystemInfoSync().statusBarHeight,
            headerHeight: 40,
            dataSource: [],
            type: [ {
                name: "区域",
                value: "area",
                data: []
            }, {
                name: "行业",
                value: "trade",
                data: []
            }, {
                name: "面积",
                value: "size",
                data: [ {
                    name: "全部",
                    value: ""
                }, {
                    name: "小于20㎡",
                    value: "[0,20]"
                }, {
                    name: "21-50㎡",
                    value: "[21,50]"
                }, {
                    name: "51-100㎡",
                    value: "[51,100]"
                }, {
                    name: "101-200㎡",
                    value: "[101,200]"
                }, {
                    name: "201-500㎡",
                    value: "[201,500]"
                }, {
                    name: "501-1000㎡",
                    value: "[501,1000]"
                }, {
                    name: "1001㎡以上",
                    value: "[1001,10000]"
                } ]
            }, {
                name: "筛选",
                value: "filter",
                data: [ {
                    name: "全部",
                    value: ""
                }, {
                    name: "面积从大到小",
                    value: "area_size_desc"
                }, {
                    name: "面积从小到大",
                    value: "area_size_asc"
                }, {
                    name: "租金从高到低",
                    value: "rent_money_desc"
                }, {
                    name: "租金从低到高",
                    value: "rent_money_asc"
                } ]
            } ],
            currentType: "",
            currentCity: {},
            params: {
                area_id: "",
                trade_id: "",
                area_size: ""
            },
            display: {},
            sort: {
                area_size_asc: null,
                area_size_desc: null,
                rent_money_asc: null,
                rent_money_desc: null
            }
        }, r.methods = {
            handleClick: function(e, t) {
                this.currentType = e, this.dataSource = this.type[t].data, this.$apply();
            },
            handleClose: function() {
                this.currentType = "", this.$apply();
            },
            handleSelect: function(e) {
                if (this.display[this.currentType] = e.name, "area" == this.currentType) this.params.area_id = e.value, 
                e.value || (this.display[this.currentType] = "区域"); else if ("trade" == this.currentType) this.params.trade_id = e.value, 
                1 == e.value && (this.display[this.currentType] = "行业", delete this.params.trade_id); else if ("size" == this.currentType) this.params.area_size = e.value, 
                e.value || (this.display[this.currentType] = "面积"); else {
                    var t = (0, _cloneData2.default)(this.sort);
                    t[e.value] = 1, this.params = Object.assign({}, this.params, t);
                }
                this.currentType = "", this.$apply();
                var a = (0, _cloneData2.default)(this.params);
                a.area_size = a.area_size ? JSON.parse(a.area_size) : "", this.$emit("handleSelectPickerType", a);
            }
        }, n = a, _possibleConstructorReturn(r, n);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "onLoad",
        value: function() {
            this.currentCity = wx.getStorageSync("currentCity") || {
                name: "武汉",
                value: "420100"
            }, this.top = 1 * this.top;
            try {
                this.headerHeight = wx.getMenuButtonBoundingClientRect().height + 2 * (wx.getMenuButtonBoundingClientRect().top - wx.getSystemInfoSync().safeArea.top);
            } catch (e) {}
            this.handleGetShopTrade(), this.handleGetArea();
        }
    }, {
        key: "handleGetArea",
        value: function() {
            var e = this;
            (0, _api.getRegion)({
                pid: this.currentCity.value
            }).then(function(t) {
                e.type[0].data = [ {
                    name: "全部",
                    value: ""
                } ].concat(t.result.area), e.$apply();
            });
        }
    }, {
        key: "handleGetShopTrade",
        value: function() {
            var e = this;
            (0, _api.getShopTrade)({
                pid: 0
            }).then(function(t) {
                e.type[1].data = t.result.first, e.$apply();
            });
        }
    } ]), t;
}(_wepy2.default.component);

exports.default = StorePicker;