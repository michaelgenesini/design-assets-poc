const withPlugins = require('next-compose-plugins')
const withTM = require('next-transpile-modules')([
  '@prontopro/configuration',
  '@prontopro/primitives',
  '@prontopro/react',
  '@prontopro/ui-toolkit',
])()

module.exports = withPlugins([withTM], {
  env: {
    ENVIRONMENT: process.env.ENVIRONMENT || 'development',
  },
})
