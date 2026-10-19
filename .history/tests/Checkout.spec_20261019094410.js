const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { ProductDetailsPage } = require('../pages/ProductDetailsPage');

test.describe('Fluxo de Checkout', () => {
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

    test('Realizar checkout com sucesso', async () => {
        await inventoryPage.inventoryItemAddToCartButton.click();
        await inventoryPage.cart();
        await cartPage.checkout('Vinicius', 'Silveira', '18200-000');

        await expect(cartPage.page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
        await expect(cartPage.checkoutOverviewItemList).toHaveCount(1);
        await expect(cartPage.cartItemName).toHaveText('Sauce Labs Backpack');
        await expect(cartPage.cartItemPrice).toHaveText('$29.99');
        await expect(cartPage.subtotalLabel).toHaveText('Item total: $29.99');
        await expect (cartPage.totalLabel).toContainText('Total: $');

        await cartPage.finishButton.click();
        await expect(cartPage.page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
        await expect(cartPage.completeHeader).toHaveText('Thank you for your order!');
        await expect(inventoryPage.cartBadge).toBeHidden();
    });

    test('Cancelar checkout', async () => {
        await inventoryPage.inventoryItemAddToCartButton.click();
        await inventoryPage.cart();
        await cartPage.checkout('Vinicius', 'Silveira', '18200-000');
        await expect(cartPage.page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
        await cartPage.cancelButton.click();
        await expect(cartPage.page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('Voltar a listagem do carrinho', async () => {
        await inventoryPage.inventoryItemAddToCartButton.click();
        await inventoryPage.cart();
        await cartPage.cartShoppingButton.click();
        await expect(cartPage.page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('Preencher checkout com campos vazios', async () => {
        await inventoryPage.inventoryItemAddToCartButton.click();
        await inventoryPage.cart();
        await cartPage.checkout('', '', '');
        
        await expect(cartPage.page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
        await expect(cartPage.erroMessage).toHaveText('Error: First Name is required');       
    });

    test('Checkoout sem preencher o campo nome', async () => {
        await inventoryPage.inventoryItemAddToCartButton.click();
        await inventoryPage.cart();
        await cartPage.checkout('', 'Silveira', '18200-000');
        
        await expect(cartPage.erroMessage).toHaveText('Error: First Name is required');
    });
});
