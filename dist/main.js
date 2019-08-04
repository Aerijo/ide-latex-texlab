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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQStDO0FBQy9DLHlCQUF5QjtBQUV6Qiw2REFBOEU7QUFFOUUsTUFBTSxtQkFBb0IsU0FBUSx3Q0FBa0I7SUFDbEQsZ0JBQWdCO1FBQ2QsT0FBTyxDQUFDLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDakUsQ0FBQztJQUNELGVBQWU7UUFDYixPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBQ0QsYUFBYTtRQUNYLE9BQU8sd0JBQXdCLENBQUM7SUFDbEMsQ0FBQztJQUVELGtCQUFrQjtRQUNoQixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQzlCLE9BQU8sQ0FBQyxLQUFLLENBQUMsbUNBQW1DLFVBQVUsRUFBRSxDQUFDLENBQUM7U0FDaEU7UUFFRCxNQUFNLEVBQUMsb0JBQW9CLEVBQUUsR0FBRyxHQUFHLEVBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO1FBRW5ELE1BQU0sT0FBTyxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBMEIsQ0FBQztRQUU5RSxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuQyxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVuQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLHVDQUF1QyxJQUFJLGVBQWUsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUNsRixDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7Q0FDRjtBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxtQkFBbUIsRUFBRSxDQUFDIn0=