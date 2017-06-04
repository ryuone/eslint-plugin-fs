'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _duplicateConstAssign = require('./rules/duplicate-const-assign');

var _duplicateConstAssign2 = _interopRequireDefault(_duplicateConstAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const configs = {
  recommended: {
    rules: {
      'duplicate-const-assign': 2
    }
  }
};

const rules = {
  'duplicate-const-assign': _duplicateConstAssign2.default
};

exports.default = {
  rules,
  configs
};