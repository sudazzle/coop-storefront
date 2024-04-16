import { test, expect,  } from '@playwright/test';

test('Test if page elements exists', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(20000);
  await expect(page.getByText('Extra, Sarpsborg')).toBeVisible();
  await expect(page.getByText('Min Side')).toBeVisible();
  await expect(page.getByText('Medlem')).toBeVisible();
  await expect(page.getByText('Coop Kjeder')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sorter etter Nærmeste' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sorter etter Fjerneste' })).toBeVisible();
});
