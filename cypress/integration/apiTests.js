describe('Api tests',()=>{
    it('Get list of users',()=>{
        cy.request('GET', Cypress.env('apiUrl')+'/api/users?page=2').then(response =>{
            expect(response.status).to.eq(200)
            expect(response.body.data[1].id).to.eq(8)
            expect(response.body.data[1].email).to.eq('lindsay.ferguson@reqres.in')
            expect(response.duration).to.not.be.greaterThan(100)
        })
    })
    it('Create user',()=>{
        const bodyCreateUser={
            "name": "morpheus",
            "job": "leader"
        }
        cy.request('POST', Cypress.env('apiUrl')+'/api/users', bodyCreateUser).then(response =>{
            expect(response.status).to.eq(201)
            expect(response.body.name).to.eq(bodyCreateUser.name)
            expect(response.body.job).to.eq(bodyCreateUser.job)
        })
    })
    it('Update user', ()=>{
        const bodyUpdateUser={
            "name": "morpheus",
            "job": "zion resident"
        }
        cy.request('PUT', Cypress.env('apiUrl')+'/api/users/2', bodyUpdateUser).then(response =>{
            expect(response.status).to.eq(200)
            expect(response.body.name).to.eq(bodyUpdateUser.name)
            expect(response.body.job).to.eq(bodyUpdateUser.job)
        })
        cy.request('PATCH', Cypress.env('apiUrl')+'/api/users/2', bodyUpdateUser).then(response =>{
            expect(response.status).to.eq(200)
            expect(response.body.name).to.eq(bodyUpdateUser.name)
            expect(response.body.job).to.eq(bodyUpdateUser.job)
        })
    })
    it('Delete user',()=>{
        cy.request('DELETE', Cypress.env('apiUrl')+'/api/users/2').then(response =>{
            expect(response.status).to.eq(204)
            //test

        })
    })
})