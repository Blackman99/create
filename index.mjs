#!/usr/bin/env zx

import { cpSync, readFileSync, writeFileSync } from 'node:fs'
import { echo, question } from 'zx'

const name = await question('Name of your project: ')

await echo(`name: ${name}`)

const description = await question('Description of your project: ')

const packageInfo = JSON.parse(readFileSync('./templates/package.json', 'utf-8'))

packageInfo.name = name
packageInfo.description = description

cpSync('./templates', name, {
  recursive: true,
})

writeFileSync(`./${name}/package.json`, JSON.stringify(packageInfo))
