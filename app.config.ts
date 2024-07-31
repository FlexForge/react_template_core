import type { ConfigContext, ExpoConfig } from '@expo/config'

import { ClientEnv, Env } from './env'

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: Env.NAME,
  description: `${Env.NAME} Mobile App`,
  owner: Env.NAME,
  scheme: Env.SCHEME,
  slug: Env.SLUG,
  version: Env.VERSION.toString(),
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'cover',
    backgroundColor: '#2E3C4B',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: Env.BUNDLE_ID,
  },
  experiments: {
    typedRoutes: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#2E3C4B',
    },
    package: Env.PACKAGE,
  },
  web: {
    favicon: './assets/favicon.png',
    bundler: 'metro',
  },
  plugins: [
    'expo-router',
    [
      'app-icon-badge',
      {
        enabled: Env.APP_ENV !== 'production',
        badges: [
          {
            text: Env.APP_ENV,
            type: 'banner',
            color: 'white',
          },
          {
            text: Env.VERSION.toString(),
            type: 'ribbon',
            color: 'white',
          },
        ],
      },
    ],
  ],
  extra: {
    ...ClientEnv,
  },
})
