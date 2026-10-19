const { expect } = require('@playwright/test');

exports.InventoryPage = class InventoryPage {
    constructor(page) {
        this.page = page;

        //---Listagem de Produtos---//
        this.inventoryList = page.locator('[data-test="inventory-list"]');
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
        
        //---Carrinho---//
        this.cartButton = page.locator('[data-test="shopping-cart-link"]');

        //---Filtros---//
        this.productSort = page.locator('[data-test="product-sort-container"]');

        //---Footer---//
        this.SocialX = page.locator('[data-test="social-x"]');
        this.SocialFcebook = page.locator('[data-test="social-facebook"]');
        this.SocialLinkedin = page.locator('[data-test="social-linkedin"]');
        this.FooterCopy = page.locator('[data-test="footer-copy"]');
    }

    async assertInventoryListVisible() {
        await expect(this.inventoryList).toBeVisible();
    }

    async sidebar() {
        await this.sidebarButton.click();
        await expect(this.sidebarMenu).toBeVisible();
    }

    async cart() {
        await this.cartButton.click();        
    }

    async footer() {
        await this.SocialX.click();
        await this.SocialFcebook.click();
        await this.SocialLinkedin.click();        
    }
}