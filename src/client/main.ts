import { toCamel } from '../utils/formatter';

async function loadPage(name: string) {
  const pageName = `${name}-page`;
  
  const module = (await import(`./views/pages/${pageName}.js?time=${Date.now()}`)) as any;

  return module[toCamel(pageName)]?.instance?.load?.(pageName);
}

const name = location.pathname.slice(1) || 'home';

await loadPage(name);
