import { browser, by, element, protractor, $ } from 'protractor';

import 'tslib';
import { By } from '../../../node_modules/@angular/platform-browser';

describe('Pokemon Mini Card Component', () => {
  const EC = protractor.ExpectedConditions;

  beforeEach(async () => {
    await browser.get('/pokemon');
  });

  it('should have a pokemon with title `#000 Bulbasaur`', async () => {
    // Elements
    const expected = '#000 Bulbasaur';
    const elementSelector = '.title';
    const elementMatcher = $(elementSelector);

    // Conditions
    const isPresent = EC.visibilityOf(elementMatcher);
    const titleIsBulbasaur = EC.textToBePresentInElement(elementMatcher, expected);

    // Validate that condition is satisfied
    browser.wait(EC.and(isPresent, titleIsBulbasaur), 5000);
  });

});
