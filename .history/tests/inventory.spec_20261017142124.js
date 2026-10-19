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
        await expect(inventoryPage.inventoryList).toBeVisible();
        await expect(inventoryPage.inventoryLabel.first()).not.toBeEmpty();
    });

    test('Adicionar produto ao carrinho', async () => {
        await inventoryPage.inventoryItemAddToCartButton.click();
        await expect(inventoryPage.cartButton).toHaveText('1');
    });

    test('Acessar carrinho de compras vazio', async () => {
        await inventoryPage.cart();
        await expect(inventoryPage.page).toHaveURL('https://www.saucedemo.com/cart.html');
        await expect(cartPage.cartItemList).toHaveCount(0);
    });

    test('Acessar carrinho de compras cheio', async () => {
        await inventoryPage.cart();
        await expect(inventoryPage.page).toHaveURL('https://www.saucedemo.com/cart.html');
        await expect(cartPage.cartItemList).not.toHaveCount(0);
    });

    test('Acessar detalhes do produto', async () => {
        await productDetailsPage.inventoryItem.first().click();
        await expect(productDetailsPage.page).toHaveURL(https://www.saucedemo.com/inventory-item.html?id=4  );
        await expect(productDetailsPage.productItem).toBeVisible();        
    });



});