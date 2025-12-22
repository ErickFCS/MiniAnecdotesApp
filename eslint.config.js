import globals from "globals";
import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";

export default [
    { ignores: ["dist", "Frontend", "ReactQueryFrontend", "ReactReduxFrontend"] },
    {
        files: ["**/*.js"],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.node,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module"
            }
        },
        plugins: {
            "@stylistic": stylistic
        },
        rules: {
            ...js.configs.recommended.rules,
            "@stylistic/indent": ["error", 4],
            "@stylistic/semi": ["error", "always"],
            "@stylistic/comma-dangle": ["error", "never"],
            "@stylistic/comma-spacing": ["error", { "after": true }],
            "@stylistic/jsx-quotes": ["error", "prefer-double"],
            "@stylistic/quotes": ["error", "double", {
                "allowTemplateLiterals": "always"
            }],
            "eqeqeq": ["error", "always"],
            "@stylistic/object-curly-spacing": ["error", "always"],
            "@stylistic/arrow-spacing": ["error", { "before": true, "after": true }]
        }
    }
];
