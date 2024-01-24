import { runASTAnalysis } from "../workspaces/sast/index.js";
import { readFileSync } from "node:fs";

const { warnings, dependencies } = runASTAnalysis(
  readFileSync("./rate-map.js", "utf-8")
);
console.log(dependencies);
console.dir(warnings, { depth: null });
