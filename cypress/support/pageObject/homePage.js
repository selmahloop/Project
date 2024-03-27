import {faker} from '@faker-js/faker';
export class HomePage{
    constructor() {
        this.savedText = ' '
        this.totalPriceWithTax = 0
        this.totalPrice=0
        this.totalPriceWithoutTax=0
    }
    elements ={
        homePage:{
            products:() => cy.get('.inventory_item_description'),
            productNames:() => cy.get('.inventory_item_name'),
            productSort:()=> cy.get('.product_sort_container'),
            addToCartButtons:()=> cy.get('.btn_primary'),
            cart:()=> cy.get('.shopping_cart_link'),
            numberOfProductsInCart:()=> cy.get('.shopping_cart_badge'),
            listOfProductsNamesInCart:()=> cy.get('.inventory_item_name'),
            checkOut:()=> cy.get('#checkout'),
            cartQuantity:()=> cy.get('.cart_quantity'),
            firstName:()=> cy.get('#first-name'),
            lastName:()=> cy.get('#last-name'),
            postalCode:()=> cy.get('#postal-code'),
            continueButton:()=> cy.get('#continue'),
            productTitle:()=> cy.get('.title'),
            productPrices:()=> cy.get('.inventory_item_price'),
            totalPrice:()=> cy.get('.summary_total_label'),
            subtotal:()=>cy.get('.summary_info'),
            subtotalPrice:()=>cy.get('.summary_info').find('.summary_subtotal_label'),
            summaryTax:()=>cy.get('.summary_tax_label'),
            finishButton:()=>cy.get('#finish'),
            finishTitle:()=>cy.get('.header_secondary_container').find('.title'),
            completeHeader:()=>cy.get('.complete-header'),
            completeText:()=>cy.get('.complete-text'),
            removeFromCartButtons:()=>cy.get('.item_pricebar').find('.btn_secondary'),
            cancelButton:()=>cy.get('#cancel'),
            menuButton:()=>cy.get('#react-burger-menu-btn'),
            logout:()=>cy.get('#logout_sidebar_link'),
            titleText:()=>cy.contains('Sauce Labs Backpack')
        }
    }

    checkIfProductsAreSorted(){
        const nameList = []

        this.elements.homePage.productSort().should("not.be.disabled")
            .select("Name (A to Z)")
        /*this.elements.homePage.productNames().then($list => {
            let isSorted = true
            for (let i = 0; i < $list.length - 1; i++) {
            // Get text content of current and next elements
                const currentText = Cypress.$($list[i]).text().trim()
                const nextText = Cypress.$($list[i + 1]).text().trim()
                  
            // Compare current and next elements
                if (currentText.localeCompare(nextText) > 0) {
                    isSorted = false
                    break
                }
            }
            expect(isSorted).to.be.true
        }) */
        this.elements.homePage.productNames().each(($element)=>{
            nameList.push($element.text().trim())
        }).then(()=>{
            const sortedNameList =  [...nameList].sort()
            const sortedNameListDesc = [...nameList].sort().reverse();
            expect(nameList).to.satisfy((list) => {
                return Cypress._.isEqual(list, sortedNameList) || Cypress._.isEqual(list, sortedNameListDesc)
            }) 
        })
    }

    addToCartAllProducts(){
        let numberOfProducts=0  
        
        this.elements.homePage.addToCartButtons().each(item=>{
            numberOfProducts +=1
            cy.wrap(item).should('be.visible')
                .should('be.enabled')
                .click()
        })
        this.elements.homePage.numberOfProductsInCart().then(number=>{
            let numOfProducts = number.text()
            expect(parseFloat(numOfProducts)).to.eq(numberOfProducts)
        }) 

        this.elements.homePage.productTitle().should('contain', 'Products')
    }

    checkNamesOfProductsInTxtFile(){
        const fileName = "example.txt";
        let content=''
            this.elements.homePage.productNames().each(($el) => {
                // Get the text content of each element
                
                const text = $el.text().trim()
                
                // Append the text content to the content string
                content += text + "\n"
              }).then(() => {
                // Write the accumulated content to a file
                cy.writeFile(fileName, content)
              })
    }

