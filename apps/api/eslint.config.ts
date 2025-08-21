import rocketseat from "@rocketseat/eslint-config/node";

export default [
  {
    ignores: ["node_modules", "dist", "build"],
  },
  {
    ...rocketseat,
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      ...rocketseat.rules,
      "no-useless-constructor": "off",
    },
  },
];
