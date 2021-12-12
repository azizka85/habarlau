import { HomePage } from "./home-page";

describe('HomePage test', () => {
  test('Should get single instance of HomePage', () => {
    expect(HomePage.instance).toBeTruthy();
    expect(HomePage.instance).toBeInstanceOf(HomePage);    
    expect(HomePage.instance).toBe(HomePage['page']);
  });
});
