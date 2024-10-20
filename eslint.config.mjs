import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs"
    }
  },
  {
    languageOptions: {
      globals: globals.node
    }
  },
  pluginJs.configs.recommended,
  {
    ignores: [
      "node_modules/",
      "test/"
    ]
  },
  {
    rules: {
      "indent": ["error", 2]  // Enforce 2-space indentation
    },
    ignores: [
      "node_modules/",
      "test/"
    ]
  }
];