const { BasePage } = require('./BasePage');

exports.CartPage = class CartPage extends BasePage {
    constructor(page) {
        super(page);

        //---Carrinho---//
        this.cartItemList = page.locator('.cart_item');
        this.cartItemName = page.locator('[data-test="inventory-item-name"]');
        this.cartItemRemoveButton = page.locator('[data-test^="remove-"]');
        this.cartCheckoutButton = page.locator('[data-test="checkout"]');
        this.cartShoppingButton = page.locator('[data-test="continue-shopping"]');

        //---Checkout---//
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.zipCodeInput = page.locator('[data-test="postalCode"]');
        this.cancelButton = page.locator('[data-test="cancel"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.errorMessage = page.locator('[data-test="error"]');

        //---Checkout Overview---//
        this.checkoutOverviewItemList = page.locator('.cart_item');
        this.subtotalLabel = page.locator('data-test="subtotal-label"');
        this.
        this.finishButton = page.locator('[data-test="finish"]');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');

        //---Checkout Complete---//
        this.checkoutCompleteText = page.locator('[data-test="checkout-complete-container"]');
        this.generatePDFButton = page.locator('[data-test="generate-pdf-order"]');

    }

    async checkout(firstName, lastName, zipCode) {
        await this.cartCheckoutButton.click();
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.zipCodeInput.fill(zipCode);
        await this.continueButton.click();
    }

}