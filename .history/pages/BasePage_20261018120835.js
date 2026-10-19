exports; BasePage = class BasePage {
    constructor(page) {
        this.page = page;
    }
    //---Sidebar---//
    // this.sidebarButton = page.locator('#react-burger-menu-btn');
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


