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
        await expect(cartPage.cartItem)
        await cartPage.finishButton.click();
        await expect(cartPage.page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
        await expect(cartPage.checkoutCompleteText).toBeVisible();
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
        await cartPage.cartCheckoutButton.click();
        await expect(cartPage.page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
        await cartPage.continueButton.click();
        await expect(cartPage.page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
        await expect(cartPage.errorMessage).toBeVisible();
    });

    test('Preencher checkout com campos incompletos', async () => {
        await inventoryPage.inventoryItemAddToCartButton.click();
        await inventoryPage.cart();
        await cartPage.cartCheckoutButton.click();
        await expect(cartPage.page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
        await cartPage.firstNameInput.fill('Vinicius');
        await cartPage.continueButton.click();
        await expect(cartPage.page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
        await expect(cartPage.errorMessage).toBeVisible();
    });
});

