function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function configStore() {
    return (0, _redux.createStore)(_reducers2.default, (0, _redux.applyMiddleware)(_reduxPromise2.default));
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = configStore;

var _redux = require("./../npm/redux/lib/index.js"), _reduxPromise = require("./../npm/redux-promise/lib/index.js"), _reduxPromise2 = _interopRequireDefault(_reduxPromise), _reducers = require("./reducers/index.js"), _reducers2 = _interopRequireDefault(_reducers);