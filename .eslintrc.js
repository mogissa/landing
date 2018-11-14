module.exports = {
  extends: ['airbnb', 'react-app', 'prettier'],
  plugins: ['react', 'jsx-a11y', 'import'],
  rules: {
    'no-param-reassign': 'off',
    'jsx-a11y/href-no-hash': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'prefer-destructuring': 'off',
    'react/jsx-filename-extension': 'off',
    'react/require-default-props': 'off',
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  globals: {
    $: true,
    _: true,
    magnificPopup: true,
  },
};
