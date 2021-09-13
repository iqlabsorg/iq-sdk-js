/** @type {import('typedoc').TypeDocOptionMap} */
module.exports = {
  name: 'IQ Protocol JS SDK',
  excludePrivate: true,
  excludeExternals: true,
  readme: 'README.md',
  exclude: [
    '**/node_modules/**',
    '**/*.spec.ts',
    '**/*.test.ts',
  ],
};
