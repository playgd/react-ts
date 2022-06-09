import { spawn } from 'child_process'
import pkg from '../../package.json'

const dependencies = Object.keys(pkg.dependencies)

const add = (args: string[] = []) => {
  return spawn('yarn', ['add', '--exact'].concat(args), { stdio: 'inherit' })
}

add(dependencies).on('close', () => {
  add()
    .on('close', (code) => process.exit(Number(code)))
})
