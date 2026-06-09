import { test, expect } from '@playwright/test';

test('OWA Test', async ({ browser }) => {
  test.setTimeout(60000);
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  const page = await context.newPage();
  
  await page.goto('https://10.10.48.17');
await test.step('1. Fill Login Credentials', async () => {
  await page.getByRole('textbox', { name: 'Domain\\user name:' }).click();
  await page.getByRole('textbox', { name: 'Domain\\user name:' }).fill('tx\\fox6');
  await page.getByRole('textbox', { name: 'Domain\\user name:' }).press('Tab');
  await page.locator('#password').fill('f');
  await page.locator('#password').press('Tab');
});
await test.step('2. Handle Captcha & Sign In', async () => {
  await page.locator('#txtCaptcha').fill('aaaaa');
  await page.waitForTimeout(3000); 
  await page.getByRole('button', { name: 'sign in' }).click();
});
 await test.step('3. Report from His page', async () => {
  await page.getByTitle('Report Suspicious Logon').click();


  await page.locator('input[name="LogonDetGrid2$ctl00$ctl04$chk"]').check();
  await page.locator('#CommentTextBox').click();
  await page.locator('#CommentTextBox').fill('tttt');
  await page.getByText('Submit').click();
  await expect(page.locator('#ErrorDiv')).toContainText('Report Incident succeeded');
  await page.getByRole('button', { name: 'OK' }).click();
});
  await page.getByText('Go To Mail').click();
  await page.waitForTimeout(5000); 
  const mailFrame = page.frameLocator('iframe[name="mwngsubfr"]');

   // 3. Wait for the iframe to be fully visible and rendered on screen
  await page.locator('iframe[name="mwngsubfr"]').waitFor({ state: 'visible', timeout: 15000 });


  await test.step('4. AV conversion', async () => {
  // Select the first email subject element in the list
  const targetEmail = mailFrame.locator('.lvHighlightSubjectClass').first();
  await page.waitForTimeout(5000); 
  // 4a. Wait for that top email item to appear on screen
  await targetEmail.waitFor({ state: 'visible', timeout: 15000 });

  // 4b. Ensure the row is completely scrolled into visual range before clicking it
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


