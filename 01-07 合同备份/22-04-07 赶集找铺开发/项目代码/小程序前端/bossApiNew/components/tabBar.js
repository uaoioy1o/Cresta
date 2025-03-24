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
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}(), _wepy = require("./../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), TabBar = function(e) {
    function t() {
        var e, n, r, o;
        _classCallCheck(this, t);
        for (var a = arguments.length, i = Array(a), p = 0; p < a; p++) i[p] = arguments[p];
        return n = r = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(i))), 
        r.props = {
            currentTab: {
                default: 0,
                type: Number
            }
        }, r.data = {
            tabBar: {
                custom: !1,
                color: "#999999",
                selectedColor: "#333",
                borderStyle: "white",
                backgroundColor: "#fff",
                list: [ {
                    pagePath: "/pages/home/index",
                    iconPath: "images/icon_1_normal@3x-01.png",
                    selectedIconPath: "images/" + _wepy2.default.$appConfig.baseConfig.app + "/icon_1_sel@3x-01.png",
                    text: "首页"
                }, {
                    pagePath: "/pages/home/index",
                    text: "发布",
                    iconPath: "images/" + _wepy2.default.$appConfig.baseConfig.app + "/icon_3_normal@3x.png",
                    selectedIconPath: "images/" + _wepy2.default.$appConfig.baseConfig.app + "/icon_3_normal@3x.png"
                }, {
                    pagePath: "/pages/mine/info",
                    iconPath: "images/icon_2_normal@3x-01.png",
                    selectedIconPath: "images/" + _wepy2.default.$appConfig.baseConfig.app + "/icon_2_sel@3x-01.png",
                    text: "我的"
                } ]
            }
        }, r.methods = {
            swichNav: function(e) {
                console.log(e, this.currentTab, e.currentTarget.dataset.current);
                return 1 == e.currentTarget.dataset.current ? (this.$emit("handleCreateStore"), 
                !1) : this.currentTab != e.currentTarget.dataset.current && void wx.redirectTo({
                    url: e.currentTarget.dataset.url
                });
            },
            changeList: function(e) {
                this.tabList = e;
            }
        }, o = n, _possibleConstructorReturn(r, o);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "onLoad",
        value: function() {
            console.log("wepy.$appConfig.baseConfig.name", _wepy2.default.$appConfig.baseConfig.app);
        }
    } ]), t;
}(_wepy2.default.component);

exports.default = TabBar;