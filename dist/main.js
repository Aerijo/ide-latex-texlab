"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process = require("child_process");
const fs = require("fs");
const atom_languageclient_1 = require("atom-languageclient");
class LatexLanguageClient extends atom_languageclient_1.AutoLanguageClient {
    getGrammarScopes() {
        return ["text.tex.latex", "text.tex.biber", "text.tex.bibtex"];
    }
    getLanguageName() {
        return "LaTeX";
    }
    getServerName() {
        return "texlab-language-server";
    }
    startServerProcess() {
        const serverPath = atom.config.get("ide-latex-texlab.serverPath");
        if (!fs.existsSync(serverPath)) {
            console.error(`Could not find texlab server at ${serverPath}`);
        }
        const { ELECTRON_RUN_AS_NODE, ...env } = process.env;
        const spawned = child_process.spawn(serverPath, env);
        spawned.stdout.setEncoding("utf8");
        spawned.stderr.setEncoding("utf8");
        spawned.once("close", (code, signal) => {
            console.log(`texlab lang server closed with code ${code} and signal ${signal}`);
        });
        return spawned;
    }
}
module.exports = new LatexLanguageClient();
