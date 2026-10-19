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
    }
}