import { Page } from "../../views/view";

export class Page2Mock implements Page {
  protected node: HTMLElement | null = null;
  
  get elem(): HTMLElement | null {
    return this.node;
  }

  async init(parent: HTMLElement | null, firstTime: boolean) {
    const content = parent || document.body;

    this.node = content.querySelector('[data-page="page-2"]') || null;

    return content;
  }  
}
