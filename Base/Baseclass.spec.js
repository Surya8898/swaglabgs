class BasePage {

  constructor(page) {
    this.page = page;
    this.defaultTimeout = 30000;
  }

  /* ======================
     COMMON WAIT METHODS
     ====================== */

  async waitForVisible(locator, timeout = this.defaultTimeout) {
    try {
      await locator.waitFor({ state: 'visible', timeout });
    } catch (error) {
      throw new Error(`Element not visible: ${locator}\n${error}`);
    }
  }

  async waitForHidden(locator, timeout = this.defaultTimeout) {
    try {
      await locator.waitFor({ state: 'hidden', timeout });
    } catch (error) {
      throw new Error(`Element not hidden: ${locator}\n${error}`);
    }
  }

  async waitForPageLoad() {
    try {
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForLoadState('networkidle');
    } catch (error) {
      throw new Error(`Page did not load properly\n${error}`);
    }
  }

  /* ======================
     ACTION METHODS
     ====================== */

  async click(locator) {
    try {
      await this.waitForVisible(locator);
      await locator.click();
    } catch (error) {
      await this.captureError('click');
      throw new Error(`Click failed on ${locator}\n${error}`);
    }
  }

  async fill(locator, value) {
    try {
      await this.waitForVisible(locator);
      await locator.fill(value);
    } catch (error) {
      await this.captureError('fill');
      throw new Error(`Fill failed on ${locator} with value ${value}\n${error}`);
    }
  }

  async type(locator, value) {
    try {
      await this.waitForVisible(locator);
      await locator.type(value);
    } catch (error) {
      await this.captureError('type');
      throw new Error(`Type failed on ${locator}\n${error}`);
    }
  }

  async getText(locator) {
    try {
      await this.waitForVisible(locator);
      return await locator.textContent();
    } catch (error) {
      throw new Error(`Get text failed on ${locator}\n${error}`);
    }
  }

  async isVisible(locator) {
    try {
      return await locator.isVisible();
    } catch {
      return false;
    }
  }

  async selectByValue(locator, value) {
    try {
      await this.waitForVisible(locator);
      await locator.selectOption(value);
    } catch (error) {
      throw new Error(`Select failed on ${locator} with value ${value}\n${error}`);
    }
  }

  async hover(locator) {
    try {
      await this.waitForVisible(locator);
        await locator.hover();
    } catch (error) {
        throw new Error(`Hover failed on ${locator}\n${error}`);
    }
    }

 async scrollIntoView(locator, timeout = this.defaultTimeout) {
  try {
    await locator.waitFor({ state: 'attached', timeout });
    await locator.scrollIntoViewIfNeeded();
    await locator.waitFor({ state: 'visible', timeout });
  } catch (error) {
    throw new Error(`Scroll into view failed for locator\n${error}`);
  }
}

    async acceptDialog() {
  try {
    this.page.once('dialog', async dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      await dialog.accept();
    });
  } catch (error) {
    throw new Error(`Failed to accept dialog\n${error}`);
  }
}  
async dismissDialog() {
  try {
    this.page.once('dialog', async dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      await dialog.dismiss();
    });
  } catch (error) {
    throw new Error(`Failed to dismiss dialog\n${error}`);
  }
}

async acceptPrompt(value) {
  try {
    this.page.once('dialog', async dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      await dialog.accept(value);
    });
  } catch (error) {
    throw new Error(`Failed to accept prompt with value ${value}\n${error}`);
  }
}

  /* ======================
     NAVIGATION
     ====================== */

  async navigateTo(url) {
    try {
      await this.page.goto(url, { waitUntil: 'networkidle' });
    } catch (error) {
      throw new Error(`Navigation failed for ${url}\n${error}`);
    }
  }

  async verifytext(locator, expectedText) {
    try {
      const actualText = await this.getText(locator);

      if(actualText == expectedText){

        return true;
      }
        else{  
            return false;   
        }
    } catch (error) {
      throw new Error(`Text verification failed on ${locator}\n${error}`);
    }
}



  /* ======================
     ERROR HANDLING
     ====================== */

  async captureError(actionName) {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    await this.page.screenshot({
      path: `screenshots/${actionName}-${timestamp}.png`,
      fullPage: true
    });
  }
}


module.exports = BasePage;
