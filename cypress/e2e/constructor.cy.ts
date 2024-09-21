// const url = 'https://norma.nomoreparties.space/api';

describe('Интеграционные тесты для страницы конструктора бургера', () => {
  it('сервис должен быть доступен по адресу localhost:4000', function () {
    cy.visit('');
  });

  beforeEach(() => {
    cy.setCookie('accessToken', 'someAccessToken');
    localStorage.setItem('refreshToken', 'someRereshToken');
    cy.intercept('GET', `api/ingredients`, {
      fixture: 'ingredients.json'
    });
    cy.intercept('POST', `api/orders`, { fixture: 'order.json' });
    cy.intercept('GET', `api/auth/user`, { fixture: 'user.json' });

    cy.visit('');
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });

  it('Добавление ингредиента из списка ингредиентов в конструктор.', () => {
    cy.get(`[data-cy='chooseBunTop']`).contains('Выберите булки');
    cy.get(`[data-cy='chooseBunBottom']`).contains('Выберите булки');
    cy.get('h3').contains('Булки').next('ul').contains('Добавить').click();
    cy.get('div').contains('Выберите булки').should('not.exist');

    cy.get(`[data-cy='chooseFilling']`).contains('Выберите начинку');
    cy.get('h3').contains('Начинки').next('ul').contains('Добавить').click();
    cy.get('div').contains('Выберите начинку').should('not.exist');
  });

  it('Открытие и закрытие модального окна с описанием ингредиента', () => {
    cy.get('p').contains('Краторная булка N-200i').click();
    cy.get(`[data-cy='modal'`).should('be.visible');
    cy.get(`[data-cy='modal'`).should('contain', 'Детали ингредиента');
    cy.get(`[data-cy='modal'`).should('contain', 'Краторная булка N-200i');
    cy.get(`[data-cy='modalCloseButton'`).click();
    cy.get(`[data-cy='modal'`).should('not.exist');
  });

  it('Открытие и закрытие модального окна на оверлей с описанием ингредиента', () => {
    cy.get('p').contains('Краторная булка N-200i').click();
    cy.get(`[data-cy='modal'`).should('be.visible');
    cy.get(`[data-cy='modal'`).should('contain', 'Детали ингредиента');
    cy.get(`[data-cy='modal'`).should('contain', 'Краторная булка N-200i');
    cy.get(`[data-cy='modalOverlay'`).click({ force: true });
    cy.get(`[data-cy='modal'`).should('not.exist');
  });

  it('Процесс создания заказа', () => {
    cy.get('h3').contains('Булки').next('ul').contains('Добавить').click();
    cy.get('h3').contains('Начинки').next('ul').contains('Добавить').click();
    cy.get(`[data-cy='orderButton']`).click();
    cy.get(`[data-cy='modal'`).should('be.visible');
    cy.get(`[data-cy='orderNumber']`).should('contain', '53398');
    cy.get(`[data-cy='modalCloseButton'`).click();
    cy.get(`[data-cy='modal'`).should('not.exist');

    cy.get(`[data-cy='chooseBunTop']`).contains('Выберите булки');
    cy.get(`[data-cy='chooseBunBottom']`).contains('Выберите булки');
    cy.get(`[data-cy='chooseFilling']`).contains('Выберите начинку');
  });
});
