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
}(), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _api = require("./../../api/api.js"), _util = require("./../../utils/util.js"), detail = function(e) {
    function t() {
        var e, r, n, a;
        _classCallCheck(this, t);
        for (var i = arguments.length, o = Array(i), l = 0; l < i; l++) o[l] = arguments[l];
        return r = n = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(o))), 
        n.config = {
            navigationBarTitleText: "详情"
        }, n.data = {
            articleData: {},
            articleDatabody: "",
            type: ""
        }, n.methods = {
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
        }, a = r, _possibleConstructorReturn(n, a);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "onLoad",
        value: function(e) {
            var t = this, r = e.id;
            e.type, e.scene;
            (0, _api.getRecommendInfo)({
                id: r
            }).then(function(e) {
                e.result && (t.articleData = e.result, t.articleDatabody = e.result.content.replace(/\<img/gi, '<img style="display:block;max-width:100%;height:auto;margin:0 auto;padding:0"'), 
                t.$apply());
            });
        }
    } ]), t;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(detail, "pages/home/detail"));