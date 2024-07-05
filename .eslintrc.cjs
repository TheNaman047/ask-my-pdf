module.exports = {
  extends: [
    "mantine",
    "plugin:@next/next/recommended",
    "plugin:jest/recommended",
  ],
  overrides: [
    {
      files: ["**/?(*.)+(spec|test).[jt]s?(x)"],
      extends: ["plugin:testing-library/react"],
    },
  ],
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "import/extensions": "off",
    "@typescript-eslint/no-explicit-any": "off",
  },
};
