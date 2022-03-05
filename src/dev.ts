import { getFunctionMap, start, lambdaFrameworkMapper } from '@exobase/local'
import { v4 as uuid } from 'uuid'
import path from 'path'
import fs from 'fs'
import cmd from 'cmdish'
import { Server } from 'http'

const ROOT_DIR = path.join(__dirname, '..')
const SOURCE_DIR = path.join(__dirname, '../src')
let server: KillableServer = null

/**
 * Not your typical exobase dev.ts script. Get the
 * function map once in the beginning cus its slow
 * then watch the src files for changes, run the
 * build again, re-import the built files, kill the
 * old server, and start a new one at the same address.
 */

const functions = getFunctionMap({
  moduleDirectoryPath: path.join(__dirname, './modules'),
  extensions: ['.ts', '.js']
})

const run = () => start({
  port: process.env.PORT,
  framework: lambdaFrameworkMapper,
  functions: functions.map(f => ({ ...f, func: require(f.paths.import).default }))
}, p => {
  console.log(`API running at http://localhost:${p}`)
}).then(s => {
  server = killable(s)
})

run()

fs.watch(SOURCE_DIR, { recursive: true }, async () => {
  await cmd('yarn build', { cwd: ROOT_DIR })
  await new Promise(res => server.kill(res))
  await run()
})

type KillableServer = Server & {
  kill?: (cb: (...args: any[]) => void) => void
}

function killable(server: KillableServer) {
  const sockets = Hash<{ destroy: () => void }>()
  server.on('connection', socket => {
    const id = sockets.add(socket)
    socket.once('close', () => sockets.remove(id))
  })
  server.kill = cb => {
    server.close()
    for (const socket of sockets.list()) socket.destroy()
    cb()
  }
  return server
}

const Hash = <T>() => {
  const dict: Record<string, T> = {}
  return {
    add: (item: T): string => {
      const id = uuid()
      dict[id] = item
      return id
    },
    remove: (id: string) => {
      delete dict[id]
    },
    list: (): T[] => {
      return Object.values(dict)
    }
  }
}
