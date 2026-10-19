const {expect} = require('@playwright/test');

exports.CartPage = class CartPage {
    constructor(page) {
        this.page = page;

        this.cartItemList = page.locator('[data-test="cart-list"]');
        this.cartCheckoutButton = page.locator('[data-test="checkout"]');
        
    }
}