function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function getUndefinedStateErrorMessage(e, t) {
    var n = t && t.type;
    return "Given action " + (n && '"' + n.toString() + '"' || "an action") + ', reducer "' + e + '" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.';
}

function getUnexpectedStateShapeWarningMessage(e, t, n, r) {
    var i = Object.keys(t), o = n && n.type === _createStore.ActionTypes.INIT ? "preloadedState argument passed to createStore" : "previous state received by the reducer";
    if (0 === i.length) return "Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.";
    if (!(0, _isPlainObject2.default)(e)) return "The " + o + ' has unexpected type of "' + {}.toString.call(e).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following keys: "' + i.join('", "') + '"';
    var a = Object.keys(e).filter(function(e) {
        return !t.hasOwnProperty(e) && !r[e];
    });
    return a.forEach(function(e) {
        r[e] = !0;
    }), a.length > 0 ? "Unexpected " + (a.length > 1 ? "keys" : "key") + ' "' + a.join('", "') + '" found in ' + o + '. Expected to find one of the known reducer keys instead: "' + i.join('", "') + '". Unexpected keys will be ignored.' : void 0;
}

function assertReducerShape(e) {
    Object.keys(e).forEach(function(t) {
        var n = e[t];
        if (void 0 === n(void 0, {
            type: _createStore.ActionTypes.INIT
        })) throw new Error('Reducer "' + t + "\" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.");
        if (void 0 === n(void 0, {
            type: "@@redux/PROBE_UNKNOWN_ACTION_" + Math.random().toString(36).substring(7).split("").join(".")
        })) throw new Error('Reducer "' + t + "\" returned undefined when probed with a random type. Don't try to handle " + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.');
    });
}

function combineReducers(e) {
    for (var t = Object.keys(e), n = {}, r = 0; r < t.length; r++) {
        var i = t[r];
        "function" == typeof e[i] && (n[i] = e[i]);
    }
    var o = Object.keys(n), a = void 0;
    try {
        assertReducerShape(n);
    } catch (e) {
        e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
        a = e;
    }
    return function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1];
        if (a) throw a;
        for (var r = !1, i = {}, u = 0; u < o.length; u++) {
            var s = o[u], d = n[s], c = e[s], l = d(c, t);
            if (void 0 === l) {
                var f = getUndefinedStateErrorMessage(s, t);
                throw new Error(f);
            }
            i[s] = l, r = r || l !== c;
        }
        return r ? i : e;
    };
}

exports.__esModule = !0, exports.default = combineReducers;

var _createStore = require("./createStore.js"), _isPlainObject = require("./../../lodash/isPlainObject.js"), _isPlainObject2 = _interopRequireDefault(_isPlainObject), _warning = require("./utils/warning.js"), _warning2 = _interopRequireDefault(_warning);