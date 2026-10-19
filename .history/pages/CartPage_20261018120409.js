const {expect} = require('@playwright/test');

exports.CartPage = class CartPage {
    constructor(page) {
        this.page = page;

        //---Carrinho---//
        this.cartItemList = page.locator('.cart_item');
        this.cartCheckoutButton = page.locator('[data-test="checkout"]');
        this.cartShoppingButton = page.locator('[data-test="continue-shopping"]');

        //---Checkout---//
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.zipCodeInput = page.locator('[data-test="postalCode"]');
        this.cancelButton = page.locator('[data-test="cancel"]');
        this.continueButton = page.locator('[data-test="continue"]');

        //---Checkout Overview---//
        this.checkoutOverviewItemList = page.locator('[data-test="title"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');

        //---Checkout Complete---//
        this.checkoutCompleteText = page.locator('[data-test="checkout-complete-container"]');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');

        //---Sidebar---//
        this.sidebarButton = page.locator('#react-burger-menu-btn');
        this.sidebarMenu = page.locator('.bm-menu');
        this.sidebarAllItems = page.locator('[data-test="inventory-sidebar-link"]');
        this.sidebarCatalog = page.locator('[data-test="dynamic-catalog-sidebar-link"]');
        this.sidebarAbout = page.locator('[data-test="about-sidebar-link"]');
        this.sidebarLogout = page.locator('[data-test="logout-sidebar-link"]');
        this.sidebarReset = page.locator('[data-test="reset-sidebar-link"]');  
        this.sidebarCloseButton = page.locator('#react-burger-cross-btn');  

        //---Footer---//
        this.SocialX = page.locator('[data-test="social-x"]');
        this.SocialFcebook = page.locator('[data-test="social-facebook"]');
        this.SocialLinkedin = page.locator('[data-test="social-linkedin"]');
        this.FooterCopy = page.locator('[data-test="footer-copy"]');
    }

    async assertCartListVisible() {
        await expect(this.cartItemList).toBeVisible();
    }

    async sidebar() {
        await this.sidebarButton.click();
        await expect(this.sidebarMenu).toBeVisible();
    }

    async footer() {
        await this.SocialX.click();
        await this.SocialFcebook.click();
        await this.SocialLinkedin.click();        
    }

}