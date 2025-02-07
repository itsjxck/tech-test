// https://prettier.io/docs/en/options.html
/** @type {import('prettier').RequiredOptions} */
module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  ...require("../../.prettierrc.js"),
  tailwindConfig: "./tailwind.config.ts",
  tailwindFunctions: ["cn", "clsx", "cva"],
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
};
