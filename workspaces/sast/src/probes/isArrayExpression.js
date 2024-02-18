// Import Internal Dependencies
import { extractNode } from "../utils.js";

// CONSTANTS
const kLiteralExtractor = extractNode("Literal");

/**
 * @description Search for ArrayExpression AST Node (Commonly known as JS Arrays)
 *
 * @example
 * ["foo", "bar", 1]
 */
function validateNode(node) {
  return [
    node.type === "ArrayExpression"
  ];
}

function main(node, { analysis }) {
  kLiteralExtractor(
    (literalNode) => analysis.analyzeLiteral(literalNode, true),
    node.elements
  );
}

export default {
  name: "isArrayExpression",
  validateNode,
  main,
  breakOnMatch: false
};
