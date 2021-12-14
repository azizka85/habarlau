import { Page } from "../view";

export class BaseLayout {
  protected content: Page | null = null;

  async replaceContent(content: Page) {
    await this.content?.unmount?.();
    this.content?.elem?.replaceWith(content.elem || '');
    await content.mount?.();

    this.content = content;
  }
}