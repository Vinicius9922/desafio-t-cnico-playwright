const { expect } = require('@playwright/test');

exports.InventoryPage = class InventoryPage {
    constructor(page) {
        this.page = page;
        this.InventoryList = page.Locator('[data-test="inventory-list"]');
        this.

    }
}