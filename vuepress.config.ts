import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { FileList } from './src/node/index.js'
import { githubReleasesFilesAnalysis } from "./src/node/analysis/githubReleasesFilesAnalysis/index.js";
import { cloudflarePagesDownProxy } from "./src/node/proxy/cloudflarePagesDownProxy/index.js";
import { fileUrlTreeAnalysis } from "./src/node/analysis/fileUrlTreeAnalysis/index.js";
import { huggingFaceDatasetsAnalysis } from "./src/node/analysis/huggingFaceDatasetsAnalysis/index.js";
import { vercelDownProxy } from './src/node/proxy/vercelDownProxy/index.js';
import { netlifyDownProxy } from './src/node/proxy/netlifyDownProxy/index.js';
import { giteeReleasesFilesAnalysis } from './src/node/analysis/giteeReleasesFilesAnalysis/index.js';
import { githubReposAnalysis } from './src/node/analysis/githubReposAnalysis/index.js';
import { giteeReposAnalysis } from './src/node/analysis/giteeReposAnalysis/index.js';


/**
 * 站点配置文件，没有注释的选项如果不知道有什么作用不建议修改，有注释的选项可以根据注释修改
 * */
export default defineUserConfig({
  bundler: viteBundler(),
  pagePatterns: [],
  lang: 'zh-CN',
  public: `./public`,
  // 网站标题，标题颜色可在 src/client/css/main.css 中修改
  title: 'FList',
  // 网站的简介，有助于搜索引擎收录
  description: 'FList - 将 GitHub Releases 以类似网盘的形式展示在网页上，方便用户下载开源软件。 支持视频、音频、图片、PDF 等文件的在线预览。',
  // 页面 <head> 标签内添加的额外标签。 不要修改/logo.png可以替换掉这个文件，删除logo.png会导致构建出错。
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
  // 页面预加载，所有其它页面所需的文件都会被预拉取。这对于小型站点来说是十分有帮助的，因为它会大大提升页面切换的速度。但是在你的网站有很多页面时不建议你这么做。
  // 简单来说就是，如果你的文件不多就可以打开这个选项，可以大大提高页面切换的速度，如果文件非常多就不建议打开。建议超过100个文件就不要打开这个选项。
  shouldPrefetch: true,
  // 主题配置 FileList 是 vuepress 的一个主题，文件展示的功能全部由这个主题提供。
  theme: FileList([
    // {
    //   // 挂载路径
    //   mountPath: "/KnapsackToGo4下载",
    //   // 文件解析器，这里使用githubReleasesFilesAnalysis,可以解析github的release文件
    //   analysis: githubReleasesFilesAnalysis({
    //     // 仓库所有者的用户名
    //     user: "jianjianai",
    //     // 仓库所有者的仓库名
    //     repository: "KnapsackToGo4"
    //   }),
    // },
    {
      mountPath: "/常用工具/解压缩/7-Zip",
      analysis: githubReleasesFilesAnalysis({ user: "ip7z", repository: "7zip" }),
      // 下载代理配置,支持多个平台，参考:https://jjaw.cn/2024/8/3/flist-config-porxy/
      // 这个是为了解决github的国内下载慢的问题，和跨域问题，建议配置，不然pdf，txt，md等文件因为跨域无法预览
      // 如果你使用的不是 cloudflare Pages 部署需要删掉这一行，因为如果不是cloudflare Pages部署，这个代理是无法正常工作的
      downProxy: cloudflarePagesDownProxy(),
    },
    {
      mountPath: "/常用工具/看看外面的世界[karing]🪜✈️",
      analysis: githubReleasesFilesAnalysis({ user: "KaringX", repository: "karing" }),
      // 下载代理配置,支持多个平台，参考:https://jjaw.cn/2024/8/3/flist-config-porxy/
      // 这个是为了解决github的国内下载慢的问题，和跨域问题，建议配置，不然pdf，txt，md等文件因为跨域无法预览
      // 如果你使用的不是 cloudflare Pages 部署需要删掉这一行，因为如果不是cloudflare Pages部署，这个代理是无法正常工作的
      downProxy: cloudflarePagesDownProxy(),
    },
    // {
    //   mountPath: "/",
    //   // 这里使用 fileUrlTreeAnalysis 文件放到对应的文件路径中
    //   analysis: fileUrlTreeAnalysis({
    //     "/test2/文件树-测试视频1.mp4": "https://github.com/jianjianai/FList/releases/download/root/test.video.2.1080p.webm",
    //     "/文件树测试/文件树-测试视频1.mp4": "https://github.com/jianjianai/FList/releases/download/root/test.video.2.1080p.webm",
    //     "/文件树-测试视频1.mp4": "https://github.com/jianjianai/FList/releases/download/root/test.video.2.1080p.webm"
    //   }),
    //   downProxy: cloudflarePagesDownProxy(),//如果文件树地址下载比较慢，也可以配置代理
    // },
    // {
    //   mountPath: "/",
    //   // 这里使用 fileUrlTreeAnalysis 文件放到对应的文件路径中
    //   analysis: fileUrlTreeAnalysis({
    //     "/金刚狼.mp4": "https://wtv.mangzhexuexi.com/uc/xr21bym9/3486456090/66f523ba4f76affabba540f3b110d2774b64f98b/66f523bad030729c01f147a7bda31b760d1f97f8?Expires=1733218908&OSSAccessKeyId=LTAI5tJJpWQEfrcKHnd1LqsZ&Signature=SboG4zvWTvE8loNPRKJKiFQottM=&x-oss-traffic-limit=503316480&response-content-disposition=attachment; filename=Deadpool.And.Wolverine.2024.1080p.REPACK.TELESYNC.x264.COLLECTiVE.mp4;filename*=utf-8''Deadpool.And.Wolverine.2024.1080p.REPACK.TELESYNC.x264.COLLECTiVE.mp4&callback-var=eyJ4OmF1IjoiLSIsIng6dWQiOiI0LTItMS0yLTEtTi0zLWZ0LTAtNC0wLU4iLCJ4OnNwIjoiMTAwIiwieDp0b2tlbiI6IjQtMWMxOWFiZWExZjQzYTljOTEyYjgxODVjMDA0ZWU1MjMtMi03LTE1MzYxMS0wNTJhOGFhMzFkNzY0MTFiOGE3N2JkMWVhMDRiNmVkMy0wLTAtMC0wLTJjZTRlMzQ5ZjU2ZjViZjYzM2I2ZDE1NmUxMTNiZWE3IiwieDp0dGwiOiIxMDgwMCJ9&callback=eyJjYWxsYmFja0JvZHlUeXBlIjoiYXBwbGljYXRpb24vanNvbiIsImNhbGxiYWNrU3RhZ2UiOiJiZWZvcmUtZXhlY3V0ZSIsImNhbGxiYWNrRmFpbHVyZUFjdGlvbiI6Imlnbm9yZSIsImNhbGxiYWNrVXJsIjoiaHR0cHM6Ly9hdXRoLWNkbi51Yy5jbi9vdXRlci9vc3MvY2hlY2twbGF5IiwiY2FsbGJhY2tCb2R5Ijoie1wiaG9zdFwiOiR7aHR0cEhlYWRlci5ob3N0fSxcInNpemVcIjoke3NpemV9LFwicmFuZ2VcIjoke2h0dHBIZWFkZXIucmFuZ2V9LFwicmVmZXJlclwiOiR7aHR0cEhlYWRlci5yZWZlcmVyfSxcImNvb2tpZVwiOiR7aHR0cEhlYWRlci5jb29raWV9LFwibWV0aG9kXCI6JHtodHRwSGVhZGVyLm1ldGhvZH0sXCJpcFwiOiR7Y2xpZW50SXB9LFwicG9ydFwiOiR7Y2xpZW50UG9ydH0sXCJvYmplY3RcIjoke29iamVjdH0sXCJzcFwiOiR7eDpzcH0sXCJ1ZFwiOiR7eDp1ZH0sXCJ0b2tlblwiOiR7eDp0b2tlbn0sXCJhdVwiOiR7eDphdX0sXCJ0dGxcIjoke3g6dHRsfSxcImR0X3NwXCI6JHt4OmR0X3NwfSxcImhzcFwiOiR7eDpoc3B9LFwiY2xpZW50X3Rva2VuXCI6JHtxdWVyeVN0cmluZy5jbGllbnRfdG9rZW59fSJ9&ud=4-2-1-2-1-N-3-ft-0-4-0-N"
    //   })
    // },
    // {
    //   mountPath: "/ProgrammingVTuberLogos",
    //   analysis: githubReposAnalysis({
    //     user: "Aikoyori",
    //     repository: "ProgrammingVTuberLogos",
    //   }),
    //   downProxy: cloudflarePagesDownProxy()
    // },
    {
      mountPath: "/",
      // 这里使用 fileUrlTreeAnalysis 文件放到对应的文件路径中
      analysis: fileUrlTreeAnalysis({
        "/tvbox/windows电脑版/TV-win-20241215130903.zip": "https://github.com/Greatwallcorner/TV-Multiplatform/releases/download/20241215130903/TV-win-20241215130903.zip",
        "/tvbox/iptv直播源/aptv-m3u.txt": "https://github.com/Kimentanm/aptv/raw/master/m3u/iptv.m3u",
        "/tvbox/iptv直播源/AI直播-m3u.txt": "https://raw.githubusercontent.com/PizazzGY/TV/refs/heads/master/output/user_result.m3u",
        "/cursor/reset-machineId.ps1": "https://raw.githubusercontent.com/yuaotian/go-cursor-help/refs/heads/master/scripts/run/cursor_win_id_modifier.ps1"
      }),
      downProxy: cloudflarePagesDownProxy(),//如果文件树地址下载比较慢，也可以配置代理
    },
    {
      mountPath: "/tvbox",
      // 这里使用 fileUrlTreeAnalysis 文件放到对应的文件路径中
      analysis: fileUrlTreeAnalysis({
        "/iptv直播源/ITV.txt": "https://r2.mangzhexuexi.com/tvbox/ITV.txt",
        "/windows电脑版/vlc-3.0.21-win32.exe": "https://get.videolan.org/vlc/3.0.21/win32/vlc-3.0.21-win32.exe",
        "/windows电脑版/vlc-3.0.21-win64.exe": "https://get.videolan.org/vlc/3.0.21/win64/vlc-3.0.21-win64.exe",
        "/windows电脑版/电视台在线播放.md": "https://r2.mangzhexuexi.com/tvbox/tv.md",
        "/windows电脑版/使用说明.md": "https://r2.mangzhexuexi.com/tvbox/win.md",
        "/OK影视-电视版-2.8.0.apk": "http://cr2.mangzhexuexi.com/tvbox/OK%E5%BD%B1%E8%A7%86-%E7%94%B5%E8%A7%86%E7%89%88-2.8.0.apk",
        "/OK影视-手机版-2.8.0.apk": "http://cr2.mangzhexuexi.com/tvbox/OK%E5%BD%B1%E8%A7%86-%E6%89%8B%E6%9C%BA%E7%89%88-2.8.0.apk",
        "/电视直播-油桃TV-20250306.apk": "http://cr2.mangzhexuexi.com/tvbox/%E6%B2%B9%E6%A1%83TV-20250306.apk",
        "/电视直播-WebViewTV_1.10.7.apk": "http://cr2.mangzhexuexi.com/tvbox/WebViewTV_1.10.7.apk"
      }),
    },
    // ... 可以配置多个挂载路径和仓库，以此类推
  ])
})
