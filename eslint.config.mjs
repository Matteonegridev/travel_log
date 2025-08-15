// eslint.config.mjs
import antfu from "@antfu/eslint-config";
import tailwind from "eslint-plugin-tailwindcss";
import vue from "eslint-plugin-vue";

import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  antfu(
    {
      type: "app",
      vue: true,
      typescript: true,
      formatters: true,
      stylistic: {
        indent: 2,
        semi: true,
        quotes: "double",
      },
      ignores: ["**/migrations/*"],
    },
    {
      rules: {
        "ts/no-redeclare": "off",
        "ts/consistent-type-definitions": ["error", "type"],
        "no-console": ["warn"],
        "antfu/no-top-level-await": ["off"],
        "node/prefer-global/process": ["off"],
        "node/no-process-env": ["error"],
        "perfectionist/sort-imports": ["error", { tsconfigRootDir: "." }],
        "unicorn/filename-case": [
          "error",
          {
            cases: { kebabCase: true, camelCase: true },
            ignore: ["README.md"],
          },
        ],
      },
    },

    ...vue.configs["flat/recommended"],
    ...tailwind.configs["flat/recommended"],
    {
      rules: {
        "tailwindcss/classnames-order": [
          "error",
          {
            callees: ["classnames, clsx, ctl, class"],
            removeDuplicates: true,
          },
        ],
        "tailwindcss/no-custom-classname": [
          "off",
          {
            callees: ["classnames, clsx, ctl, class"],
          },
        ],
      },
    },
    {
      rules: {
        "vue/multi-word-component-names": "off",
      },
    },
  ),
);
