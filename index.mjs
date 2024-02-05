import { cpSync, readFileSync, writeFileSync } from 'node:fs'
import prompts from 'prompts'

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

const packageInfo = JSON.parse(readFileSync('./templates/package.json', 'utf-8'))

packageInfo.name = name
packageInfo.description = description

cpSync('./templates', name, {
  recursive: true,
})

writeFileSync(`./${name}/package.json`, JSON.stringify(packageInfo, null, 2))
