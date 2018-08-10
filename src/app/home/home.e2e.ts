import { browser, by, element } from 'protractor';
import 'tslib';

describe('Home', () => {

  beforeEach(async () => {
    /**
     * Change hash depending on router LocationStrategy.
     */
    await browser.get('/');
  });


  it('should have a element called `Bulbasaur`', async () => {
    const subject = await element(by.css('[title]')).getText();
    const result = 'Bulbasaur';
    expect(subject).toEqual(result);
  });

});
