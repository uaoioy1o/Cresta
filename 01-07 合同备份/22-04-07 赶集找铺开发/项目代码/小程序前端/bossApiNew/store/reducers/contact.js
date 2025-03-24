function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _extends = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];
        for (var c in n) Object.prototype.hasOwnProperty.call(n, c) && (t[c] = n[c]);
    }
    return t;
}, _reduxActions = require("./../../npm/redux-actions/lib/index.js"), _cloneData = require("./../../utils/cloneData.js"), _cloneData2 = _interopRequireDefault(_cloneData), _contact = require("./../types/contact.js"), initialState = {
    _concatList: [],
    concatList: [],
    selectedConcatList: [],
    concatInfo: {}
}, actions = {};

actions[_contact.SELECTED_CONCAT] = function(t, e) {
    var n = t.concatList.filter(function(t) {
        return 1 == t.selected;
    });
    return _extends({}, t, {
        selectedConcatList: n
    });
}, actions[_contact.SELECT_CONCAT] = function(t, e) {
    var n = e.payload.id, c = t.concatList;
    n && (c = c.map(function(t) {
        return n.indexOf(t.id.toString()) > -1 ? t.selected = !0 : t.selected = !1, t;
    }));
    var a = c.filter(function(t) {
        return 1 == t.selected;
    });
    return _extends({}, t, {
        concatList: c,
        selectedConcatList: a
    });
}, actions[_contact.CONCAT_LIST] = function(t, e) {
    var n = e.payload, c = n ? n.result : [], a = (0, _cloneData2.default)(c), i = t.selectedConcatList;
    if (i.length > 0) {
        var o = i.map(function(t) {
            return t.id;
        });
        a = a.map(function(t) {
            return o.indexOf(t.id) > -1 ? t.selected = !0 : t.selected = !1, t;
        });
    }
    return _extends({}, t, {
        _concatList: c,
        concatList: a
    });
}, actions[_contact.REST_SELECTED_CONCAT] = function(t, e) {
    var n = (0, _cloneData2.default)(t._concatList);
    return _extends({}, t, {
        concatList: n,
        selectedConcatList: []
    });
}, exports.default = (0, _reduxActions.handleActions)(actions, initialState);