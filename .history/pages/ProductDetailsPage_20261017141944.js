const { expect } = require('@playwright/test');

exports.ProductDetailsPage = class ProductDetailsPage {
    constructor(page) {
        this.page = page;

        //---Detalhes do Produto---//
        this.backToProductsButton = page.locator('[data-test="back-to-products"]');
        this.productItem = page.locator('[data-test="inventory-item"]');
        this.productImage = page.locator('.inventory_item_img');
        this.productItemDescription = page.locator('[data-test="inventory-item-description"]');
        this.productLabel = page.locator('.inventory_item_label')
        this.productItemName = page.locator('[data-test="inventory-item-name"]');
        this.productDesc = page.locator('[data-test="inventory-item-desc"]');
        this.productItemPrice = page.locator('[data-test="inventory-item-price"]');
        this.productItemAddToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');

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

        //---Footer---//
        this.SocialX = page.locator('[data-test="social-x"]');
        this.SocialFcebook = page.locator('[data-test="social-facebook"]');
        this.SocialLinkedin = page.locator('[data-test="social-linkedin"]');
        this.FooterCopy = page.locator('[data-test="footer-copy"]');
    }

    async assertProductDetailsVisible() {
        await expect(this.productItem).toBeVisible();
    };
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
    

