import { JSDOM } from "jsdom";

import { Page1Mock } from "../../mocks/views/page-1-mock";
import { Page2Mock } from "../../mocks/views/page-2-mock";

import { DefaultLayout } from "./default-layout";

describe('DefaultLayout test', () => {
  beforeEach(() => {
    const dom = new JSDOM();

    global.document = dom.window.document;
  });

  test('Should get single instance of DefaultLayout', () => {
    const instance = DefaultLayout.instance;
    
    expect(instance).toBeTruthy();
    expect(instance).toBeInstanceOf(DefaultLayout);
    expect(instance).toBe(DefaultLayout.instance);
  });

  test('Should replace content correctly', async () => {
    const instance = DefaultLayout.instance;

    document.body.innerHTML = `
      <div data-page="page-1">
        Page 1
      </div>
    `;

    const page1 = new Page1Mock();

    await page1.init(null, true);

    expect(document.body.children[0]).toBe(page1.elem);

    await instance.replaceContent(page1);

    expect(instance['content']).toBe(page1);

    const page2Elem = document.createElement('div');

    page2Elem.innerHTML = `
      <div data-page="page-2">
        Page 2
      </div>
    `;

    const page2 = new Page2Mock();

    await page2.init(page2Elem, false);

    expect(page2Elem.children[0]).toBe(page2.elem);

    await instance.replaceContent(page2);

    expect(instance['content']).toBe(page2);
    expect(document.body.children[0]).toBe(page2.elem);
  });
});
