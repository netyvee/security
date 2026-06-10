import { test, expect } from '@playwright/test';

test.describe('Security Funnel E2E', () => {
  test('completes full funnel flow and submits lead to CRM', async ({ page }) => {
    // Navigate to homepage
    await page.goto('https://security.vigilservices.co.uk');

    // Start the funnel
    await page.click('text=Start matching →');

    // Step 1: Premises type - select Commercial
    await expect(page.locator('text=What type of premises do you need to secure?')).toBeVisible();
    await page.click('text=Commercial');

    // Step 2: Service type - select Manned guarding
    await expect(page.locator('text=Which security service do you need?')).toBeVisible();
    await page.locator('button:has-text("Manned guarding")').first().click();

    // Step 3: Hours - select Day shift
    await expect(page.locator('text=When do you need cover?')).toBeVisible();
    await page.click('text=Day shift');

    // Step 4: Postcode - enter valid London postcode
    await expect(page.locator('text=What\'s the site postcode?')).toBeVisible();
    const postcodeInput = page.locator('input[placeholder*="e.g. E14"]');
    await postcodeInput.fill('IG1 4PU');
    await page.click('text=Check coverage →');

    // Wait for result screen
    await expect(page.locator('text=Perfect. Here\'s what happens next.')).toBeVisible({ timeout: 5000 });

    // Fill booking calendar - Step 1: Details
    await expect(page.locator('text=Book your free discovery call')).toBeVisible();

    // Fill contact details
    await page.locator('input').filter({ hasText: /full name/i }).or(page.locator('label:has-text("Full name") + input')).first().fill('Test Security Lead');
    await page.locator('input').filter({ hasText: /company/i }).or(page.locator('label:has-text("Company name") + input')).first().fill('Test Security Ltd');
    await page.locator('input[type="email"]').first().fill('gillmwangi@gmail.com');
    await page.locator('input[type="tel"]').first().fill('07700900000');

    // Continue to date selection
    await page.click('text=Continue to date selection →');

    // Step 2: Select first available date
    await expect(page.locator('text=Choose a date')).toBeVisible({ timeout: 3000 });
    await page.locator('.bg-\\[\\#0a1628\\]').first().click();

    // Step 3: Select first available time
    await expect(page.locator('text=Choose a time')).toBeVisible({ timeout: 3000 });
    await page.locator('.bg-\\[\\#0a1628\\]').first().click();

    // Step 4: Confirm booking
    await expect(page.locator('text=Confirm your booking')).toBeVisible({ timeout: 3000 });
    await page.click('text=Confirm discovery call →');

    // Wait for thank you screen
    await expect(page.locator('text=Discovery call confirmed')).toBeVisible({ timeout: 10000 });

    console.log('✅ Security funnel submitted successfully');
  });

  test('validates London postcode correctly', async ({ page }) => {
    await page.goto('https://security.vigilservices.co.uk');
    await page.click('text=Start matching →');
    await page.click('text=Commercial');
    await page.locator('button:has-text("Manned guarding")').first().click();
    await page.click('text=Day shift');

    // Test valid London postcode
    const postcodeInput = page.locator('input[placeholder*="e.g. E14"]');
    await postcodeInput.fill('E14 5AB');
    await page.click('text=Check coverage →');
    await expect(page.locator('text=Perfect. Here\'s what happens next.')).toBeVisible({ timeout: 5000 });
  });

  test('rejects non-London postcode', async ({ page }) => {
    await page.goto('https://security.vigilservices.co.uk');
    await page.click('text=Start matching →');
    await page.click('text=Commercial');
    await page.locator('button:has-text("Manned guarding")').first().click();
    await page.click('text=Day shift');

    // Test invalid postcode
    const postcodeInput = page.locator('input[placeholder*="e.g. E14"]');
    await postcodeInput.fill('M1 1AA'); // Manchester
    await page.click('text=Check coverage →');
    await expect(page.locator('text=We don\'t currently cover')).toBeVisible({ timeout: 5000 });
  });
});
