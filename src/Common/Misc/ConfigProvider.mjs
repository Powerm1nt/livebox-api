import fs from 'node:fs'
import os from 'node:os'
import chalk from 'chalk'
import logger from 'electron-log'

const log = logger.scope('ConfigProvider')

let instance = null
const popularDirs = ['./', '../', '../../', '../../../', 'dist/', 'public/']

const defaultConfig = {
  APP_HOST: os.hostname(),
  APP_API_PORT: 4244,
  APP_DEV: false,
  APP_LOG_LEVEL: 'debug',
}

function searchFiles(name) {
  for (const dir of popularDirs) {
    if (fs.existsSync(dir + name)) {
      return fs.readFileSync(dir + name)
    }
  }
}

const certKeys = {}

function fetchConfig() {
  const runningConfig = JSON.parse(searchFiles('env.json'))

  for (const key in defaultConfig) {
    // biome-ignore lint/suspicious/noPrototypeBuiltins: <explanation>
    if (!runningConfig.hasOwnProperty(key)) {
      log.warn(`ExternalConfig is missing key: ${chalk.white.bold(key)}, using default`)
      runningConfig[key] = defaultConfig[key]
    }
  }

  return runningConfig
}

class ConfigProvider {
  constructor() {
    const currentConfig = fetchConfig()
    if (currentConfig) {
      this.config = currentConfig
      // biome-ignore lint/correctness/noConstructorReturn: Needed for singleton
      return this.config
    }
    throw new Error('No config file found')
  }
}

function getConfig() {
  if (instance === null) {
    instance = new ConfigProvider()
  }

  return instance
}

export { certKeys }
export default getConfig()
