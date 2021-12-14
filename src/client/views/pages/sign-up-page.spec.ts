import { SignUpPage } from "./sign-up-page";

describe('SignUpPage test', () => {
  test('Should get single instance of SignUpPage', () => {
    const instance = SignUpPage.instance;

    expect(instance).toBeTruthy();
    expect(instance).toBeInstanceOf(SignUpPage);
    expect(instance).toBe(SignUpPage.instance);

    expect(instance['node']).toBeFalsy();
  });
});
