const {expect} = require('@playwright/test');

exports.ProductDetailsPage = class ProductDetailsPage {
    constructor(page) {
        this.page = page;

        this.inventoryItem = page.locator('[data-test="inventory-item"]');
        this.inventoryImage = page.locator('.inventory_item_img');
        this.inventoryItemDescription = page.locator('[data-test="inventory-item-description"]');
        this.inventoryLabel = page.locator('.inventory_item_label')
        this.inventoryItemName = page.locator('[data-test="inventory-item-name"]');        
        this.inventoryDesc = page.locator('[data-test="inventory-item-desc"]');
        this.inventoryItemPrice = page.locator('[data-test="inventory-item-price"]');
        this.inventoryItemAddToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');

        //---Sidebar---//
        this.sidebarButton = page.locator('#react-burger-menu-btn');
        this.sidebarMenu = page.locator('.bm-menu');
        this.sidebarAllItems = page.locator('[data-test="inventory-sidebar-link"]');
        this.sidebarCatalog = page.locator('[data-test="dynamic-catalog-sidebar-link"]');
        this.sidebarAbout = page.locator('[data-test="about-sidebar-link"]');
        this.sidebarLogout = page.locator('[data-test="logout-sidebar-link"]');
        this.sidebarReset = page.locator('[data-test="reset-sidebar-link"]');  
        this.sidebarCloseButton = page.locator('#react-burger-cross-btn');  

    }
};