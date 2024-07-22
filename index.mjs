import { cpSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import prompts from 'prompts'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const questions = [
  {
    type: 'text',
    name: 'name',
    message: 'The name of your project',
  },
  {
    type: 'text',
    name: 'description',
    message: 'The description of your project',
  },
]

const { name, description } = await prompts(questions)

const packageInfo = JSON.parse(readFileSync(resolve(__dirname, './templates/package.json'), 'utf-8'))

packageInfo.name = name
packageInfo.description = description

cpSync(resolve(__dirname, './templates'), name, {
  recursive: true,
})

writeFileSync(`./${name}/package.json`, `${JSON.stringify(packageInfo, null, 2)}\n`)
