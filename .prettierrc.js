// https://prettier.io/docs/en/options.html
/** @type {import('prettier').RequiredOptions} */
module.exports = {
  trailingComma: "es5",
  bracketSpacing: true,
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  arrowParens: "always",
  importOrder: [
    "^server-only$",
    "",
    "^react$",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "#(.*)$",
    "",
    "^@service/(.*)$",
    "",
    "^~/lib/(.*)$",
    "^~/((?!components|lib).*)$",
    "^~/components/(.*)$",
    "",
    "^[./]",
  ],
};
