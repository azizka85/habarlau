import { SignUpPage } from "./sign-up-page";

describe('SignUpPage test', () => {
  test('Should get single instance of SignUpPage', () => {
    expect(SignUpPage.instance).toBeTruthy();
    expect(SignUpPage.instance).toBeInstanceOf(SignUpPage);    
    expect(SignUpPage.instance).toBe(SignUpPage['page']);
  });
});
