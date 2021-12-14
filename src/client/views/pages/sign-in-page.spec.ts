import { SignInPage } from "./sign-in-page";

describe('SignInPage test', () => {
  test('Should get single instance of SignInPage', () => {
    const instance = SignInPage.instance;

    expect(instance).toBeTruthy();
    expect(instance).toBeInstanceOf(SignInPage);
    expect(instance).toBe(SignInPage.instance);

    expect(instance['node']).toBeFalsy();
  });
});
