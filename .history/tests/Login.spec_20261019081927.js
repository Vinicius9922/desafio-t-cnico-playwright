const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test.describe('Módulo de Login', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('Deve realizar login com sucesso usando credenciais válidas', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('Deve exibir mensagem de erro para usuário bloqueado', async () => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    await loginPage.assertErrorMessage('Epic sadface: Sorry, this user has been locked out.');
  });

  test()
});