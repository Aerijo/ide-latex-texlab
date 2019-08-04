import * as child_process from "child_process";
import * as fs from "fs";

import {AutoLanguageClient, LanguageServerProcess} from "atom-languageclient";

class LatexLanguageClient extends AutoLanguageClient {
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

    const {ELECTRON_RUN_AS_NODE, ...env} = process.env;

    const spawned = child_process.spawn(serverPath, env) as LanguageServerProcess;

    spawned.stdout.setEncoding("utf8");
    spawned.stderr.setEncoding("utf8");

    spawned.once("close", (code, signal) => {
      console.log(`texlab lang server closed with code ${code} and signal ${signal}`);
    });

    return spawned;
  }
}

module.exports = new LatexLanguageClient();
