// spec: tests/login-saucelabs-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Login Tests', () => {
  test('Happy Path — Valid Login (standard_user)', async ({ page }) => {
    // 1. Enter username `standard_user` into the username field.
    await page.goto('https://www.saucedemo.com/');
    const username = page.locator('[data-test="username"]');
    await expect(username).toBeVisible();
    await username.fill('standard_user');

    // 2. Enter password `secret_sauce` into the password field.
    const password = page.locator('[data-test="password"]');
    await expect(password).toBeVisible();
    await password.fill('secret_sauce');

    // 3. Click the `Login` button or press Enter.
    const loginButton = page.locator('[data-test="login-button"]');
    await expect(loginButton).toBeVisible();
    await loginButton.click();

    // Verify navigation to `/inventory.html` and product list visible.
    await expect(page).toHaveURL(/.*\/inventory\.html$/);
    await expect(page.getByText('Products')).toBeVisible();
    const productList = page.locator('.inventory_list');
    await expect(productList).toBeVisible();
  });
});
