const { expect } = require('@playwright/test');

exports.InventoryPage = Class InventoryPage {
    constructor(page) {
        this.page = page;
        this.InventoryItems = page.Locator()

    }
}