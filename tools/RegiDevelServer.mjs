import subp from 'child_process'
import readline from 'readline'
import chalk from 'chalk'
import logger from 'electron-log'
import { stdin, stdout } from 'node:process'
import esbuild from 'esbuild'

const log = logger.scope('Regi-DevServer')
const rl = readline.createInterface(stdin, stdout)
const previewCmd = {
  cmd: 'node',
  args: ['server.cjs'],
}

const psParams = {
  cwd: './.build',
  maxBuffer: 2000 * 1024,
  detached: false,
  killSignal: 'SIGTERM',
  env: { ...process.env, FORCE_COLOR: '1' },
}

let previewProcess = {}

async function startPreview(cmds) {
  const ps = await subp.spawn(cmds.cmd, cmds.args, psParams)

  ps.stdout.on('data', data => process.stdout.write(data))
  ps.stderr.on('data', data => process.stderr.write(data))
  return ps
}

async function main() {
  let isCrashed = false
  const buildParams = {
    entryPoints: ['./src/server.js'],
    format: 'cjs',
    bundle: true,
    minify: false,
    outfile: './.build/server.cjs',
    platform: 'node',
    logLevel: 'info',
    target: 'node21',
    watch: {
      async onRebuild(error, result) {
        isCrashed = false
        log.info(`${chalk.bgYellowBright.black.bold('Reloading')} changes detected`)

        if (error) {
          isCrashed = true
          log.error(`${chalk.bgRedBright.bold('Error')} Build failed — ${error}`)
          await previewProcess.ps.kill('SIGTERM')
          if (!isCrashed) {
            await startPreview(previewCmd)
              .then(ps => {
                previewProcess.ps = ps
              })
              .catch(err => {
                log.error(`${chalk.bgRedBright.bold('Error')} ${err}`)
              })
          }
        } else {
          await previewProcess.ps.kill('SIGTERM')
          await startPreview(previewCmd)
            .then(ps => {
              previewProcess.ps = ps
            })
            .catch(err => {
              log.error(`${chalk.bgRedBright.bold('Error')} ${err}`)
            })
        }
      },
    },
  }

  await esbuild.build(buildParams).then(async () => {
    await startPreview(previewCmd)
      .then(ps => {
        previewProcess.ps = ps
      })
      .catch(err => {
        log.error(`${chalk.bgRedBright.bold('Error')} ${err}`)
      })

    process.on('exit', () => {
      previewProcess.ps.kill('SIGTERM')
      process.exit(0)
    })

    rl.on('line', async input => {
      if (input.match('^rs$')) {
        if (isCrashed) {
          log.error(`${chalk.bgRedBright.bold('Error')} Please fix errors before reloading`)
        } else {
          await previewProcess.ps.kill('SIGTERM')
          startPreview(previewCmd)
            .then(ps => {
              previewProcess.ps = ps
              log.info(`${chalk.bgGreenBright.black.bold('Restarted')} !`)
            })
            .catch(err => {
              log.error(`${chalk.bgRedBright.bold('Error')} ${err}`)
            })
        }
      }
    })

    log.info(`Regi-DevServer is ${chalk.green('watching')} !`)
  })
}

main()
