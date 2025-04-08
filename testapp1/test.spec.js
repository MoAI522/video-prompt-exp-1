// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("初夢チェッカーのテスト", () => {
  // 各テスト前の共通セットアップ
  test.beforeEach(async ({ page }) => {
    // ビューポートを500x500に設定
    await page.setViewportSize({ width: 500, height: 500 });
    // アプリケーションにアクセス
    await page.goto(
      "file:///Users/rentaro.kawata/video-prompt-exp-1/testapp1/index.html"
    );
  });

  // チェックボックスの取得とクリック用のヘルパー関数
  async function clickCheckbox(page, id) {
    const checkbox = page.locator(`#${id}`);
    await checkbox.click();
    await page.waitForTimeout(1000); // 1秒待機
  }

  // ボタンクリック用のヘルパー関数
  async function clickDreamButton(page) {
    const button = page.locator("#dream-button");
    await button.click();
    await page.waitForTimeout(1000); // 1秒待機
  }

  // テスト1: チェックなしの場合は「ふつう」と表示される
  test("チェックなしの場合、「ふつう」と表示される", async ({ page }) => {
    await clickDreamButton(page);
    const result = page.locator("#result");
    await expect(result).toHaveText("ふつう");
  });

  // テスト2: 1つチェックの場合は「ちょっとめでたい」と表示される
  test("1つチェックの場合、「ちょっとめでたい」と表示される", async ({
    page,
  }) => {
    await clickCheckbox(page, "fuji");
    await clickDreamButton(page);
    const result = page.locator("#result");
    await expect(result).toHaveText("ちょっとめでたい");
  });

  // テスト3: 「鷹」と「茄子」の組み合わせで「むしろおしい」と表示される
  test("「鷹」と「茄子」の組み合わせで「むしろおしい」と表示される", async ({
    page,
  }) => {
    await clickCheckbox(page, "taka");
    await clickCheckbox(page, "nasu");
    await clickDreamButton(page);
    const result = page.locator("#result");
    await expect(result).toHaveText("むしろおしい");
  });

  // テスト4: 2つチェック（鷹と茄子以外）で「ばりめでたい」と表示される
  test("「富士山」と「茄子」の組み合わせで「ばりめでたい」と表示される", async ({
    page,
  }) => {
    await clickCheckbox(page, "fuji");
    await clickCheckbox(page, "nasu");
    await clickDreamButton(page);
    const result = page.locator("#result");
    await expect(result).toHaveText("ばりめでたい");
  });

  // テスト5: 3つチェック（富士山→鷹→茄子の順）で「来年が怖いくらい」と表示される
  test("3つチェック「富士山→鷹→茄子」の順で「来年が怖いくらい」と表示される", async ({
    page,
  }) => {
    await clickCheckbox(page, "fuji");
    await clickCheckbox(page, "taka");
    await clickCheckbox(page, "nasu");
    await clickDreamButton(page);
    const result = page.locator("#result");
    await expect(result).toHaveText("来年が怖いくらい");
  });

  // テスト6: 3つチェック（別の順序）で「超Happy New Year」と表示される
  test("3つチェック「茄子→鷹→富士山」の順で「超Happy New Year」と表示される", async ({
    page,
  }) => {
    await clickCheckbox(page, "nasu");
    await clickCheckbox(page, "taka");
    await clickCheckbox(page, "fuji");
    await clickDreamButton(page);
    const result = page.locator("#result");
    await expect(result).toHaveText("超Happy New Year");
  });

  // テスト7: チェック解除のテスト
  test("チェックを解除すると状態が正しく更新される", async ({ page }) => {
    // まず3つすべてをチェック
    await clickCheckbox(page, "fuji");
    await clickCheckbox(page, "taka");
    await clickCheckbox(page, "nasu");

    // 茄子のチェックを外す
    await clickCheckbox(page, "nasu");
    await clickDreamButton(page);

    // 2つチェック（富士山と鷹）なので「ばりめでたい」
    const result = page.locator("#result");
    await expect(result).toHaveText("ばりめでたい");
  });
});
