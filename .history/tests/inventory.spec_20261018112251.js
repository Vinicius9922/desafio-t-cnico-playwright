const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { ProductDetailsPage } = require('../pages/ProductDetailsPage');

test.describe('Pagina de Inventário', () => {
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

    test ('Deve exibir a lista de produtos corretamente', async () => {
        await expect(inventoryPage.inventoryList).toBeVisible();
        await expect(inventoryPage.inventoryLabel.first()).not.toBeEmpty();
    });

    test('Adicionar produto ao carrinho', async () => {
        await inventoryPage.inventoryItemAddToCartButton.click();
        await expect(inventoryPage.cartButton).toHaveText('1');
    });

    test('Remover produto do carrinho', async () => {
        await inventoryPage.inventoryItemAddToCartButton.click();
        await expect(inventoryPage.cartButton).toHaveText('1');
        await inventoryPage.inventoryItemRemoveButton.click();
        await expect(inventoryPage.cartButton).toHaveText('0');
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
        await expect(cartPage.cartItemList).not.toHaveCount(0);
    });

    test('Acessar detalhes do produto', async () => {
        await inventoryPage.inventoryItem.first().click(); 
        await expect(productDetailsPage.page).toHaveURL(/.*inventory-item\.html.*/);
        await expect(productDetailsPage.productItem).toBeVisible();        
    });

    test('Aplicação de filtros na lista de produtos', async () => {
        await inventoryPage.productSort.selectOption('za');
        await expect(inventoryPage.productSort)


});