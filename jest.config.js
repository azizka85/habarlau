module.exports = {
  transform: {
    "\\.[jt]sx?$": "./src/compiler/jest-typescript-transform.js",
    "\\.hbs$": "./src/compiler/jest-handlebars-transform.js"
  }
}
