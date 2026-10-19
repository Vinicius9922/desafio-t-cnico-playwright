const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test.describe('Módulo de Login', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('Login valido', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('Login com usuário bloqueado', async () => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    await loginPage.assertErrorMessage('Epic sadface: Sorry, this user has been locked out.');
  });

  test("Login com usuário inválido", async () => {
    await loginPage.login('invalid_user', 'secret_sauce');  
    await loginPage.assertErrorMessage('Epic sadface: Username and password do not match any user in this service');
  });

  test("Login com campo de usuário vazio", async () => {
    await loginPage.login('', 'secret_sauce');
    await loginPage.assertErrorMessage('Epic sadface: Username is required');
  });
  

  });

