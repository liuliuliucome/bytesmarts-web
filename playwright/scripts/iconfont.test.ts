import { test } from "@playwright/test";
import iconFontJson from "config/iconFont.json";
import { writeFileSync } from "fs";
import { workRootPath } from "config/path.config";
import { prePath } from "work/util/prePath";
import { join } from "path";
import { TestConfig } from "../config";
import { genIconFontType } from "work/scripts/genIconFont";

async function updateIconFontJsonFile(
  values: Omit<typeof iconFontJson, "root">,
) {
  const newJson = {
    ...iconFontJson,
    ...values,
  };

  const iconFontJsonPath = prePath(join(workRootPath, "config/iconFont.json"));
  writeFileSync(iconFontJsonPath, JSON.stringify(newJson));
  console.log("[scripts: iconfont new value successed]");
  // 调用 work:gen
  await genIconFontType();
}

test("[scripts: iconfont]", async ({ page }) => {
  if (!TestConfig.iconFont.passwrod || !TestConfig.iconFont.username) {
    console.log("> no account info");

    return;
  }

  await page.goto(TestConfig.iconFont.domain);

  await page.locator("[href='/login']").click();

  await page.locator("body[data-spm='login']").waitFor();

  await page.locator("input#userid").fill(TestConfig.iconFont.username);
  await page.locator("input#password").fill(TestConfig.iconFont.passwrod);
  await page.locator('button[type="submit"]').click();

  await page.locator('body[data-spm="home_index"]').waitFor();

  await page.goto(iconFontJson.root);

  // 展开 链接
  if (!(await page.locator(".bar-link.show").isVisible())) {
    await page.locator(".bar-link").click();
  }

  const updataSpan = page.locator('span[class="cover-btn"]').first();
  if (await updataSpan.isVisible()) {
    await updataSpan.click();
    await page.locator('[mx-click="click({index:0})"]').click();
    await page.waitForTimeout(2000);
  }

  // unicode
  await page.locator("li[mx-click=\"changeType('unicode')\"]").click();
  const unidoeValue = await page.locator("pre#J_cdn_type_unicode").innerText();
  // fontclass
  await page.locator("li[mx-click=\"changeType('fontclass')\"]").click();
  const fontclassValue = await page
    .locator("#J_cdn_type_fontclass")
    .innerText();
  // symbol
  await page.locator("li[mx-click=\"changeType('unicode')\"]").click();
  const symbolValue = await page.locator("#J_cdn_type_svgsymbol").innerText();

  updateIconFontJsonFile({
    unicode: unidoeValue,
    js: symbolValue,
    css: fontclassValue,
  });

  await page.waitForTimeout(4000);
});
