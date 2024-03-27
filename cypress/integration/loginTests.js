import { loginPage } from "../support/pageObject/loginPage"

beforeEach(()=>{
    cy.OpenPage()
})

describe('Login test',()=>{
    it('Valid login', ()=>{
        const username = 'standard_user'
        const password = 'secret_sauce'
        loginPage.validFillLoginForm(username,password)
    })

    it('Logout user',()=>{
        cy.ValidLogin()
        loginPage.logOut()
    })
/*
    it('Valid login', ()=>{
        loginPage.validFillLoginForm(user.username, user.password)
        loginPage.checkIfUserIsloggedIn()
    })*/

    it('Invalid login',()=>{
        loginPage.invalidFillLoginForm()
    })

})