import globals from "globals";
import tsParser from "@typescript-eslint/parser";

export const nestJsConfig = [
  // Ignorar pastas comuns de build
  {
    ignores: ["node_modules", "dist", "build"],
  },

  // Configuração base para arquivos TypeScript
  {
    files: ["**/*.ts"],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2024,
        sourceType: "module",
        project: "./tsconfig.json", // necessário para decorators
      },
      globals: {
        ...globals.node,
      },
    },

    rules: {
      // regras básicas
      "no-useless-constructor": "off",
      "eqeqeq": ["error", "always"],
      "curly": ["error", "all"],
      "semi": ["error", "always"],
      "quotes": ["error", "double", { avoidEscape: true }],
    },
  },
];