import { faker } from '@faker-js/faker';
export class LoginPage {

    elements = {

        login: {
            username: () => cy.get('#user-name'),
            password: () => cy.get('#password'),
            loginButton: () => cy.get('#login-button'),
            error: () => cy.get('[data-test="error"]')
        },
        homePage: {
            products: () => cy.get('.inventory_item_description'),
            productNames: () => cy.get('.inventory_item_name'),
            productSort: () => cy.get('.product_sort_container'),
            addToCartButtons: () => cy.get('.btn_primary'),
            cart: () => cy.get('.shopping_cart_link'),
            numberOfProductsInCart: () => cy.get('.shopping_cart_badge'),
            listOfProductsNamesInCart: () => cy.get('.inventory_item_name'),
            checkOut: () => cy.get('#checkout'),
            cartQuantity: () => cy.get('.cart_quantity'),
            firstName: () => cy.get('#first-name'),
            lastName: () => cy.get('#last-name'),
            postalCode: () => cy.get('#postal-code'),
            continueButton: () => cy.get('#continue'),
            productTitle: () => cy.get('.title'),
            productPrices: () => cy.get('.inventory_item_price'),
            totalPrice: () => cy.get('.summary_total_label'),
            subtotal: () => cy.get('.summary_info'),
            subtotalPrice: () => cy.get('.summary_info').find('.summary_subtotal_label'),
            summaryTax: () => cy.get('.summary_tax_label'),
            finishButton: () => cy.get('#finish'),
            finishTitle: () => cy.get('.header_secondary_container').find('.title'),
            completeHeader: () => cy.get('.complete-header'),
            completeText: () => cy.get('.complete-text'),
            removeFromCartButtons: () => cy.get('.item_pricebar').find('.btn_secondary'),
            cancelButton: () => cy.get('#cancel'),
            menuButton: () => cy.get('#react-burger-menu-btn'),
            logout: () => cy.get('#logout_sidebar_link')
        }
    }

    validFillLoginForm(username, password) {

        this.elements.login.username()
            .should('be.visible')
            .clear()
            .type(username)
            .should('have.value', username)
        this.elements.login.password()
            .type(password)
        this.elements.login.loginButton()
            .click()
        cy.get('[class="title"]').should('contain', 'Products')
        //cy.url()
        //   .should('include', '/inventory.html')

    }

    logOut() {
        this.elements.homePage.menuButton().click()
        this.elements.homePage.logout().click()
        this.elements.login.loginButton().should('contain', 'Login')
    }

    invalidFillLoginForm() {

        cy.fixture('user').then(users => {
            users.forEach(user => {
                this.elements.login.username().should('be.visible')
                    .clear()
                    .type(user.username)
                this.elements.login.password().should('be.visible')
                    .clear()
                    .type(user.password)
                this.elements.login.loginButton().should('be.visible')
                    .should('be.enabled')
                    .click()
                this.elements.login.error().should('contain', 'Epic sadface: Username and password do not match any user in this service')
            });
        })
    }

}
export const loginPage = new LoginPage()