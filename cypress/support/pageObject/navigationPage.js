export class Navigation{
    
    elements ={

        navigation: {
            twitter:() => cy.get('.social_twitter a'),
            facebook:() => cy.get('.social_facebook a'),
            linkedin:() => cy.get('.social_linkedin a')

        }
    }

    goToTwitter(){

        /*cy.fixture('links').then(links => {
            links.forEach(link => {
                cy.RemoveAll(link.selector,link.link)
                cy.OpenPage()
                cy.ValidLogin()
            })
        })*/

        cy.fixture('selectorsAndLinks').then(data=>{
            const selectors=data.selectors
            const links=data.links
            selectors.forEach((selector,index) => {
                //const link = links[index];
                cy.RemoveAll(selectors[index],links[index])
                cy.OpenPage()
                cy.ValidLogin()
            })
        })

        //cy.RemoveNewTab('.social_twitter a')
        //cy.url().should('include', 'twitter.com/saucelabs')
    }

    goToFacebook(){
        cy.OpenPage()
        cy.ValidLogin()
        cy.RemoveNewTab('.social_facebook a')
        //this.elements.navigation.facebook().invoke('attr','target','_self').click()
        cy.url().should('include', 'https://www.facebook.com/saucelabs')
    }

    goToLinkedin(){
        cy.OpenPage()
        cy.ValidLogin()
        cy.ChangeTarget('.social_linkedin a')
        //this.elements.navigation.linkedin().invoke('removeAttr', 'target').click()
        cy.url().should('include', 'https://www.linkedin.com/company/sauce-labs/')
    }

    verify_all_link()
    {

        cy.RemoveAll('selectors','links')
    }
}
export const navigateTo = new Navigation()