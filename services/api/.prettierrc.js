// https://prettier.io/docs/en/options.html
/** @type {import('prettier').RequiredOptions} */
module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  ...require("../../.prettierrc.js"),
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
};
