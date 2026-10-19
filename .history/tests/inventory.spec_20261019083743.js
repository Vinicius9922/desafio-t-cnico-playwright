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
        await expect(inventoryPage.cartBadge).toHaveText('1');
    });   

    test('Remover produto do carrinho', async () => {
        await inventoryPage.inventoryItemAddToCartButton.click();
        await expect(inventoryPage.cartBadge).toHaveText('1');
        await inventoryPage.inventoryItemRemoveButton.click();
        await expect(inventoryPage.cartBadge).toBeHidden();
    });            

    test('Acessar detalhes do produto', async () => {
        await inventoryPage.inventoryItem.first().click(); 
        await expect(productDetailsPage.page).toHaveURL(/.*inventory-item\.html.*/);
        await expect(productDetailsPage.productItem).toBeVisible();        
    });

    test('Ordenar produtos por nome', async () => {
        await inventoryPage.productSort.selectOption('az');
        const nomesAZ = await inventoryPage.inventoryName.allTextContents();        
        expect(nomesAZ).toEqual([...nomesAZ].sort());

        await inventoryPage.productSort.selectOption('za');
        const nomesZA = await inventoryPage.inventoryName.allTextContents();
        expect(nomesZA).toEqual([...nomesZA].sort().reverse());
    });

    test('Ordenar produtos por preço', async () => {
        await inventoryPage.productSort.selectOption('lohi');
        const textosLoHi = await inventoryPage.inventoryItemPrice.allTextContents();
        const precosLoHi = textosLoHi.map(preco => parseFloat(preco.replace('$', '')));
        expect(precosLoHi).toEqual([...precosLoHiNumericos].sort((a, b) => a - b)); 
    })
    
});