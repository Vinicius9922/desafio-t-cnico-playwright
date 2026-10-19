const {expect} = require('@playwright/test');

exports.CartPage = class CartPage {
    constructor(page) {
        this.page = page;
        //---Listagem de Produtos---//
        this.cartItemList = page.locator('[data-test="cart-list"]');
        this.cartCheckoutButton = page.locator('[data-test="checkout"]');
        this.cartShoppingButton = page.locator('[data-test="continue-shopping"]');

        //---Sidebar---//
    }
}