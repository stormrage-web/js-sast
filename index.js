import {runASTAnalysis, warnings} from "./workspaces/sast/index.js";
import {readFileSync} from "node:fs";
import core from '@actions/core';
import glob from '@actions/glob';

try {
    const patterns = ['**/**.js', '!**/node_modules/**'];
    const globber = await glob.create(patterns.join('\n'))
    for await (const file of globber.globGenerator()) {
        console.log(file);
        const {current_warnings, dependencies} = runASTAnalysis(
            readFileSync(file, "utf-8")
        );
        console.log(dependencies);
        console.dir(current_warnings, {depth: null});
    }
    // const readFile = util.promisify(fs.readFile)
    // const contents = await readFile(filePath, 'utf8')
    // core.info(`File contents:\n${contents}`)
    // core.setOutput('contents', contents)
} catch (error) {
    core.setFailed(error.message)
}

// try {
//     // `who-to-greet` input defined in action metadata file
//     const nameToGreet = core.getInput('who-to-greet');
//     console.log(`Hello ${nameToGreet}!`);
//     const time = (new Date()).toTimeString();
//     core.setOutput("time", time);
//     // Get the JSON webhook payload for the event that triggered the workflow
//     const payload = JSON.stringify(github.context.payload, undefined, 2)
//     console.log(`The event payload: ${payload}`);
// } catch (error) {
//     core.setFailed(error.message);
// }