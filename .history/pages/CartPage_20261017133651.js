const {expect} = require('@playwright/test');

exports.CartPage = class CartPage {
    constructor(page) {
        this.page = page;

        //---Carrinho---//
        this.cartItemList = page.locator('[data-test="cart-list"]');
        this.cartCheckoutButton = page.locator('[data-test="checkout"]');
        this.cartShoppingButton = page.locator('[data-test="continue-shopping"]');

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

    async

}