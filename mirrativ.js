/*
ここに行ってこのコード全て貼り付けてcheck連打してください
https://app.checklyhq.com/checks/new/browser?framework=puppeteer
*/

const haisinurl = "" // mirrativ配信url ここにアクセスしに行きます
const cooldown = 15000 // クールダウンが終わるまでの秒数
const kaisu = 25 // 1回のクールダウンまでに動く回数


var timer = 0;
const puppeteer = require('puppeteer');

(async () => {
    await Promise.all([
        miru1(),
        miru1(),
    ]).catch(error => logerror(error));
})()

async function miru1() {
    await loglog("New Browser");
    const browser = await puppeteer.launch();
    await loglog("newpage");
    const page = await browser.newPage();
    await loglog("Go To 配信ページ");
    await page.goto(haisinurl);
    await page.setViewport({ width: 1280, height: 720 });
    await Promise.all([
        miru2(page),
        miru2(page),
        miru2(page),
        miru2(page),
        aInterval(),
    ])
}

async function miru2(page) {
    const client = await page.target().createCDPSession();
    while (timer < kaisu) {
        timer += 1
        await client.send('Network.clearBrowserCookies');
        await loglog("クッキー削除");
        await page.reload();
        await loglog("ページリロード")
    };
 };

async function aInterval() {
    setInterval(function() {
        let kaisuu = kaisu + 1
        timer-=kaisuu;
    }, cooldown);
};

async function loglog(message) {
    console.log(`[${new Date().toLocaleString()}] [LOG]\t${message}\n`);
}

async function logerror(message) {
     console.error(`\x1b[31m[${new Date().toLocaleString()}] [ERROR]\t${message instanceof Error ? `${message.name}\n\t${message.message}\n\t${message.stack}` : message}\x1b[0m\n`);
}
