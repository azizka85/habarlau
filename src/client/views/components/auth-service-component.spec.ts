import { JSDOM } from "jsdom";

import { DEFAULT_LANGUAGE } from '../../../globals';

import { locales } from '../../../server/helpers/locale-helpers';

import { SignUpPage } from '../pages/sign-up-page';
import { AuthServiceComponent } from './auth-service-component';

describe('AuthServiceComponent test', () => {
	beforeEach(() => {
		const dom = new JSDOM();    

    global.document = dom.window.document;
		global.window = (dom.window as unknown) as Window & typeof globalThis;  

		global.Element = dom.window.Element;
		global.HTMLElement = dom.window.HTMLElement;		
		global.HTMLIFrameElement = dom.window.HTMLIFrameElement;

		global.MouseEvent = (document.defaultView as Window & typeof globalThis).MouseEvent;
		global.CustomEvent = (document.defaultView as Window & typeof globalThis).CustomEvent;
	});

	test('Should init from html', async () => {
		document.body.innerHTML = `
			<div data-page="signup-page">
				<h6 
					data-title="auth-service"
					class="main-card__title main-card--justify mdc-typography--headline6"
				>
					Or use the service
				</h6>				
				<div>
					<a href="www.auth-service.com" class="btn btn-light" data-button="auth-service-google" title="Google">
						<svg class="main-card-service-icon" viewBox="0 0 16 16"></svg>    
					</a>
				</div>		
				<div class="modal fade">
					<h5 class="modal-title"></h5>
					<iframe class="modal-body"></iframe>
				</div>
			</div>
		`;

		window.tr = locales[DEFAULT_LANGUAGE];

		await SignUpPage.instance.init(null, true);		

		const component = SignUpPage.instance['authService']	;
		
		expect(component).toBeTruthy();
		expect(component).toBeInstanceOf(AuthServiceComponent);

		expect(component?.['titleElem']).toBeTruthy();
		expect(component?.['titleElem']).toBeInstanceOf(HTMLElement);
		expect(component?.['titleElem']?.getAttribute('data-title')).toEqual('auth-service');
		expect(component?.['titleElem']?.textContent).toContain('Or use the service');		

		await SignUpPage.instance.load('ru', {
			fragment: '',
			match: [],
			options: {},
			query: {}
		}, false);

		expect(component?.['titleElem']?.textContent).toContain(window.tr('Or use the service'));
	});	
});
