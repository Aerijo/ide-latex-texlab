import * as child_process from "child_process"

import { AutoLanguageClient, LanguageServerProcess } from "atom-languageclient"

class LatexLanguageClient extends AutoLanguageClient {
  getGrammarScopes () { return ["text.tex.latex", "text.tex.biber", "text.tex.bibtex"] }
  getLanguageName () { return "LaTeX" }
  getServerName () { return "latex-language-server" }

  startServerProcess (_projectPath: string) {
    console.log("starting texlab server...")

    const serverPath = atom.config.get("ide-latex.serverPath")
    const { ELECTRON_RUN_AS_NODE, ...env } = process.env

    const spawned = child_process.spawn("java", ["-jar", serverPath], env) as LanguageServerProcess

    spawned.stdout.setEncoding("utf8")
    spawned.stderr.setEncoding("utf8")

    console.log("spawned", spawned)

    spawned.once("close", (code, signal) => {
      console.log(`latex lang server closed with code ${code} and signal ${signal}`)
    })

    return spawned
  }
}

module.exports = new LatexLanguageClient()
