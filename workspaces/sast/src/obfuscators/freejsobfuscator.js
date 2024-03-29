// Import Third-party Dependencies
import { Utils } from "../../../sec-literal/src/index.js";

export function verify(analysis, prefix) {
  const pValue = Object.keys(prefix).pop();
  const regexStr = `^${Utils.escapeRegExp(pValue)}[a-zA-Z]{1,2}[0-9]{0,2}$`;

  return analysis.identifiersName.every(({ name }) => new RegExp(regexStr).test(name));
}
