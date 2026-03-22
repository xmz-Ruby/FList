import {App, Theme,} from "vuepress";
import { getDirname, path } from 'vuepress/utils'
import {createFileTreePages} from "./base/pages.js";
import {allAnalysis, AnalysisConfig} from "./base/AllAnalysis.js";
import {
    callExtendsBundlerOptions,
    callOnGenerated,
    callOnInitialized,
    callOnWatched,
    Closable
} from "./base/eventManager.js";
import {nprogressPlugin} from "@vuepress/plugin-nprogress";
import { loadAnalysisConfigFromDir } from "./config/loadAnalysisConfigFromDir.js";
export { fileUrlTreeAnalysis } from "./analysis/fileUrlTreeAnalysis/index.js";
export { githubReleasesFilesAnalysis } from "./analysis/githubReleasesFilesAnalysis/index.js";
export { githubReposAnalysis } from "./analysis/githubReposAnalysis/index.js";
export { giteeReleasesFilesAnalysis } from "./analysis/giteeReleasesFilesAnalysis/index.js";
export { giteeReposAnalysis } from "./analysis/giteeReposAnalysis/index.js";
export { huggingFaceDatasetsAnalysis } from "./analysis/huggingFaceDatasetsAnalysis/index.js";
export { default as cloudflarePagesDownProxy } from "./proxy/cloudflarePagesDownProxy/index.js";

const __dirname = getDirname(import.meta.url)

export function FileList(analysisConfig: AnalysisConfig[] = []):Theme{
    return ()=>{
        return {
            name:"FList",
            clientConfigFile: path.join(__dirname, "../client/index.ts"),
            plugins: [
                nprogressPlugin()
            ],
            onInitialized:async (app)=>{
                await callOnInitialized(app);
                const fileTree = await allAnalysis([
                    ...analysisConfig,
                    ...loadAnalysisConfigFromDir("mounts"),
                ]);
                const pageList = await Promise.all(createFileTreePages(app,fileTree));
                app.pages.push(...pageList);
            },
            onGenerated:async (app)=>{
                await callOnGenerated(app);
            },
            onWatched:async (app: App, watchers: Closable[], restart: () => Promise<void>)=>{
                await callOnWatched(app, watchers, restart);
            },
            extendsBundlerOptions: async (options,app)=>{
                await callExtendsBundlerOptions(options,app);
            }
        }
    }
}
