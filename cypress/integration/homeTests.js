import { homePage } from "../support/pageObject/homePage"
import { loginPage } from "../support/pageObject/loginPage"

beforeEach(()=>{
    cy.OpenPage()
})
describe('Home page tests',()=>{
    it('Products are sorted correctly',()=>{
        const username = 'standard_user'
        const password = 'secret_sauce'
        loginPage.validFillLoginForm(username,password)
        homePage.checkIfProductsAreSorted()
    })

    it('Numbers of products',()=>{
        cy.ValidLogin()
        homePage.checkNumberOfProducts()
    })

    it('Names of products',()=>{
        cy.ValidLogin()
        homePage.checkNamesOfProductsInTxtFile()
    })

    it.only('Add to cart all items',()=>{
        cy.ValidLogin()
        //loginPage.checkIfProductsAreSorted()
        homePage.addToCartAllProducts()
        homePage.checkProductNamesInCart()
        homePage.checkOutCart()
        homePage.checkPricesInCartAndFinish()
    })
    it('Remove items from cart',()=>{
        cy.ValidLogin()
        homePage.addToCartAllProducts()
        homePage.removeProductsFromCart()
        homePage.checkOutCart()
        homePage.checkIsPriceZero()
    })
    it('Check name of product',()=>{
        cy.ValidLogin()
        homePage.checkIsTextMatching()
    })
})

