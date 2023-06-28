const puppeteer = require("puppeteer");
const download = require("image-downloader");

(async () => {
  const browser = await puppeteer.launch();
  console.log("Browser openned");
  const page = await browser.newPage();
  const url =
    "https://toigingiuvedep.vn/wp-content/uploads/2022/11/anh-meo-cute-trai-tim-ma-hong.jpg";
  await page.goto(url);
  console.log("Page loaded");

  const imgLinks = await page.evaluate(() => {
    let imgElements = document.querySelectorAll(
      ".gallery-item > .gallery-icon .landscape > a > img"
    );
    imgElements = [...imgElements];
    let imgLinks = imgElements.map((i) => i.getAttribute("src"));
    return imgLinks;
  });
  console.log(imgLinks);

  // Tải các ảnh này về thư mục hiện tại
  await Promise.all(
    imgLinks.map((imgUrl) =>
      download.image({
        url: imgUrl,
        dest: __dirname,
      })
    )
  );

  await browser.close();
})();
