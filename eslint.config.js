import { defineConfig, globalIgnores } from "eslint/config";
import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import unusedImports from "eslint-plugin-unused-imports";
import sortClassMembers from "eslint-plugin-sort-class-members";
import _import from "eslint-plugin-import";
import tsParser from "@typescript-eslint/parser";
import parser from "@angular-eslint/template-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([globalIgnores(["projects/**/*"]), {
    files: ["**/*.ts"],

    extends: fixupConfigRules(compat.extends(
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@angular-eslint/recommended",
        "plugin:@angular-eslint/template/process-inline-templates",
        "plugin:import/warnings",
    )),

    plugins: {
        "@typescript-eslint": fixupPluginRules(typescriptEslint),
        "unused-imports": unusedImports,
        "sort-class-members": sortClassMembers,
        import: fixupPluginRules(_import),
    },

    languageOptions: {
        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "script",

        parserOptions: {
            project: ["./tsconfig.eslint.json"],
        },
    },

    rules: {
        "@angular-eslint/component-max-inline-declarations": "error",
        "@angular-eslint/component-selector": "error",
        "@angular-eslint/contextual-decorator": "error",
        "@angular-eslint/contextual-lifecycle": "error",
        "@angular-eslint/directive-class-suffix": "error",
        "@angular-eslint/directive-selector": "error",
        "@angular-eslint/no-attribute-decorator": "error",
        "@angular-eslint/no-conflicting-lifecycle": "error",
        "@angular-eslint/no-empty-lifecycle-method": "error",
        "@angular-eslint/no-forward-ref": "error",
        "@angular-eslint/no-input-prefix": "error",
        "@angular-eslint/no-input-rename": "error",
        "@angular-eslint/no-inputs-metadata-property": "error",
        "@angular-eslint/no-lifecycle-call": "error",
        "@angular-eslint/no-output-native": "error",
        "@angular-eslint/no-output-on-prefix": "error",
        "@angular-eslint/no-output-rename": "error",
        "@angular-eslint/no-outputs-metadata-property": "error",
        "@angular-eslint/no-pipe-impure": "error",
        "@angular-eslint/no-queries-metadata-property": "error",
        "@angular-eslint/pipe-prefix": "error",
        "@angular-eslint/prefer-output-readonly": "error",
        "@angular-eslint/relative-url-prefix": "error",
        "@angular-eslint/require-localize-metadata": "error",
        "@angular-eslint/sort-lifecycle-methods": "error",
        "@angular-eslint/use-component-selector": "error",
        "@angular-eslint/use-component-view-encapsulation": "error",
        "@angular-eslint/use-injectable-provided-in": "error",
        "@angular-eslint/use-lifecycle-interface": "error",
        "@angular-eslint/use-pipe-transform-interface": "error",
        "no-useless-constructor": "off",
        quotes: ["error", "single"],
        semi: ["error", "always"],
        "object-curly-spacing": ["error", "always"],

        "max-statements-per-line": ["warn", {
            max: 1,
        }],

        "no-nested-ternary": "error",
        "no-trailing-spaces": "error",
        "no-multi-spaces": "error",
        "no-unneeded-ternary": "error",
        "one-var-declaration-per-line": ["error", "always"],
        "operator-assignment": ["error", "always"],
        "operator-linebreak": ["error", "before"],
        "max-depth": ["warn", 2],

        "max-lines-per-function": ["warn", {
            max: 35,
            skipBlankLines: true,
            skipComments: true,
        }],

        "max-nested-callbacks": ["warn", 2],
        "max-params": ["warn", 3],

        complexity: ["warn", {
            max: 5,
        }],

        "comma-dangle": ["error", "never"],
        "max-lines": ["warn", 300],
        "no-else-return": "warn",

        "no-magic-numbers": ["warn", {
            detectObjects: false,
            enforceConst: true,
            ignore: [-1, 0, 1, 2, 10, 100],
            ignoreArrayIndexes: true,
        }],

        "@typescript-eslint/naming-convention": ["warn", {
            selector: "default",
            format: ["camelCase", "UPPER_CASE"],
            leadingUnderscore: "forbid",
        }, {
                selector: "typeLike",
                format: ["PascalCase"],
            }, {
                selector: "typeParameter",
                format: ["PascalCase"],
                prefix: ["T", "K"],
            }, {
                selector: "enumMember",
                format: ["UPPER_CASE"],
            }, {
                selector: ["variableLike"],
                types: ["boolean"],
                format: ["PascalCase"],
                prefix: ["can", "did", "has", "is", "must", "needs", "should", "will"],
            }],

        "arrow-parens": ["error", "as-needed"],
        "block-spacing": ["warn", "always"],
        curly: ["error", "all"],

        "no-multiple-empty-lines": ["error", {
            max: 1,
            maxEOF: 1,
        }],

        "no-unused-vars": "off",

        "@typescript-eslint/explicit-member-accessibility": ["warn", {
            accessibility: "no-public",

            overrides: {
                parameterProperties: "explicit",
            },
        }],

        "@typescript-eslint/explicit-function-return-type": "warn",
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/no-empty-function": "error",
        "@typescript-eslint/prefer-enum-initializers": "error",
        "@typescript-eslint/no-mixed-enums": "error",
        "@typescript-eslint/no-duplicate-enum-values": "error",

        "import/order": ["warn", {
            groups: ["builtin", "external", "internal", "type", "object", "unknown"],

            pathGroups: [{
                pattern: "*@angular/**",
                group: "builtin",
            }, {
                pattern: "{*rxjs*,*@ngx-translate/**}",
                group: "external",
            }, {
                pattern: "*@/services/**",
                group: "internal",
                position: "before",
            }, {
                pattern: "{*@/models/**,*@/models**,*@/constants/**,*@/constants**,*@/utils/**,*@/utils**}",
                group: "type",
            }],

            pathGroupsExcludedImportTypes: ["@angular", "rxjs", "@ngx-translate"],
            "newlines-between": "always",

            alphabetize: {
                order: "asc",
                caseInsensitive: true,
            },
        }],
    },
}, {
    files: ["**/*.html"],
    extends: fixupConfigRules(compat.extends("plugin:@angular-eslint/template/recommended")),

    languageOptions: {
        parser: parser,
    },

    rules: {
        "@angular-eslint/template/alt-text": "error",
        "@angular-eslint/template/attributes-order": "error",
        "@angular-eslint/template/banana-in-box": "error",
        "@angular-eslint/template/button-has-type": "error",
        "@angular-eslint/template/click-events-have-key-events": "error",
        "@angular-eslint/template/conditional-complexity": "error",
        "@angular-eslint/template/cyclomatic-complexity": "error",
        "@angular-eslint/template/elements-content": "error",
        "@angular-eslint/template/eqeqeq": "error",
        "@angular-eslint/template/i18n": "error",
        "@angular-eslint/template/interactive-supports-focus": "error",
        "@angular-eslint/template/label-has-associated-control": "error",
        "@angular-eslint/template/mouse-events-have-key-events": "error",
        "@angular-eslint/template/no-any": "error",
        "@angular-eslint/template/no-autofocus": "error",
        "@angular-eslint/template/no-call-expression": "error",
        "@angular-eslint/template/no-distracting-elements": "error",
        "@angular-eslint/template/no-duplicate-attributes": "error",
        "@angular-eslint/template/no-inline-styles": "error",
        "@angular-eslint/template/no-interpolation-in-attributes": "error",
        "@angular-eslint/template/no-negated-async": "error",
        "@angular-eslint/template/no-positive-tabindex": "error",
        "@angular-eslint/template/prefer-ngsrc": "error",
        "@angular-eslint/template/prefer-self-closing-tags": "error",
        "@angular-eslint/template/role-has-required-aria": "error",
        "@angular-eslint/template/table-scope": "error",
        "@angular-eslint/template/use-track-by-function": "error",
        "@angular-eslint/template/valid-aria": "error",
    },
}, {
    files: ["**/*.js"],

    languageOptions: {
        globals: {},
        ecmaVersion: "latest",
        sourceType: "module",

        parserOptions: {
            allowImportExportEverywhere: true,
        },
    },
}]);