'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _lodash = require('lodash.isempty');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaults = {
  AuthenticatingComponent: function AuthenticatingComponent() {
    return null;
  }, // dont render anything while authenticating
  FailureComponent: undefined,
  wrapperDisplayName: 'AuthWrapper',
  predicate: function predicate(x) {
    return !(0, _lodash2.default)(x);
  },
  propMapper: function propMapper(_ref) {
    var props = _objectWithoutProperties(_ref, []);

    return _extends({}, props);
  } // eslint-disable-line no-unused-vars
};

exports.default = function (args) {
  var _defaults$args = _extends({}, defaults, args),
      AuthenticatingComponent = _defaults$args.AuthenticatingComponent,
      FailureComponent = _defaults$args.FailureComponent,
      wrapperDisplayName = _defaults$args.wrapperDisplayName,
      predicate = _defaults$args.predicate,
      propMapper = _defaults$args.propMapper;

  var isAuthorized = function isAuthorized(authData) {
    return predicate(authData);
  };

  // Wraps the component that needs the auth enforcement
  function wrapComponent(DecoratedComponent) {
    var _class, _temp;

    var displayName = DecoratedComponent.displayName || DecoratedComponent.name || 'Component';

    var UserAuthWrapper = (_temp = _class = function (_Component) {
      _inherits(UserAuthWrapper, _Component);

      function UserAuthWrapper() {
        _classCallCheck(this, UserAuthWrapper);

        return _possibleConstructorReturn(this, (UserAuthWrapper.__proto__ || Object.getPrototypeOf(UserAuthWrapper)).apply(this, arguments));
      }

      _createClass(UserAuthWrapper, [{
        key: 'render',
        value: function render() {
          // Allow everything but the replace aciton creator to be passed down
          // Includes route props from React-Router and authData
          var _props = this.props,
              authData = _props.authData,
              isAuthenticating = _props.isAuthenticating;

          if (isAuthorized(authData)) {
            return _react2.default.createElement(DecoratedComponent, propMapper(this.props));
          } else if (isAuthenticating) {
            return _react2.default.createElement(AuthenticatingComponent, propMapper(this.props));
          } else {
            return FailureComponent ? _react2.default.createElement(FailureComponent, propMapper(this.props)) : null;
          }
        }
      }]);

      return UserAuthWrapper;
    }(_react.Component), _class.displayName = wrapperDisplayName + '(' + displayName + ')', _class.propTypes = {
      authData: _propTypes2.default.any,
      isAuthenticating: _propTypes2.default.bool
    }, _class.defaultProps = {
      isAuthenticating: false
    }, _temp);


    return (0, _hoistNonReactStatics2.default)(UserAuthWrapper, DecoratedComponent);
  }

  return wrapComponent;
};