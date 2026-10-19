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

    test('Acessar carrinho de compras vazio', async () => {
        await inventoryPage.cart();
        await expect(inventoryPage.page).toHaveURL('https://www.saucedemo.com/cart.html');
        await expect(cartPage.cartItemList).toHaveCount(0);
    });

    test('Acessar carrinho de compras cheio', async () => {        
        await inventoryPage.inventoryItemAddToCartButton.click();
        await inventoryPage.cart();
        await expect(inventoryPage.page).toHaveURL('https://www.saucedemo.com/cart.html');
        await expect(cartPage.cartItemList).toHaveCount(1);
        await expect(cartPage.cartItemList)
        await expect(cartPage.cart).not.toHaveCount(0);
    });

    test('Acessar detalhes do produto', async () => {
        await inventoryPage.inventoryItemAddToCartButton.click();
        await inventoryPage.cart();
        await cartPage.cartItemName.first().click();
        await expect(productDetailsPage.page).toHaveURL(/.*inventory-item\.html.*/);
        await expect(productDetailsPage.productItem).toBeVisible();
    });
    
    test('Remover produto do carrinho', async () => {
        await inventoryPage.inventoryItemAddToCartButton.click();
        await inventoryPage.cart();       
        await cartPage.cartItemRemoveButton.click();
        await expect(cartPage.cartItemList).toHaveCount(0);
    });

    test('Avançar para o checkout', async () => {
        await inventoryPage.inventoryItemAddToCartButton.click();
        await inventoryPage.cart();       
        await cartPage.cartCheckoutButton.click();
        await expect(cartPage.page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');        
    });

    test('Voltar a lista de produtos', async () => {
        await inventoryPage.inventoryItemAddToCartButton.click();
        await inventoryPage.cart();       
        await cartPage.cartShoppingButton.click();
        await expect(inventoryPage.page).toHaveURL('https://www.saucedemo.com/inventory.html');        
    });
});