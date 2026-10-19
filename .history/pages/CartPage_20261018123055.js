const {BasePage} = require('./BasePage');

exports.CartPage = class CartPage extends BasePage {
    constructor(page) {
        super(page);

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
        this.generatePDFButton = page.locator('[data-test="generate-pdf-order"]');
        
    }

    async 
    
}