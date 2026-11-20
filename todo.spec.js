const { test, expect } = require('@playwright/test');

// Тест 1: добавление задачи
test('kasutaja saab lisada ülesande', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/');

  const input = page.getByPlaceholder('What needs to be done?');
  await input.fill('Õpi UI testimist');
  await input.press('Enter');

  await expect(page.getByText('Õpi UI testimist')).toBeVisible();
});

// Тест 2: выполнение задачи
test('kasutaja saab märkida ülesande lõpetatuks', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/');

  const input = page.getByPlaceholder('What needs to be done?');
  await input.fill('Esimene test');
  await input.press('Enter');

  const task = page.getByRole('listitem').filter({
    hasText: 'Esimene test'
  });

  const checkbox = task.getByRole('checkbox');
  await checkbox.check();

  await expect(checkbox).toBeChecked();
});

// Тест 3: удаление задачи
test('kasutaja saab kustutada ülesande', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/');

  const input = page.getByPlaceholder('What needs to be done?');
  await input.fill('Kustutatav ülesanne');
  await input.press('Enter');

  const task = page.getByRole('listitem').filter({
    hasText: 'Kustutatav ülesanne'
  });

  await task.hover();
  await task.locator('button.destroy').click();

  await expect(
    page.getByText('Kustutatav ülesanne')
  ).toHaveCount(0);
});