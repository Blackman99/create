import { $ } from 'zx'
import { cwd } from 'node:process'

$.cwd = cwd()

const createChangeset = async () => {
  const changesetRes = $`npx changeset`
  changesetRes.stdin.write('\n')
  const listener = () => {
    changesetRes.stdin.write('chore: update deps\n')
  }
  changesetRes.stdout.on('data', listener)
  await changesetRes
}

const reinstallPackageAndCreateGitCommit = async () => {
  await $`pnpm i`
  await $`git config user.name "Dongsheng Zhao"`
  await $`git config user.email "1197160272@qq.com"`
  await $`git add -A`
  await $`git commit -a -m "chore:update deps"`
  await $`git push`
}

const gitStatusLines = (await $`git status`).toString().split('\n')

if (
  gitStatusLines.some(line => line.startsWith('Untracked files:') 
    || line.startsWith('Changes not staged for commit:' 
    || line.startsWith('Changes to be committed:')))
) {
  await createChangeset()
  await reinstallPackageAndCreateGitCommit()
}
