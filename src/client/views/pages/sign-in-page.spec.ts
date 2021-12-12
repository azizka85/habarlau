import { SignInPage } from "./sign-in-page";

describe('SignInPage test', () => {
  test('Should get single instance of SignInPage', () => {
    expect(SignInPage.instance).toBeTruthy();
    expect(SignInPage.instance).toBeInstanceOf(SignInPage);    
    expect(SignInPage.instance).toBe(SignInPage['page']);
  });
});
