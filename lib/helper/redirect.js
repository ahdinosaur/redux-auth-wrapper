'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reactRedux = require('react-redux');

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _authWrapper = require('../authWrapper');

var _authWrapper2 = _interopRequireDefault(_authWrapper);

var _redirect = require('../redirect');

var _redirect2 = _interopRequireDefault(_redirect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connectedDefaults = {
  authenticatingSelector: function authenticatingSelector() {
    return false;
  },
  allowRedirectBack: true,
  FailureComponent: _redirect2.default
};

exports.default = function (_ref) {
  var createRedirectLoc = _ref.createRedirectLoc;


  var connectedRouterRedirect = function connectedRouterRedirect(args) {
    var allArgs = _extends({}, connectedDefaults, args);
    var redirectPath = allArgs.redirectPath,
        authSelector = allArgs.authSelector,
        authenticatingSelector = allArgs.authenticatingSelector,
        allowRedirectBack = allArgs.allowRedirectBack;


    var redirectPathSelector = void 0;
    if (typeof redirectPath === 'string') {
      redirectPathSelector = function redirectPathSelector() {
        return redirectPath;
      };
    } else if (typeof redirectPath === 'function') {
      redirectPathSelector = redirectPath;
    } else {
      (0, _invariant2.default)(false, 'redirectPath must be either a string or a function');
    }

    var redirect = function redirect(history) {
      return function () {
        return history.replace(createRedirectLoc(allowRedirectBack).apply(undefined, arguments));
      };
    };

    return function (DecoratedComponent) {
      return (0, _reactRedux.connect)(function (state, ownProps) {
        return {
          redirectPath: redirectPathSelector(state, ownProps),
          authData: authSelector(state, ownProps),
          isAuthenticating: authenticatingSelector(state, ownProps),
          redirect: redirect(ownProps.history)
        };
      })((0, _authWrapper2.default)(allArgs)(DecoratedComponent));
    };
  };

  var connectedReduxRedirect = function connectedReduxRedirect(args) {
    var allArgs = _extends({}, connectedDefaults, args);
    var redirectPath = allArgs.redirectPath,
        authSelector = allArgs.authSelector,
        authenticatingSelector = allArgs.authenticatingSelector,
        allowRedirectBack = allArgs.allowRedirectBack,
        redirectAction = allArgs.redirectAction;


    var redirectPathSelector = void 0;
    if (typeof redirectPath === 'string') {
      redirectPathSelector = function redirectPathSelector() {
        return redirectPath;
      };
    } else if (typeof redirectPath === 'function') {
      redirectPathSelector = redirectPath;
    } else {
      (0, _invariant2.default)(false, 'redirectPath must be either a string or a function');
    }

    var createRedirect = function createRedirect(dispatch) {
      return {
        redirect: function redirect() {
          return dispatch(redirectAction(createRedirectLoc(allowRedirectBack).apply(undefined, arguments)));
        }
      };
    };

    return function (DecoratedComponent) {
      return (0, _reactRedux.connect)(function (state, ownProps) {
        return {
          redirectPath: redirectPathSelector(state, ownProps),
          authData: authSelector(state, ownProps),
          isAuthenticating: authenticatingSelector(state, ownProps)
        };
      }, createRedirect)((0, _authWrapper2.default)(allArgs)(DecoratedComponent));
    };
  };

  return {
    connectedRouterRedirect: connectedRouterRedirect,
    connectedReduxRedirect: connectedReduxRedirect
  };
};