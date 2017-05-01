'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectedReduxRedirect = exports.connectedRouterRedirect = undefined;

var _locationHelper = require('../history3/locationHelper');

var _locationHelper2 = _interopRequireDefault(_locationHelper);

var _redirect = require('../helper/redirect');

var _redirect2 = _interopRequireDefault(_redirect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _locationHelperBuilde = (0, _locationHelper2.default)({}),
    createRedirectLoc = _locationHelperBuilde.createRedirectLoc;

var _redirectUtil = (0, _redirect2.default)({
  createRedirectLoc: createRedirectLoc
});

var connectedRouterRedirect = _redirectUtil.connectedRouterRedirect,
    connectedReduxRedirect = _redirectUtil.connectedReduxRedirect;
exports.connectedRouterRedirect = connectedRouterRedirect;
exports.connectedReduxRedirect = connectedReduxRedirect;