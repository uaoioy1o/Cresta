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
            var a = t[r];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(e, a.key, a);
        }
    }
    return function(t, r, a) {
        return r && e(t.prototype, r), a && e(t, a), t;
    };
}(), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _api = require("./../../api/api.js"), _util = require("./../../utils/util.js"), Private = function(e) {
    function t() {
        var e, r, a, n;
        _classCallCheck(this, t);
        for (var i = arguments.length, o = Array(i), l = 0; l < i; l++) o[l] = arguments[l];
        return r = a = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(o))), 
        a.config = {
            navigationBarTitleText: "隐私协议"
        }, a.data = {
            articleData: {
                title: "欢迎您使用" + _wepy2.default.$appConfig.baseConfig.name + "的服务"
            },
            articleDatabody: "",
            type: ""
        }, a.methods = {
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
        }, n = r, _possibleConstructorReturn(a, n);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "onLoad",
        value: function(e) {
            var t = this;
            e.id, e.type, e.scene;
            (0, _api.getPrivate)({
                method: "get",
                app: _wepy2.default.$appConfig.baseConfig.app
            }).then(function(e) {
                t.articleDatabody = e.result.body, t.articleData.title = e.result.title, t.$apply();
            });
        }
    } ]), t;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(Private, "pages/store/private"));