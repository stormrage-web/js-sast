import {runASTAnalysis} from "./workspaces/sast/index.js";
import {readFileSync} from "node:fs";
import core from '@actions/core';
import glob from '@actions/glob';
import * as i18n from "@nodesecure/i18n";
import chalk from "chalk";

await i18n.setLocalLang("english");
await i18n.getLocalLang();

try {
    const patterns = ['**/**.js', '!**/node_modules/**'];
    const globber = await glob.create(patterns.join('\n'))
    for await (const file of globber.globGenerator()) {
        const {warnings} = runASTAnalysis(
            readFileSync(file, "utf-8")
        );
        // console.log(warnings);
        if (warnings.length) console.log(chalk.bold(file));
        warnings.map((warning) => {
            switch (warning.severity) {
                case 'Information':
                    console.log(chalk.cyan(`${warning.location[0][0] + 1}:${warning.location[0][1] + 1}:Info`, i18n.getTokenSync(warning.i18n)));
                    break;
                case 'Warning':
                    console.log(chalk.yellow(`${warning.location[0][0] + 1}:${warning.location[0][1] + 1}:Warning`, i18n.getTokenSync(warning.i18n)));
                    break;
                case 'Critical':
                    console.log(chalk.red(`${warning.location[0][0] + 1}:${warning.location[0][1] + 1}:Critical`, i18n.getTokenSync(warning.i18n)));
                    break;
            }
        })
    }
} catch (error) {
    core.setFailed(error.message)
}