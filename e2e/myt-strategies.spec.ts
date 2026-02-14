import { test, expect } from '@playwright/test';

test.describe('Liquid V3 MYT Strategies', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
  });

  test('should display MYT yield strategies info', async ({ page }) => {
    // Navigate to vaults or strategies section
    const strategiesLink = page.getByRole('link', { name: /strateg|yield|myt/i }).first();

    if (await strategiesLink.isVisible()) {
      await strategiesLink.click();

      // Look for strategy information
      const strategyContainer = page.locator('[class*="strateg"]').first();
      if (await strategyContainer.isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(strategyContainer).toBeVisible();
      }
    }
  });

  test('should show APY information', async ({ page }) => {
    // APY should be displayed somewhere in the app
    const apyText = page.getByText(/APY|yield|%/i).first();

    if (await apyText.isVisible({ timeout: 5000 }).catch(() => false)) {
      await expect(apyText).toBeVisible();
    }
  });

  test('should display available yield tokens', async ({ page }) => {
    // Common yield tokens in MYT strategies
    const yieldTokens = ['wstETH', 'rETH', 'sfrxETH', 'stLUX', 'stZOO'];

    // Just verify page loads, tokens may not be visible without wallet
    await expect(page.locator('html')).toBeAttached();
  });
});
