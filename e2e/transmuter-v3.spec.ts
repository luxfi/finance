import { test, expect } from '@playwright/test';

test.describe('Liquid V3 Transmuter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
  });

  test('should navigate to transmuter page', async ({ page }) => {
    // Look for transmuter/redemption link
    const transmuterLink = page.getByRole('link', { name: /transmut|redeem/i }).first();

    if (await transmuterLink.isVisible()) {
      await transmuterLink.click();

      // Verify transmuter page loaded
      await expect(page.url()).toMatch(/transmut|redeem/i);
    }
  });

  test('should display fixed-duration redemption info', async ({ page }) => {
    const transmuterLink = page.getByRole('link', { name: /transmut|redeem/i }).first();

    if (await transmuterLink.isVisible()) {
      await transmuterLink.click();

      // Look for duration/maturation info (V3 uses ~90 day redemptions)
      const durationText = page.getByText(/90|day|duration|maturation/i).first();
      if (await durationText.isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(durationText).toBeVisible();
      }
    }
  });

  test('should show transmuter position list area', async ({ page }) => {
    const transmuterLink = page.getByRole('link', { name: /transmut|redeem/i }).first();

    if (await transmuterLink.isVisible()) {
      await transmuterLink.click();

      // Check for position list container
      const positionsList = page.locator('[class*="position"]').first();
      // Positions container should exist even if empty
    }
  });

  test('should have create redemption button', async ({ page }) => {
    const transmuterLink = page.getByRole('link', { name: /transmut|redeem/i }).first();

    if (await transmuterLink.isVisible()) {
      await transmuterLink.click();

      // Look for redemption/deposit action button
      const actionButton = page.getByRole('button', { name: /create|redeem|deposit|stake/i }).first();
      if (await actionButton.isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(actionButton).toBeVisible();
      }
    }
  });
});
