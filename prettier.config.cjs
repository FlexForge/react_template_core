/** @type {import('prettier').Config} */
module.exports = {
  endOfLine: 'lf',
  semi: false,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'es5',
  importOrder: [
    '^(react/(.*)$)|^(react$)',
    '^(react-(.*)$)',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@/app/(.*)$',
    '^@/core/(.*)$',
    '^@/db/(.*)$',
    '^@/features/(.*)$',
    '',
    '^[./]',
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
}
