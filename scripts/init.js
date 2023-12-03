#! /usr/bin/env node

//@ts-check

const { spawnSync } = require('child_process');
const { createInterface } = require('node:readline/promises');
const { stdin, stdout } = require('process');

const fs = require('fs');
const path = require('path');

const rootPath = __dirname;

const fromComponentFolderPath = path.join(rootPath, '..', 'src/components');
const fromConfigFolderPath = path.join(rootPath, '..');
const toRootPath = process.env.PWD ?? '';

spawnSync('pnpm', ['add', '@ark-ui/react@latest'], { stdio: 'inherit' });
spawnSync('pnpm', ['add', 'lucide-react@latest'], { stdio: 'inherit' });
spawnSync('pnpm', ['add', '@pandacss/dev@latest', '-D'], { stdio: 'inherit' });

function colorRed(string) {
  return `\x1b[31m ${string}\x1b[0m`;
}
function colorGreen(string) {
  return `\x1b[32m ${string}\x1b[0m`;
}

(async function () {
  const rl = createInterface({ input: stdin, output: stdout });
  const input = await rl.question('Input folder name[./src/components/ui]:');
  const folderPath = input || './src/components/ui';
  console.log({ folderPath });
  rl.close();

  try {
    fs.cpSync(fromComponentFolderPath, path.join(toRootPath, folderPath), {
      recursive: true,
      errorOnExist: true,
      force: false,
      filter: (source) => {
        if (source.includes('.stories.tsx') || source.includes('index.ts')) {
          return false;
        }
        return true;
      },
    });
    fs.cpSync(path.join(fromConfigFolderPath, 'panda.config.ts'), path.join(toRootPath, 'panda.config.ts'), {
      errorOnExist: true,
      force: false,
    });
    fs.cpSync(path.join(fromConfigFolderPath, 'postcss.config.cjs'), path.join(toRootPath, 'postcss.config.cjs'), {
      errorOnExist: true,
      force: false,
    });
  } catch (e) {
    console.error(colorRed(e.message));
  }
})();
