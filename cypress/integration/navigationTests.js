import { navigateTo } from "../support/pageObject/navigationPage"
beforeEach(()=>{
    cy.OpenPage()
})

describe('Links in new tab',()=>{
    it('Navigation tests', ()=>{
        cy.ValidLogin()
        navigateTo.goToTwitter()
        //navigateTo.goToFacebook()
        //navigateTo.goToLinkedin()
    })
})
