import * as router from '@azizka/router';

export interface Listener {
  listen?(type: string, listener: EventListenerOrEventListenerObject): void;
  performAction?(type: string, data: any): void;
}

export interface Component extends Listener {
  init(page: Page, firstTime: boolean): Promise<void>;

  mount?(): Promise<void>;
  unmount?(): Promise<void>;

  load?(lang: string, page: router.Page, firstLoad: boolean): Promise<void>;
}

export interface Page extends Listener {
  get elem(): HTMLElement | null;  

  init(parent: HTMLElement | null, firstTime: boolean): Promise<HTMLElement>;

  mount?(): Promise<void>;
  unmount?(): Promise<void>;

  load?(lang: string , page: router.Page, firstLoad: boolean): Promise<void>;  
}

export interface Layout extends Listener {
  replaceContent(content: Page): Promise<void>;
}
