const {test, expect} = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { ProductDetailsPage } = require('../pages/ProductDetailsPage');

test.describe('Pagina do Carrinho de Compras', () => {
    let loginPage;
    let inventoryPage;
    let productDetailsPage;
    let cartPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        productDetailsPage = new ProductDetailsPage(page);
        cartPage = new CartPage(page);

        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.assertInventoryListVisible();
    });

    test('Acessar carrinho de compras cheio', async () => {        
        await inventoryPage.inventoryItemAddToCartButton.click();
        await inventoryPage.cart();
        await expect(inventoryPage.page).toHaveURL('https://www.saucedemo.com/cart.html');
        await expect(cartPage.cartItemList).not.toHaveCount(0);
    });

    test('Remover produto do carrinho', async () => {
        await inventoryPage.inventoryItemAddToCartButton.click();
        await inventoryPage.cart();       
        await cartPage.cartItemRemoveButton.click();
        await expect(cartPage.cartItemList).toHaveCount(0);
    });


});