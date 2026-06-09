import { test, expect } from '@playwright/test';

test('OWA Test', async ({ browser }) => {
  test.setTimeout(60000);
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  const page = await context.newPage();
  
  // STEP 1: Combined navigation and credential inputs
  await test.step('1. Fill Login Credentials', async () => {
    await page.goto('https://10.10.48.17');
    await page.getByRole('textbox', { name: 'Domain\\user name:' }).click();
    await page.getByRole('textbox', { name: 'Domain\\user name:' }).fill('tx\\fox6');
    await page.getByRole('textbox', { name: 'Domain\\user name:' }).press('Tab');
    await page.locator('#password').fill('f');
    await page.locator('#password').press('Tab');
  });

  // STEP 2: Sign-in interaction
  await test.step('2. Handle Captcha & Sign In', async () => {
    await page.locator('#txtCaptcha').fill('aaaaa');
    await page.waitForTimeout(3000); 
    await page.getByRole('button', { name: 'sign in' }).click();
  });

  // STEP 3: Incident report validation
  await test.step('3. Report from His page', async () => {
    await page.getByTitle('Report Suspicious Logon').click();
    await page.locator('input[name="LogonDetGrid2$ctl00$ctl04$chk"]').check();
    await page.locator('#CommentTextBox').click();
    await page.locator('#CommentTextBox').fill('tttt');
    await page.getByText('Submit').click();
    await expect(page.locator('#ErrorDiv')).toContainText('Report Incident succeeded');
    await page.getByRole('button', { name: 'OK' }).click();
  });

  // STEP 4: Frame context setup and navigation (Moved inside a step block so it registers!)
  const mailFrame = page.frameLocator('iframe[name="mwngsubfr"]');
  await test.step('4. Open Mail Inbox Frame', async () => {
    await page.getByText('Go To Mail').click();
    await page.waitForTimeout(5000); 
    await page.locator('iframe[name="mwngsubfr"]').waitFor({ state: 'visible', timeout: 15000 });
  });

  // STEP 5: Verification of the email conversion flows
  await test.step('5. AV conversion & Sign Out', async () => {
    const targetEmail = mailFrame.locator('.lvHighlightSubjectClass').first();
    await page.waitForTimeout(5000); 
    await targetEmail.waitFor({ state: 'visible', timeout: 15000 });
    await targetEmail.scrollIntoViewIfNeeded();
    await page.waitForTimeout(5000); 
    await targetEmail.click();
    await page.waitForTimeout(3000); 

    await page.locator('iframe[name="mwngsubfr"]').contentFrame().getByRole('button', { name: 'More actions', exact: true }).click();
    await page.waitForTimeout(5000); 
    await page.locator('iframe[name="mwngsubfr"]').contentFrame().getByRole('button', { name: 'View' }).click();
    await page.waitForTimeout(5000); 
    await page.locator('iframe[name="mwngsubfr"]').contentFrame().getByRole('button', { name: 'close' }).click();
    await page.waitForTimeout(5000); 
    await page.locator('iframe[name="mwngsubfr"]').contentFrame().getByRole('button', { name: 'fox6 menu with submenu' }).click();
    await page.waitForTimeout(5000); 
    await page.locator('iframe[name="mwngsubfr"]').contentFrame().getByRole('menuitem', { name: 'Sign out' }).click();
  });
});