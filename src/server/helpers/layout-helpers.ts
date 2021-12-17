import { Request } from "express";
import { TemplateFunction } from "ejs";

import { Langs, locales } from './locale-helpers';
import { toggleQueryParameter } from '../../helpers';

import defaultLayout from "../templates/layouts/default-layout";
import mainLayout from "../templates/layouts/main-layout";

export const layoutHandlersMap: LayoutHandlers = {
  'main-layout': mainLayoutHandler
};

export interface LayoutHandlerOutput {
  partials: any;
  helpers: any;
  data: any;
  view: TemplateFunction;
}

export interface LayoutHandlerInput extends LayoutHandlerOutput {
  lang: Langs;
  rootLink: string;
  viewName: string;
}

export interface LayoutHandlerInfo {
  name: string,
  handler: (req: Request, input: LayoutHandlerInput) => LayoutHandlerOutput;
}

export interface LayoutHandlers {
  [key: string]: (req: Request, input: LayoutHandlerInput) => LayoutHandlerOutput;
}

export function stringToArray(param?: string) {
  if(param) {
    const array = param.split(',');

    return array.map(item => item.trim());
  }

  return [];
}

export function getLayoutHandlers(layouts: string[]) {
  const handlers: LayoutHandlerInfo[] = [];

  for(const layout of layouts) {
    if(layout in layoutHandlersMap) {
      handlers.push({
        name: layout,
        handler: layoutHandlersMap[layout]
      });
    }
  }

  return handlers;
}

export function renderPage(
  lang: Langs,
  rootLink: string,
  version: string,  
  req: Request, 
  pageName: string,
  page: TemplateFunction, 
  data: any,   
  layoutHandlers?: LayoutHandlerInfo[],
  partials?: any,
  helpers?: any,
) {
  partials = {
    ...partials
  };
  helpers = {
    ...helpers,
    tr: locales[lang]
  };

  data = {
    ...data,
    lang,
    rootLink
  };

  let viewName = pageName;
  let view = page;

  if(layoutHandlers) {
    for(const handlerInfo of layoutHandlers) {
      const handler = handlerInfo.handler;

      const viewData = handler(req, {
        lang,
        rootLink,
        data,
        helpers,
        partials,
        viewName,
        view
      });

      data = viewData.data;
      helpers = viewData.helpers;
      partials = viewData.partials;

      view = viewData.view;
      viewName = handlerInfo.name;
    }
  }

  if(!req.query.ajax) {
    if(viewName) {
      partials[viewName] = view;
    }

    view = defaultLayout;    

    data = {
      lang,
      rootLink,
      version,
      content: viewName,
      contentData: data
    };
  }

  return view({ 
    data,
    partials,
    helpers 
  });
}

export function mainLayoutHandler(req: Request, input: LayoutHandlerInput): LayoutHandlerOutput {
  const view = mainLayout;

  const lang = input.lang;
  const rootLink = input.rootLink;

  input.partials[input.viewName] = input.view;

  const helpers = {
    ...input.helpers,
    toggleQueryParameter
  };

  const navigation = req.query['main-layout-navigation'] === '1';
  const search = req.query['main-layout-search'] === '1';

  const data = {
    lang,
    rootLink,
    navigation,
    search,
    query: req.query,
    content: input.viewName,
    contentData: input.data
  };

  return {
    data,
    helpers,
    partials: input.partials,
    view
  };
}
