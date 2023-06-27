const puppeteer = require("puppeteer");

(async () => {
  // Mở trình duyệt mới và tới trang của kenh14
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    "https://toidicodedao.com/2017/12/19/puppeteer-headless-chrome-api-phan-2-cao-du-lieu-kenh14/"
  );

  // Chạy đoạn JavaScript trong hàm này, đưa kết quả vào biến article
  const articles = await page.evaluate(() => {
    let titleLinks = document.querySelectorAll(
      "div.widgets-list-layout-links > a"
    );
    titleLinks = [...titleLinks];
    let articles = titleLinks.map((link) => ({
      title: link.getAttribute("title"),
      url: link.getAttribute("href"),
    }));
    return articles;
  });

  // In ra kết quả và đóng trình duyệt
  console.log(articles);
  await browser.close();
})();
