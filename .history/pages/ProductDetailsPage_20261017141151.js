const {expect} = require('@playwright/test');

exports.ProductDetailsPage = class ProductDetailsPage {
    constructor(page) {
        this.page = page;