const { expect } = require('@playwright/test');

exports.InventoryPage = class InventoryPage {
    constructor(page) {
        this.page = page;
        this.InventoryList = page.Locator('[data-test="inventory-list"]');
        this.InventoryItem = page.Locator('[data-test="inventory-item"]');
        this.InventoryLabel = page.Locator('[data-test="inventory-label"]')
        this.InventoryItemName = page.Locator('[data-test="inventory-item-name"]');
        this.InventoryItemPrice = page.Locator('[data-test="inventory-item-price"]');
        this.InventoryItemAddToCartButton = page.Locator('[data-test="add-to-cart-button"]');
    }
}