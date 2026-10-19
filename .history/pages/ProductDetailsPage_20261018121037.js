const { expect } = require('@playwright/test');

exports.ProductDetailsPage = class ProductDetailsPage {
    constructor(page) {
        this.page = page;

        //---Detalhes do Produto---//
        this.backToProductsButton = page.locator('[data-test="back-to-products"]');
        this.productItem = page.locator('[data-test="inventory-item-name"]');
        this.productImage = page.locator('.inventory_item_img');
        this.productItemDescription = page.locator('[data-test="inventory-item-description"]');
        this.productLabel = page.locator('.inventory_item_label')
        this.productItemName = page.locator('[data-test="inventory-item-name"]');
        this.productDesc = page.locator('[data-test="inventory-item-desc"]');
        this.productItemPrice = page.locator('[data-test="inventory-item-price"]');
        this.productItemAddToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.productItemRemoveButton = page.locator('[data-test="remove"]');

        
    };

    async assertProductDetailsVisible() {
        await expect(this.productItem).toBeVisible();
    };
     async sidebar() {
        await this.sidebarButton.click();
        await expect(this.sidebarMenu).toBeVisible();
    };

    async cart() {
        await this.cartButton.click();        
    };

    async footer() {
        await this.SocialX.click();
        await this.SocialFcebook.click();
        await this.SocialLinkedin.click();        
    };
};

