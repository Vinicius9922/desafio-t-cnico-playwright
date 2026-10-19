const {test, expect} = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { ProductDetailsPage } = require('../pages/ProductDetailsPage');

test.describe('Fluxo de Checkout', () => {
    let loginPage;
    let inventoryPage;
    let productDetailsPage;
    let cartPage;