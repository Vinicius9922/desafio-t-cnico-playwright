const { expect } = require('@playwright/test');

exports.InventoryPage = class InventoryPage {
    constructor(page) {
        this.page = page;
        this.InventoryList = page.locator('[data-test="inventory-list"]');
        this.InventoryItem = page.locator('[data-test="inventory-item"]');
        this.InventoryLabel = page.locator('.inventory_item_label')
        this.InventoryItemName = page.locator('[data-test="inventory-item-name"]');
        this.InventoryItemDescription = page.locator('[data-test="inventory-item-descr=n"]');
        this.InventoryItemPrice = page.locator('[data-test="inventory-item-price"]');
        this.InventoryItemAddToCartButton = page.locator('[data-test="add-to-cart-button"]');
    }
}