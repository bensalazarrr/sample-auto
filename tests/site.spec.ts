import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const routes = ["/", "/services", "/parts", "/about", "/contact"];
for (const route of routes) {
  test(`${route} renders accessibly without overflow`, async ({
    page,
  }, testInfo) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.getByText("Built by NinjaTech Guys")).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    expect(errors).toEqual([]);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
    for (const img of await page.locator(".photo img").all()) {
      await img.scrollIntoViewIfNeeded();
      await expect(img).toHaveJSProperty("complete", true);
      expect(
        await img.evaluate((el: HTMLImageElement) => el.naturalWidth),
      ).toBeGreaterThan(0);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: `test-results/${testInfo.project.name}-${route === "/" ? "home" : route.slice(1)}.png`,
      fullPage: true,
    });
    await page.getByRole("button", { name: "Switch to light theme" }).click();
    const lightResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(lightResults.violations).toEqual([]);
  });
}
test("theme persists through reload and pages", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.goto("/parts");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();
  expect(results.violations).toEqual([]);
  await page.screenshot({
    path: "test-results/light-parts.png",
    fullPage: true,
  });
});
test("catalog search, category, sorting, empty state, and dialog inquiry", async ({
  page,
}) => {
  await page.goto("/parts");
  await expect(page.locator(".product-card")).toHaveCount(20);
  await page.getByRole("button", { name: "Batteries", exact: true }).click();
  await expect(page.locator(".product-card")).toHaveCount(2);
  await page.getByLabel("Sort parts").selectOption("price-desc");
  await expect(page.locator(".product-card").first()).toContainText(
    "AGM Battery",
  );
  await page.getByRole("button", { name: "Clear filters" }).click();
  await page.getByLabel("Search parts").fill("spark");
  await expect(page.locator(".product-card")).toHaveCount(1);
  await page.getByLabel("Search parts").fill("does-not-exist");
  await expect(
    page.getByRole("heading", { name: "No parts found." }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Clear filters", exact: true })
    .last()
    .click();
  await page.getByLabel("Sort parts").selectOption("name");
  await expect(page.locator(".product-card").first()).toContainText(
    "AGM Battery",
  );
  await page
    .getByRole("button", { name: "View details for Ceramic Brake Pads" })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "View details for Ceramic Brake Pads" }),
  ).toBeFocused();
  await page
    .getByRole("button", { name: "View details for Ceramic Brake Pads" })
    .click();
  await page.getByRole("link", { name: "Inquire About This Part" }).click();
  await expect(page.getByLabel("Selected product")).toHaveValue("SA-004");
});
test("service booking validates, simulates, and resets without transmitting", async ({
  page,
}) => {
  await page.goto("/services");
  await page.getByRole("link", { name: "Book This Service" }).first().click();
  await expect(page.getByLabel("Service requested")).toHaveValue("oil-change");
  await page
    .getByRole("button", { name: "Preview Appointment Request" })
    .click();
  await expect(page.getByText("Please enter your full name.")).toBeVisible();
  await expect(page.getByLabel("Full name")).toBeFocused();
  await page.getByLabel("Full name").fill("Demo Driver");
  await page.getByLabel("Email address").fill("driver@example.com");
  await page.getByLabel("Phone number").fill("09171234567");
  await page.getByLabel("Vehicle make").fill("Toyota");
  await page.getByLabel("Vehicle model").fill("Vios");
  await page.getByLabel("Vehicle year").fill("2022");
  const date = new Date();
  date.setDate(date.getDate() + 1);
  while (date.getDay() === 0) date.setDate(date.getDate() + 1);
  const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  await page.getByLabel("Preferred date").fill(value);
  await page.getByLabel("Preferred time").selectOption("09:00");
  const sent: string[] = [];
  page.on("request", (r) => {
    if (r.method() === "POST") sent.push(r.url());
  });
  await page
    .getByRole("button", { name: "Preview Appointment Request" })
    .click();
  await expect(
    page.getByRole("button", { name: "Simulating request…" }),
  ).toBeDisabled();
  await expect(
    page.getByRole("heading", { name: "Appointment demo complete." }),
  ).toBeVisible();
  await expect(
    page.getByText("Nothing was sent, saved, booked, or reserved.", {
      exact: false,
    }),
  ).toBeVisible();
  expect(sent).toEqual([]);
  await page.getByRole("button", { name: "Try another demonstration" }).click();
  await expect(page.getByLabel("Full name")).toHaveValue("");
});
test("parts inquiry handles preselection and validation", async ({ page }) => {
  await page.goto("/contact?product=SA-011");
  await expect(page.getByLabel("Selected product")).toHaveValue("SA-011");
  await page.getByRole("button", { name: "Preview Parts Inquiry" }).click();
  await expect(
    page.getByText("Enter a valid email or Philippine mobile number."),
  ).toBeVisible();
  await page.getByLabel("Full name").fill("Demo Driver");
  await page.getByLabel("Email or phone").fill("demo@example.com");
  await page.getByLabel("Quantity").fill("0");
  await page
    .getByLabel("Inquiry message")
    .fill("Does this fit a 2022 Toyota Vios?");
  await page.getByRole("button", { name: "Preview Parts Inquiry" }).click();
  await expect(page.getByText("Choose a quantity from 1 to 99.")).toBeVisible();
  await page.getByLabel("Quantity").fill("2");
  await page.getByRole("button", { name: "Preview Parts Inquiry" }).click();
  await expect(
    page.getByRole("button", { name: "Simulating inquiry…" }),
  ).toBeDisabled();
  await expect(
    page.getByRole("heading", { name: "Parts inquiry demo complete." }),
  ).toBeVisible();
  await page.goto("/contact?product=unknown");
  await expect(
    page.getByText("That service or product wasn’t recognized.", {
      exact: false,
    }),
  ).toBeVisible();
  await expect(page.getByLabel("Selected product")).toHaveValue("");
});
test("keyboard and responsive navigation", async ({ page }, testInfo) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Open navigation" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "About Us" })
      .click();
    await expect(page).toHaveURL("/about");
    await expect(page.getByRole("dialog")).not.toBeVisible();
  } else {
    await expect(
      page
        .getByRole("navigation", { name: "Main navigation" })
        .getByRole("link", { name: "Home", exact: true }),
    ).toHaveAttribute("aria-current", "page");
  }
});
test("tablet and small mobile layouts and reduced motion", async ({ page }) => {
  for (const width of [320, 768, 1024, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/contact");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
