module.exports = {
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:import/typescript',
    'plugin:css-import-order/recommended',
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
      node: {},
    },
    polyfills: ['Promise', 'URL'],
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    'react',
    'babel',
    '@typescript-eslint',
    'react-hooks',
    'react-refresh',
    'css-import-order',
  ],
  // https://github.com/typescript-eslint/typescript-eslint/issues/46#issuecomment-470486034
  overrides: [{
    files: ['*.ts', '*.tsx'],
    rules: {
      '@typescript-eslint/no-unused-vars': [2, {
        args: 'none',
      }],
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': 2,
      '@typescript-eslint/consistent-type-imports': [2, {
        disallowTypeAnnotations: false,
      }],
      'react/jsx-tag-spacing': [2, {
        closingSlash: 'never',
        beforeSelfClosing: 'always',
        afterOpening: 'never',
        beforeClosing: 'never',
      }],
    },
  }],
  rules: {
    semi: [2, 'never'],
    indent: 'off',
    'no-trailing-spaces': [2],
    quotes: [2, 'single'],
    // 统一单引号
    'space-infix-ops': [2, {
      int32Hint: false,
    }],
    // 二元操作符（比如=, |, +）前后有空格
    'space-before-function-paren': [2, {
      anonymous: 'always',
      // 匿名函数前要有空格
      named: 'never',
      // 具名函数名前不允许有空格
      asyncArrow: 'always', // async箭头函数前要有空格
    }],

    'keyword-spacing': [2, {
      before: true,
      after: true,
    }],
    'comma-spacing': [2, {
      before: false,
      // 逗号前无空格
      after: true, // 逗号后有空格
    }],

    'max-len': [2, {
      code: 144,
      // 每行最长144个字符
      ignoreStrings: true, // 忽略字符串长度
    }],

    'block-spacing': [2, 'always'],
    'key-spacing': [2, {
      beforeColon: false,
      // 对象键名:前必须无空格，e.g. {key :1} => {key: 1}
      afterColon: true, // 对象键名:后必须接空格，e.g. {key:1} => {key: 1}
    }],

    'arrow-spacing': [2, {
      before: true,
      after: true,
    }],
    '@typescript-eslint/indent': [1, 2, {
      SwitchCase: 1,
      ignoredNodes: ['JSXElement *', 'JSXElement'],
    }],
    'react/jsx-indent-props': [1, 2],
    'react/jsx-one-expression-per-line': 0,
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 0,
    'react/jsx-curly-spacing': [2, 'never'],
    // JSX{}内部是否有空格
    'react/forbid-prop-types': 0,
    'react/jsx-boolean-value': [2, 'never'],
    // 属性值为true时省略
    'react/jsx-wrap-multilines': ['error', {
      declaration: false,
      assignment: false,
    }],
    'react/jsx-filename-extension': 0,
    'react/state-in-constructor': 0,
    'react/jsx-props-no-spreading': 0,
    'react/destructuring-assignment': 0,
    // TODO: remove later
    'react/require-default-props': 0,
    'react/sort-comp': 0,
    'react/display-name': 0,
    'react/static-property-placement': 0,
    'react/jsx-no-bind': 0,
    // Should not check test file
    'react/no-find-dom-node': 0,
    'react/no-unused-prop-types': 0,
    'react/default-props-match-prop-types': 0,
    'react-hooks/rules-of-hooks': 2,
    // Checks rules of Hooks
    'react/function-component-definition': 0,
    'react/no-unused-class-component-methods': 0,
    'react/no-array-index-key': 0,
    'react-refresh/only-export-components': 'warn',
    'jsx-a11y/click-events-have-key-events': 0,
    // 并不是所有点击事件都要绑定key事件

    'import/no-named-as-default': 0,
    'import/extensions': 0,
    'import/no-cycle': 0,
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': [0],
    'import/prefer-default-export': 1,
    'import/order': ['error', {
      groups: ['builtin', 'external', 'internal', 'sibling', 'index', 'object', 'type'],
      pathGroups: [{
        pattern: 'react',
        group: 'external',
        position: 'before',
      }, {
        pattern: '*.css',
        group: 'type',
        position: 'after',
      }],
      pathGroupsExcludedImportTypes: ['react'],
      'newlines-between': 'always',
      alphabetize: {
        order: 'asc',
        caseInsensitive: true,
      },
    }],
    'comma-dangle': ['error', 'always-multiline'],
    'consistent-return': 0,
    // TODO: remove later
    'no-param-reassign': 0,
    // TODO: remove later
    'no-underscore-dangle': 0,
    'no-plusplus': 0,
    // https://eslint.org/docs/rules/no-continue
    // labeledLoop is conflicted with `eslint . --fix`
    'no-continue': 0,
    // ban this for Number.isNaN needs polyfill
    'no-restricted-globals': 0,
    'max-classes-per-file': 0,
    // https://github.com/typescript-eslint/typescript-eslint/issues/2540#issuecomment-692866111
    'no-use-before-define': 0,
    '@typescript-eslint/no-use-before-define': [0],
    'no-shadow': 0,
    'object-curly-spacing': [2, 'always'],
    // {}内要有空格
    'no-multi-spaces': [2],
    // 不要多个空格
    '@typescript-eslint/no-shadow': [2, {
      ignoreTypeValueShadow: true,
    }],
    // https://github.com/typescript-eslint/typescript-eslint/issues/2528#issuecomment-689369395
    'no-undef': 1,
  },
  globals: {
    gtag: true,
  },
}
