import bodyParser from 'body-parser'
import chalk from 'chalk'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import logger from 'electron-log'
import env from './Common/Misc/ConfigProvider.mjs'
import express from 'express'
import errorHandler from './Common/Middlewares/ErrorHandler'
import { name, version } from '../package.json'
import { statusService } from './Services/StatusService'
import { deviceService } from './Services/DeviceService'
import { firewallService } from './Services/FirewallService'
import { userService } from './Services/UserService'

/*///////////////////////////////////////////////////////////////////////////////////////////
// ⢀⡴⠑⡄⠀⠀⠀⠀⠀⠀⠀⣀⣀⣤⣤⣤⣀           *     *        *         *     *   *    *
// ⠸⡇⠀⠿⡀⠀⠀⠀⣀⡴⢿⣿⣿⣿⣿⣿⣿⣿⣷⣦⡀         *      *             *       *            *
// ⠀⠀⠀⠀⠑⢄⣠⠾⠁⣀⣄⡈⠙⣿⣿⣿⣿⣿⣿⣿⣿⣆         *              *          *        *           *
// ⠀⠀⠀⠀⢀⡀⠁⠀⠀⠈⠙⠛⠂⠈⣿⣿⣿⣿⣿⠿⡿⢿⣆       *       *       *                        *
// ⠀⠀⠀⢀⡾⣁⣀⠀⠴⠂⠙⣗⡀⠀⢻⣿⣿⠭⢤⣴⣦⣤⣹⠀⠀⠀⢀⢴⣶⣆             * *         *               *
// ⠀⠀⢀⣾⣿⣿⣿⣷⣮⣽⣾⣿⣥⣴⣿⣿⡿⢂⠔⢚⡿⢿⣿⣦⣴⣾⠸⣼⡿
// ⠀⢀⡞⠁⠙⠻⠿⠟⠉⠀⠛⢹⣿⣿⣿⣿⣿⣌⢤⣼⣿⣾⣿⡟⠉    ,-------------------------------------------.    * 
// ⠀⣾⣷⣶⠇⠀⠀⣤⣄⣀⡀⠈⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇    /       *                 *       *           \      *
// ⠀⠉⠈⠉⠀⠀⢦⡈⢻⣽⣿⣿⣶⣶⣶⣶⣤⣽⡹⣿⣿⣿⣿⡇   <   Put a star on GitLab, else imma eat ya!    |   *
// ⠀⠀⠀⠀⠀⠀⠀⠉⠲⣽⣿⣷⣶⣮⣭⣽⣿⣿⣷⣜⣿⣿⣿⡇    \       *          *            *             /
// ⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣷⣶⣮⣭⣽⣿⣿⣿⣿⣿⣿⣿      `-------------------------------------------'
// ⠀⠀⠀⠀⠀⠀⣀⣀⣈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠇
// ⠀⠀⠀⠀⠀⠀⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃    *        *          *       *        *        *     *
// ⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠁     *     *     *     *           *      *          *
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠻⠿⠿⠿⠿⠛⠉     *         * *         *    *     *                 *
/*//////////////////////////////////////////////////////////////////////////////////////////

// Setup Logging
const log = logger.scope('LiveboxAPI')
logger.transports.console.level = env.APP_LOG_LEVEL

const app = express()
const port = env.APP_API_PORT
app.disable('x-powered-by')

// Auth Middleware
app.use((req, res, next) => {
    if (req.headers.authorization !== env.APP_API_KEY) {
        res.status(401).json({
            error: 'Unauthorized',
        })
    } else {
        next()
    }
})

app.use((req, res, next) => {
    res.header('Server', `${name} ${version}`)
    res.header('Access-Control-Allow-Headers', '*')
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  
    log.verbose(
      `${chalk.bgGreenBright.black.bold(req.method)} ${req.url} (${chalk.bold(ip)} - ${chalk.grey(
        req.headers['user-agent'],
      )})`,
    )
    next()
})

// CORS
app.use(cors())

// Cookie-parser
app.use(cookieParser())

// Express.js JSON
app.use(express.json())

// Routeurs //

// Livebox Status
app.use('/status', statusService)

// Device Service
app.use('/devices', deviceService)

// Firewall Service
app.use('/firewall', firewallService)

// Users Service
app.use('/users', userService)

////////////////

// BodyParser::Json
app.use(bodyParser.json())

// Error Handler
app.use(errorHandler)

// Start the Server
app.listen(port, async () => {
    log.info(`Listening on port ${port}`)
})