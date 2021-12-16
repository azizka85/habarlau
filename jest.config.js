module.exports = {
  transform: {
    "\\.[jt]sx?$": "babel-jest",
    "\\.hbs$": "./src/compiler/jest-handlebars-transform.js"
  }
}
