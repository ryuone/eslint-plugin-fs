// @flow
import type { RuleContext } from 'eslint';

type Variable = {
  count: number,
  variable: string,
};
type Value = boolean | number | string;
type ConstVariableListType = { [Value]: Variable };

const constVariableList: ConstVariableListType = {};

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------
export default {
  meta: {
    docs: {
      category: 'Variables',
      description: 'Disallow duplicate const assign.',
      recommended: false,
    },

    schema: [],
  },

  create(context: RuleContext) {
    const isLiteral = (node): boolean => {
      return node.init.type === 'Literal';
    };
    const isConst = (node): boolean => {
      return node.kind === 'const';
    };
    const verifyDuplicateConstAssign = (node: any) => {
      if (!isConst(node)) {
        return;
      }

      for (const declaration of node.declarations) {
        if (isLiteral(declaration)) {
          if (constVariableList[declaration.init.raw]) {
            constVariableList[declaration.init.raw].count++;
            context.report({
              node,
              message: '{{value}} is already assigned to another variable, in {{count}} times.',
              data: {
                value: declaration.init.raw,
                count: constVariableList[declaration.init.raw].count,
              },
            });
          } else {
            constVariableList[declaration.init.raw] = {
              count: 1,
              variable: declaration.id.name,
            };
          }
        }
      }
    };

    return {
      VariableDeclaration(node: any) {
        verifyDuplicateConstAssign(node);
      },
    };
  },
};