    checkNumberOfProducts(){
        const test = 1
        this.savedText = test
        this.elements.homePage.products().should('have.length',6)
    }

    checkProductNamesInCart(){
        let listOfProducts = []
        let listOfProductsInCart = []

        this.elements.homePage.productNames().each(el => {
            const text = el.text().trim();
            listOfProducts.push(text)
        })
        this.elements.homePage.cart().should('be.visible')
            .click()
       
        this.elements.homePage.listOfProductsNamesInCart().each(el => {
            const text = el.text().trim();
            listOfProductsInCart.push(text)
        })
        cy.wrap(listOfProducts).should('deep.equal', listOfProductsInCart)
        this.elements.homePage.checkOut().should('contain','Checkout')
        this.elements.homePage.productTitle().should('contain','Your Cart')
    }

    checkOutCart(){
        /*this.elements.homePage.checkOut().should('be.visible')
            .click()
            cy.fixture('text').then((text) => {
            
                this.elements.homePage.firstName().invoke('val',text)
                    })*/
        this.elements.homePage.checkOut().should('be.visible')
            .click()     
        this.elements.homePage.firstName().should('be.visible')
            .clear()
            .type(faker.name.firstName())
        this.elements.homePage.lastName().should('be.visible')
            .clear()
            .type(faker.name.lastName())
        this.elements.homePage.postalCode().should('be.visible')
            .clear()
            .type(faker.address.zipCode())
        this.elements.homePage.continueButton().should('be.visible')
            .should('be.enabled')
            .click()
    }

    checkPricesInCartAndFinish(){
        let prices=0
        this.elements.homePage.productTitle().should('contain','Checkout: Overview')
    
        this.elements.homePage.productPrices().each(item=>{
            cy.wrap(item).GetOnlyNumbersFromString().then(price => {
                prices += price;
            });
        })

        let totalPriceWithTax=0
        let totalPrice=0
        
        this.elements.homePage.subtotalPrice().GetOnlyNumbersFromString().then(totalPriceWithoutTax=>{
            expect(prices).to.eq(totalPriceWithoutTax)
            this.elements.homePage.summaryTax().GetOnlyNumbersFromString().then(tax=>{
                totalPriceWithTax=totalPriceWithoutTax+tax
                
                this.elements.homePage.totalPrice().GetOnlyNumbersFromString().then(total=>{
                    totalPrice +=total
                    expect(totalPriceWithTax).to.eq(totalPrice)
                })
            })
        })
        this.elements.homePage.finishButton().should('be.visible')
            .should('be.enabled')
            .click()
        this.elements.homePage.finishTitle().should('contain', 'Checkout: Complete!')
        this.elements.homePage.completeHeader().should('contain','Thank you for your order!')
        this.elements.homePage.completeText().should('contain','Your order has been dispatched, and will arrive just as fast as the pony can get there!')

        cy.url().should('include', '/checkout-complete.html')
    }

    removeProductsFromCart(){
        this.elements.homePage.cart().should('be.visible')
            .click()
        this.elements.homePage.removeFromCartButtons().each(button=>{
            cy.wrap(button).should('be.visible')
                .should('be.enabled')
                .click()
        })
    }

    checkIsPriceZero(){
        let totalPriceWithTax=0
        this.elements.homePage.subtotalPrice().GetOnlyNumbersFromString().then(totalPriceWithoutTax=>{
            expect(totalPriceWithoutTax).to.eq(0)
            this.elements.homePage.summaryTax().GetOnlyNumbersFromString().then(tax=>{
                expect(tax).to.eq(0)
                totalPriceWithTax=totalPriceWithoutTax+tax
                this.elements.homePage.totalPrice().GetOnlyNumbersFromString().then(total=>{
                    expect(totalPriceWithTax).to.eq(total)
                })
            })
        })
        this.elements.homePage.cancelButton().should('be.visible')
            .should('be.enabled')
            .click()
    }

    returnText(){
        return this.elements.homePage.titleText().then(text =>{
            this.savedText=text.text()
        })
    }
    checkIsTextMatching(){
       this.returnText().then(() => {
            expect(this.savedText).to.eq('Sauce Labs Backpack')
       })
       
    }
}
export const homePage = new HomePage()