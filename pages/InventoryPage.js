const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

exports.InventoryPage = class InventoryPage extends BasePage {
    constructor(page) {
        super(page);       

        //---Listagem de Produtos---//
        this.inventoryList = page.locator('[data-test="inventory-container"]');
        this.inventoryItem = page.locator('[data-test="inventory-item-name"]');
        this.inventoryImage = page.locator('.inventory_item_img');
        this.inventoryItemDescription = page.locator('[data-test="inventory-item-description"]');
        this.inventoryLabel = page.locator('.inventory_item_label')
        this.inventoryItemName = page.locator('[data-test="inventory-item-name"]');        
        this.inventoryDesc = page.locator('[data-test="inventory-item-desc"]');
        this.inventoryItemPrice = page.locator('[data-test="inventory-item-price"]');
        this.inventoryItemAddToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.inventoryItemRemoveButton = page.locator('[data-test="remove-sauce-labs-backpack"]');       

        //---Filtros---//
        this.productSort = page.locator('[data-test="product-sort-container"]');      
    }  

    async assertInventoryListVisible() {
        await expect(this.inventoryList).toBeVisible();
    }

    async addProductToCart(slug) {
        await this.page.locator(`[data-test="add-to-cart-${slug}"]`).click();
    }
}