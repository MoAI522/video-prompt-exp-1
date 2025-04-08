// @ts-check
const { test } = require("@playwright/test");

test("初夢チェッカーの挙動調査", async ({ page }) => {
  // ビューポートを設定
  await page.setViewportSize({ width: 500, height: 500 });

  // アプリケーションにアクセス
  await page.goto(
    "file:///Users/rentaro.kawata/video-prompt-exp-1/testapp1/index.html"
  );

  // 1つチェックのケース
  await page.locator("#fuji").click();
  await page.waitForTimeout(1000);

  await page.locator("#dream-button").click();
  await page.waitForTimeout(1000);

  // インターバル
  await page.waitForTimeout(2000);

  // チェックをリセット
  await page.locator("#fuji").click();
  await page.waitForTimeout(1000);

  // 「鷹」と「茄子」の組み合わせ
  await page.locator("#taka").click();
  await page.waitForTimeout(1000);

  await page.locator("#nasu").click();
  await page.waitForTimeout(1000);

  await page.locator("#dream-button").click();
  await page.waitForTimeout(1000);

  // インターバル
  await page.waitForTimeout(2000);

  // チェックをリセット
  await page.locator("#taka").click();
  await page.waitForTimeout(1000);

  await page.locator("#nasu").click();
  await page.waitForTimeout(1000);

  // 「富士山」と「茄子」の組み合わせ
  await page.locator("#fuji").click();
  await page.waitForTimeout(1000);

  await page.locator("#nasu").click();
  await page.waitForTimeout(1000);

  await page.locator("#dream-button").click();
  await page.waitForTimeout(1000);

  // インターバル
  await page.waitForTimeout(2000);

  // チェックをリセット
  await page.locator("#fuji").click();
  await page.waitForTimeout(1000);

  await page.locator("#nasu").click();
  await page.waitForTimeout(1000);

  // 3つチェック「富士山→鷹→茄子」の順
  await page.locator("#fuji").click();
  await page.waitForTimeout(1000);

  await page.locator("#taka").click();
  await page.waitForTimeout(1000);

  await page.locator("#nasu").click();
  await page.waitForTimeout(1000);

  await page.locator("#dream-button").click();
  await page.waitForTimeout(1000);

  // インターバル
  await page.waitForTimeout(2000);

  // チェックをすべてリセット
  await page.locator("#fuji").click();
  await page.waitForTimeout(1000);

  await page.locator("#taka").click();
  await page.waitForTimeout(1000);

  await page.locator("#nasu").click();
  await page.waitForTimeout(1000);

  // 3つチェック「茄子→鷹→富士山」の順
  await page.locator("#nasu").click();
  await page.waitForTimeout(1000);

  await page.locator("#taka").click();
  await page.waitForTimeout(1000);

  await page.locator("#fuji").click();
  await page.waitForTimeout(1000);

  await page.locator("#dream-button").click();
  await page.waitForTimeout(1000);

  // インターバル
  await page.waitForTimeout(2000);

  // 茄子のチェックを外す
  await page.locator("#nasu").click();
  await page.waitForTimeout(1000);

  await page.locator("#dream-button").click();
  await page.waitForTimeout(1000);
});
