module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ["eslint:recommended", "eslint-config-prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
  },
};
