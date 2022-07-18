/*Mirrativの配信URLをここに(Browserから撮ってきた方)
ここに行ってこのコード全て貼り付けてcheck連打してください
https://app.checklyhq.com/checks/new/browser?framework=puppeteer
*/
const haisinurl = ""

const puppeteer = require('puppeteer');

(async () => {
  console.log("New Browser")
  const browser = await puppeteer.launch()
  console.log("newpage")
  const page = await browser.newPage()
  console.log("Go To 配信ページ")
  await page.goto(haisinurl)
  await page.setViewport({ width: 1280, height: 900 })
  while (true) {
    console.log("クッキー削除")
    const client = await page.target().createCDPSession()
    await client.send('Network.clearBrowserCookies')
    console.log("ページリロード")
    await page.reload();
  }
})()