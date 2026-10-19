const { expect } = require('@playwright/test');

exports.InventoryPage = class InventoryPage {
    constructor(page) {
        this.page = page;
        //---Listagem de Produtos---//
        this.InventoryList = page.locator('[data-test="inventory-list"]');
        this.InventoryItem = page.locator('[data-test="inventory-item"]');
        this.InventoryImage = page.locator('.inventory_item_img');
        this.InventoryItemDescription = page.locator('[data-test="inventory-item-description"]');
        this.InventoryLabel = page.locator('.inventory_item_label')
        this.InventoryItemName = page.locator('[data-test="inventory-item-name"]');        
        this.InventoryDesc = page.locator('[data-test="inventory-item-desc"]');
        this.InventoryItemPrice = page.locator('[data-test="inventory-item-price"]');
        this.InventoryItemAddToCartButton = page.locator('[data-test="add-to-cart-button"]');
        //---Sidebar---//
        this.Sidebarbutton = page.locator('#')
        
    }
}