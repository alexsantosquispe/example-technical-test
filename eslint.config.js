import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import pluginQuery from "@tanstack/eslint-plugin-query";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: { js, "@tanstack/query": pluginQuery },
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended-type-checked",
      "plugin:@typescript-eslint/stylistic-type-checked",
      "plugin:react/recommended",
      "plugin:react/jsx-runtime",
      "plugin:react-hooks/recommended"
    ]
  },
  {
    rules: {
      "@tanstack/query/exhaustive-deps": "error"
    }
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: { globals: globals.browser }
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  ...pluginQuery.configs["flat/recommended"]
]);
