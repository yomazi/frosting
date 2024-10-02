import js from "@eslint/js";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactRefreshPlugin from "eslint-plugin-react-refresh";
import prettierOrganizeImports from "prettier-plugin-organize-imports";

export default [
  // Base JavaScript configuration
  js.configs.recommended,

  // TypeScript configuration
  {
    files: ["*.ts", "*.tsx"],
    languageOptions: {
      parser: typescriptParser,
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,
    },
  },

  // React configuration
  {
    files: ["*.jsx", "*.tsx"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "react-refresh": reactRefreshPlugin,
    },
    rules: {
      "react-hooks/rules-of-hooks": "error", // Enforces the rules of Hooks
      "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
      "prettier/prettier": "error", // Runs Prettier as an ESLint rule
    },
    settings: {
      react: {
        version: "detect", // Automatically detect the React version
      },
    },
  },

  // Prettier integration and configuration
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierConfig.rules,
      "prettier/prettier": "error", // Enforce Prettier formatting rules
    },
  },

  // Prettier Plugin for Organizing Imports
  {
    plugins: {
      "prettier-plugin-organize-imports": prettierOrganizeImports,
    },
  },
];
