// Import Third-party Dependencies
import { getVariableDeclarationIdentifiers } from "../../../estree-ast-utils/src/index.js";

/**
 * @description Search for AssignmentExpression (Not to be confused with AssignmentPattern).
 *
 * @example
 * (foo = 5)
 */
function validateNode(node) {
  return [
    node.type === "AssignmentExpression"
  ];
}

function main(node, options) {
  const { analysis } = options;

  analysis.idtypes.assignExpr++;
  for (const { name } of getVariableDeclarationIdentifiers(node.left)) {
    analysis.identifiersName.push({ name, type: "assignExpr" });
  }
}

export default {
  name: "isAssignmentExpression",
  validateNode,
  main,
  breakOnMatch: false
};
