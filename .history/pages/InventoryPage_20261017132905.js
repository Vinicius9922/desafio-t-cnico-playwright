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
        this.InventoryItemAddToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');

        //---Sidebar---//
        this.SidebarButton = page.locator('#react-burger-menu-btn');
        this.SidebarMenu = page.locator('.bm-menu');
        this.SidebarAllItems = page.locator('[data-test="inventory-sidebar-link"]');
        this.SidebarCatalog = page.locator('[data-test="dynamic-catalog-sidebar-link"]');
        this.SidebarAbout = page.locator('[data-test="about-sidebar-link"]');
        this.SidebarLogout = page.locator('[data-test="logout-sidebar-link"]');
        this.SidebarReset = page.locator('[data-test="reset-sidebar-link"]');  
        this.SidebarCloseButton = page.locator('#react-burger-cross-btn');  
        
        //---Carrinho---//
        this.CartButton = page.locator('[data-test="shopping-cart-link"]');

        //---Filtros---//
        this.ProductSort = page.locator('[data-test="product-sort-container"]');

        //---Footer---//
        this.SocialX = page.locator('[data-test="social-x"]');
        this.SocialFcebook = page.locator('[data-test="social-facebook"]');
        this.SocialLinkedin = page.locator('[data-test="social-linkedin"]');
        this.FooterCopy = page.locator('[data-test="footer-copy"]');
    }

    async assertInventoryListVisible() {
        await expect(this.InventoryList).toBeVisible();
    }

    async sidebar() {
        await this.SidebarButton.click();
        await expect(this.SidebarMenu).toBeVisible();
    }

    async cart() {
        await this.CartButton.click();        
    }

    async footer() {
        await this.SocialX.click();
        await this.SocialFcebook.click();
        await this.SocialLinkedin.click();        
    }
}