import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  { files: ["**/*.jsx"], languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { files: ["**/*.tsx"], languageOptions: { parserOptions: { ecmaFeatures: { tsx: true } } } },
  {
    rules: {
      semi: "error",
      "prefer-const": "error"
    }
  },
  {
    ignores: ["node_modules/*"],
  }
];