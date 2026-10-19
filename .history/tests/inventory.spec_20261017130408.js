const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');

test.describe('Pagina de Inventário', () => {
    let loginPage;
    let inventoryPage;

    beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');

        await inventoryPage.assertInventoryListVisible();
    });

    test ('Deve exibir a lista de produtos corretamente', async () => {
        await expect(inventoryPage.InventoryList).toBeVisible();
        await expect(inventoryPage.InventoryItem.first()).toBeVis(6);
    });






});