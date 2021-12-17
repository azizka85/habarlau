import './types/window';

export function mountClientNavigation(root: HTMLElement | null) {
  if(root) {
    const buttons = root.querySelectorAll('.btn');

    for(let button of buttons) {
      if(button.hasAttribute('href')) {
        button.addEventListener('click', event => navigateHandler(event, button as HTMLElement));
      }
    }
  }
}

export async function sleep(ms?: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function navigateHandler(event: Event, elem: HTMLElement) {
  event.preventDefault();

  const path = elem.getAttribute?.('href');

  if(path) {
    await window.router.navigateTo(path);
  }
}

export async function loadContent(
  parent: HTMLElement | null, 
  firstTime: boolean, 
  layouts: string[]
): Promise<HTMLElement> {
  let content: HTMLElement;

  if(firstTime || parent) {
    content = parent || document.body;
  } else {
    let path = location.pathname + '?ajax=1&init=1&time=' + Date.now();

    const layoutsToLoad = [];

    for(let layout of layouts) {
      if(!(layout in window.layouts)) {
        layoutsToLoad.push(layout);
      }
    }

    if(layoutsToLoad.length > 0) {
      path += '&layouts=' + layoutsToLoad.join(',');
    }

    const html = await (await fetch(path)).text();
    
    content = document.createElement('div');

    content.innerHTML = html;
  }

  return content;
}

export async function mount(elem: HTMLElement | null) {
  await sleep(10);

  elem?.classList.remove('page--unmount');
}

export async function unmount(elem: HTMLElement | null) {
  elem?.classList.add('page--unmount');

  await sleep(250);
}
