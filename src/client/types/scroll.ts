export const ScrollActionTop = 'scroll-top';
export const ScrollActionTo = 'scroll-to';

export const ScrollEventType = 'content-scrolled';

export interface ScrollEventData {
  currScroll: number;
  prevScroll: number;
}
