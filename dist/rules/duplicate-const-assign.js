'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const constVariableList = {};

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------
exports.default = {
  meta: {
    docs: {
      category: 'Variables',
      description: 'Disallow duplicate const assign.',
      recommended: false
    },

    schema: []
  },

  create(context) {
    const isLiteral = node => {
      return node.init.type === 'Literal';
    };
    const isConst = node => {
      return node.kind === 'const';
    };
    const verifyDuplicateConstAssign = node => {
      if (!isConst(node)) {
        return;
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = node.declarations[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          const declaration = _step.value;

          if (isLiteral(declaration)) {
            if (constVariableList[declaration.init.raw]) {
              constVariableList[declaration.init.raw].count++;
              context.report({
                node,
                message: '{{value}} is already assigned to another variable, in {{count}} times.',
                data: {
                  value: declaration.init.raw,
                  count: constVariableList[declaration.init.raw].count
                }
              });
            } else {
              constVariableList[declaration.init.raw] = {
                count: 1,
                variable: declaration.id.name
              };
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    };

    return {
      VariableDeclaration(node) {
        verifyDuplicateConstAssign(node);
      }
    };
  }
};