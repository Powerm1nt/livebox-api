import logger from 'electron-log'
import env from '../Misc/ConfigProvider.mjs'

// Setup Logging
const log = logger.scope('ErrorReporter')
logger.transports.console.level = env.APP_LOG_LEVEL

export const errorHandler = (err, req, res, next) => {
  res.setHeader('Content-Type', 'application/json')
  log.error(err)

  const statusCode = err.statusCode || 500
  const message = err.message || 'An error occurred'

  return res.status(statusCode).json({ error: message, ok: 0 })
}

export default errorHandler
