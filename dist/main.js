"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const child_process = require("child_process");
const atom_languageclient_1 = require("atom-languageclient");
class LatexLanguageClient extends atom_languageclient_1.AutoLanguageClient {
    getGrammarScopes() { return ["text.tex.latex", "text.tex.biber", "text.tex.bibtex"]; }
    getLanguageName() { return "LaTeX"; }
    getServerName() { return "latex-language-server"; }
    startServerProcess(_projectPath) {
        console.log("starting texlab server...");
        const serverPath = atom.config.get("ide-latex.serverPath");
        const _a = process.env, { ELECTRON_RUN_AS_NODE } = _a, env = tslib_1.__rest(_a, ["ELECTRON_RUN_AS_NODE"]);
        const spawned = child_process.spawn("java", ["-jar", serverPath], env);
        spawned.stdout.setEncoding("utf8");
        spawned.stderr.setEncoding("utf8");
        console.log("spawned", spawned);
        spawned.once("close", (code, signal) => {
            console.log(`latex lang server closed with code ${code} and signal ${signal}`);
        });
        return spawned;
    }
}
module.exports = new LatexLanguageClient();
//# sourceMappingURL=main.js.map