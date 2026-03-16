import { getPayload } from 'payload'
// NOTE: import the config from the build output if needed, or ts-node
import config from '../src/payload.config.ts'

async function init() {
  await getPayload({ config })
  console.log('Payload initialized')
  process.exit(0)
}
init()
