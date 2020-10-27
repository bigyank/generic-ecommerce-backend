module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
    },
    extends: [
        'airbnb-base',
        'plugin:node/recommended',
        'plugin:security/recommended',
        'prettier',
    ],
    plugins: ['security'],
    parserOptions: {
        ecmaVersion: 12,
    },
    rules: {
        'no-console': 'off',
        'no-process-exit': 'off',
    },
};
