// Require Third-party Dependencies
import { isLiteralRegex } from "../../../estree-ast-utils/src/index.js";
import safeRegex from "safe-regex";

/**
 * @description Search for RegExpLiteral AST Node
 * @example
 * /hello/
 */
function validateNode(node) {
  return [
    isLiteralRegex(node)
  ];
}

function main(node, options) {
  const { analysis } = options;

  // We use the safe-regex package to detect whether or not regex is safe!
  if (!safeRegex(node.regex.pattern)) {
    analysis.addWarning("unsafe-regex", node.regex.pattern, node.loc);
  }
}

export default {
  name: "isLiteralRegex",
  validateNode,
  main,
  breakOnMatch: false
};
