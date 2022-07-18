/*ここにMirrativ配信URLを貼り付ける*/
const haisinurl = ""

const puppeteer = require('puppeteer');

(async () => {
  console.log("New Browser")
  const browser = await puppeteer.launch()
  console.log("newpage")
  const page = await browser.newPage()
  console.log("Go To 配信ページ")
  await page.goto(haisinurl)
  await page.setViewport({ width: 1, height: 1 })
  while (true) {
    console.log("クッキー削除")
    const client = await page.target().createCDPSession()
    await client.send('Network.clearBrowserCookies')
    console.log("ページリロード")
    await page.reload();
  }
})()
