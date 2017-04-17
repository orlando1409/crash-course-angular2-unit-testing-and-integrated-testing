import { Ng2TestingPage } from './app.po';

describe('ng2-testing App', function() {
  let page: Ng2TestingPage;

  beforeEach(() => {
    page = new Ng2TestingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
