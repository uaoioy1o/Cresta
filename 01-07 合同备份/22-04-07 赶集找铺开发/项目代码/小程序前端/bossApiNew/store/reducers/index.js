function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _redux = require("./../../npm/redux/lib/index.js"), _hotel = require("./hotel.js"), _hotel2 = _interopRequireDefault(_hotel), _order = require("./order.js"), _order2 = _interopRequireDefault(_order), _contact = require("./contact.js"), _contact2 = _interopRequireDefault(_contact);

exports.default = (0, _redux.combineReducers)({
    hotel: _hotel2.default,
    order: _order2.default,
    contact: _contact2.default
});