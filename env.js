const z = require('zod')

const packageJSON = require('./package.json')
const path = require('path')
const APP_ENV = process.env.APP_ENV ?? 'development'
const envPath = path.resolve(__dirname, `.env.${APP_ENV}`)

require('dotenv').config({
  path: envPath,
})

const BUNDLE_ID = 'com.flexforge' // ios bundle id
const PACKAGE = 'com.flexforge' // android package name
const NAME = 'ReactTemplateCore' // app name
const SCHEME = 'reactTemplateCore' // app scheme
const SLUG = 'react-template-core' // app slug
/**
 * We declare a function withEnvSuffix that will add a suffix to the variable name based on the APP_ENV
 * Add a suffix to variable env based on APP_ENV
 * @param {string} name
 * @returns  {string}
 */

const withEnvSuffix = (name) => {
  return APP_ENV === 'production' ? name : `${name}.${APP_ENV}`
}

const client = z.object({
  APP_ENV: z.enum(['development', 'staging', 'production']),
  NAME: z.string(),
  SCHEME: z.string(),
  SLUG: z.string(),
  BUNDLE_ID: z.string(),
  PACKAGE: z.string(),
  VERSION: z.string(),

  VAR_NUMBER: z.number(),
  VAR_BOOL: z.boolean(),
})

const buildTime = z.object({
  SECRET_KEY: z.string(),
})

/**
 * @type {Record<keyof z.infer<typeof client> , unknown>}
 */
const _clientEnv = {
  APP_ENV,
  NAME: NAME,
  SCHEME: SCHEME,
  SLUG: SLUG,
  BUNDLE_ID: withEnvSuffix(BUNDLE_ID),
  PACKAGE: withEnvSuffix(PACKAGE),
  VERSION: packageJSON.version,

  VAR_NUMBER: Number(process.env.VAR_NUMBER),
  VAR_BOOL: process.env.VAR_BOOL === 'true',
}

/**
 * @type {Record<keyof z.infer<typeof buildTime> , unknown>}
 */
const _buildTimeEnv = {
  SECRET_KEY: process.env.SECRET_KEY,
}

const _env = {
  ..._clientEnv,
  ..._buildTimeEnv,
}

const merged = buildTime.merge(client)
const parsed = merged.safeParse(_env)

if (parsed.success === false) {
  console.error(
    '❌ Invalid environment variables:',
    parsed.error.flatten().fieldErrors,

    `\n❌ Missing variables in .env.${APP_ENV} file, Make sure all required variables are defined in the .env.${APP_ENV} file.`,
    `\n💡 Tip: If you recently updated the .env.${APP_ENV} file and the error still persists, try restarting the server with the -cc flag to clear the cache.`
  )
  throw new Error(
    'Invalid environment variables, Check terminal for more details '
  )
}

const Env = parsed.data
const ClientEnv = client.parse(_clientEnv)

module.exports = {
  Env,
  ClientEnv,
  withEnvSuffix,
}
