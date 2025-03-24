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
            var i = t[r];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, r, i) {
        return r && e(t.prototype, r), i && e(t, i), t;
    };
}(), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _api = require("./../../api/api.js"), _util = require("./../../utils/util.js"), XieYi = function(e) {
    function t() {
        var e, r, i, n;
        _classCallCheck(this, t);
        for (var a = arguments.length, o = Array(a), l = 0; l < a; l++) o[l] = arguments[l];
        return r = i = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(o))), 
        i.config = {
            navigationBarTitleText: "服务协议"
        }, i.data = {
            articleData: {
                title: "欢迎您使用" + _wepy2.default.$appConfig.baseConfig.name + "的服务"
            },
            articleDatabody: "",
            type: ""
        }, i.methods = {
            openPage: function(e) {
                wx.navigateTo({
                    url: e.link
                });
            },
            onShareTimeline: function() {
                var e = this;
                return {
                    title: e.articleData.title,
                    imageUrl: e.articleData.thumb
                };
            }
        }, n = r, _possibleConstructorReturn(i, n);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "onLoad",
        value: function(e) {
            var t = this;
            (0, _api.getXieyi)({
                method: "get",
                app: _wepy2.default.$appConfig.baseConfig.app
            }).then(function(e) {
                t.articleDatabody = e.result.body, t.articleData.title = e.result.title, t.$apply();
            });
        }
    } ]), t;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(XieYi, "pages/store/xieyi"));