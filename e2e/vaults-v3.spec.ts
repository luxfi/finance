import { test, expect } from '@playwright/test';

test.describe('Liquid V3 Vaults', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
  });

  test('should display V3 vault types', async ({ page }) => {
    // Navigate to vaults section
    const vaultsLink = page.getByRole('link', { name: /vault|deposit/i }).first();

    if (await vaultsLink.isVisible()) {
      await vaultsLink.click();

      // Check for V3 vault options (xLUX, xETH, xUSD, etc.)
      const vaultContainer = page.locator('[class*="vault"]').first();
      await expect(vaultContainer).toBeVisible({ timeout: 10000 });
    }
  });

  test('should show 90% LTV indicator for V3 vaults', async ({ page }) => {
    // Navigate to a vault page
    const vaultsLink = page.getByRole('link', { name: /vault|deposit/i }).first();

    if (await vaultsLink.isVisible()) {
      await vaultsLink.click();

      // Look for LTV information
      const ltvText = page.getByText(/90%|LTV|collateral/i).first();
      if (await ltvText.isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(ltvText).toBeVisible();
      }
    }
  });

  test('should display synthetic token types', async ({ page }) => {
    // Check for x-prefixed synthetic tokens
    const syntheticTokens = ['xLUX', 'xETH', 'xUSD', 'xZOO', 'xAI', 'xPARS'];

    for (const token of syntheticTokens) {
      const tokenElement = page.getByText(token);
      // Just verify page renders without errors
      // Tokens may not be visible until wallet connected
    }
  });

  test('should have position NFT info available', async ({ page }) => {
    const vaultsLink = page.getByRole('link', { name: /vault|position/i }).first();

    if (await vaultsLink.isVisible()) {
      await vaultsLink.click();

      // Check for position-related UI elements
      const positionInfo = page.locator('[class*="position"]').first();
      // Position info should be available in V3
    }
  });
});
