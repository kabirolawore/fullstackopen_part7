describe('Blog App', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');

    const user = {
      name: 'kabir',
      username: 'admin',
      password: 'admin',
    };

    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    // cy.contains('Log in to Application');
    // cy.contains('username');
    // cy.contains('password');
    cy.get('html')
      .should('contain', 'Log in to Application')
      .and('contain', 'username')
      .and('contain', 'password')
      .and('contain', 'login');
  });

  describe('Login', function () {
    //
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('admin');
      cy.get('#password').type('admin');
      cy.get('#login-button').click();

      cy.contains('logout');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('admin');
      cy.get('#password').type('wrong');
      cy.get('#login-button').click();

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('admin');
      cy.get('#password').type('admin');
      cy.get('#login-button').click();
      cy.contains('create new blog').click();

      cy.get('#title').type('a test title');
      cy.get('#author').type('kabir');
      cy.get('#url').type('http://test.com');
      cy.get('#create-button').click();
    });

    it('A blog can be created', function () {
      //
      cy.get('.success')
        .should('contain', 'a test title by kabir added')
        .and('have.css', 'color', 'rgb(0, 128, 0)');
    });

    it('users can like a blog', function () {
      cy.get('.view-hide').click();
      cy.get('.likes-count').then((likesElement) => {
        const initialLikes = parseInt(likesElement.text());

        // Click the likes button
        cy.get('#likes').click();

        // Get the updated likes count
        cy.get('.likes-count').then((likesElement) => {
          const updatedLikes = parseInt(likesElement.text());

          // Assert that the likes count has increased
          expect(updatedLikes).to.equal(initialLikes + 1);
        });
      });
    });
  });
});
