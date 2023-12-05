#! /usr/bin/env node

//@ts-check

const { spawnSync } = require('child_process');
const { createInterface } = require('node:readline/promises');
const { stdin, stdout } = require('process');

const fs = require('fs');
const path = require('path');

const opt = process.argv[2];

const rootPath = __dirname;

const fromComponentFolderPath = path.join(rootPath, '..', 'src/components');
const fromHooksFolderPath = path.join(rootPath, '..', 'src/hooks');
const fromLibFolderPath = path.join(rootPath, '..', 'src/lib');
const fromConfigFolderPath = path.join(rootPath, '..');
const toRootPath = process.env.PWD ?? '';

function colorRed(string) {
  return `\x1b[31m ${string}\x1b[0m`;
}
function colorGreen(string) {
  return `\x1b[32m ${string}\x1b[0m`;
}

async function run() {
  const rl = createInterface({ input: stdin, output: stdout });

  let componentFolderPath = './src/components/ui';
  let hooksFolderPath = './src/hooks';
  let libFolderPath = './src/lib';
  let shouldInstall = true;
  let shouldAddScripts = true;

  if (opt === '-y') {
  } else {
    componentFolderPath = (await rl.question('Input folder name [./src/components/ui]:')) || componentFolderPath;
    hooksFolderPath = (await rl.question('Input hooks folder name [./src/hooks]:')) || hooksFolderPath;
    libFolderPath = (await rl.question('Input lib folder name [./src/lib]:')) || libFolderPath;
    shouldInstall = (await rl.question('Install dependencies? [y/n]:')) === 'n' ? false : shouldInstall;
    shouldAddScripts = (await rl.question('Add scripts to package.json? [y/n]:')) === 'n' ? false : shouldAddScripts;
  }
  rl.close();

  if (shouldInstall) {
    spawnSync('pnpm', ['add', '@ark-ui/react@latest'], { stdio: 'inherit' });
    spawnSync('pnpm', ['add', 'lucide-react@latest'], { stdio: 'inherit' });
    spawnSync('pnpm', ['add', '@pandacss/dev@latest', '-D'], { stdio: 'inherit' });
    console.log(colorGreen('Dependencies installed'));
  }
  if(shouldAddScripts) {
    addScripts();
    console.log(colorGreen('Package.json Scripts added'));
  }

  try {
    copyComponents(path.join(toRootPath, componentFolderPath));
    console.log(colorGreen('Components copied'));
    copyHooks(path.join(toRootPath, hooksFolderPath));
    console.log(colorGreen('Hooks copied'));
    copyLibs(path.join(toRootPath, libFolderPath));
    console.log(colorGreen('Libs copied'));
    copyConfigs(toRootPath);
    console.log(colorGreen('Configs copied'));
  } catch (e) {
    console.error(colorRed(e.message));
  }
}

function copyComponents(toPath) {
  const components = [];
  fs.readdirSync(fromComponentFolderPath).forEach((v) => {
    if (v !== 'index.ts') {
      components.push(v.replace('.ts', ''));
    }
  });
  fs.cpSync(fromComponentFolderPath, toPath, {
    recursive: true,
    errorOnExist: true,
    force: false,
    filter: (source) => {
      if (source.includes('.stories.tsx') || source.includes('index.ts')) return false;
      return true;
    },
  });
  components.forEach((component) => {
    fs.appendFileSync(
      path.join(toPath, './index.ts'),
      `export { default as ${component} } from './${component}/${component}';\n`,
    );
  });
}

function copyHooks(toPath) {
  const hooks = [];
  fs.readdirSync(fromHooksFolderPath).forEach((v) => {
    if (v !== 'index.ts') {
      hooks.push(v.replace(/\.(ts|tsx)$/gm, ''));
    }
  });
  fs.cpSync(fromHooksFolderPath, toPath, {
    recursive: true,
    errorOnExist: true,
    force: false,
    filter: (source) => {
      if (source.includes('index.ts')) return false;
      return true;
    },
  });
  hooks.forEach((hook) => {
    fs.appendFileSync(path.join(toPath, 'index.ts'), `export { default as ${hook} } from './${hook}';\n`);
  });
}

function copyLibs(toPath) {
  const libs = [];
  fs.readdirSync(fromLibFolderPath).forEach((v) => {
    if (v !== 'index.ts') {
      libs.push(v.replace(/\.(ts|tsx)$/gm, ''));
    }
  });
  fs.cpSync(fromLibFolderPath, toPath, {
    recursive: true,
    errorOnExist: true,
    force: false,
    filter: (source) => {
      if (source.includes('index.ts')) return false;
      return true;
    },
  });
  libs.forEach((lib) => {
    fs.appendFileSync(path.join(toPath, 'index.ts'), `export * from './${lib}';\n`);
  });
}

function copyConfigs(toPath) {
  fs.cpSync(path.join(fromConfigFolderPath, 'panda.config.ts'), path.join(toPath, 'panda.config.ts'), {
    errorOnExist: true,
    force: false,
  });
  fs.cpSync(path.join(fromConfigFolderPath, 'postcss.config.cjs'), path.join(toPath, 'postcss.config.cjs'), {
    errorOnExist: true,
    force: false,
  });
}

function addScripts() {
  const packageJsonPath = path.join(toRootPath, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, { encoding: 'utf-8' }));
  let scripts = packageJson.scripts;
  if (scripts['prepare']) {
    console.log(colorRed('prepare script already exists'));
    process.exit(1);
  }
  if (scripts['check']) {
    console.log(colorRed('check script already exists'));
    process.exit(1);
  }
  if (scripts['type']) {
    console.log(colorRed('type script already exists'));
    process.exit(1);
  }
  if (scripts['lint:fix']) {
    console.log(colorRed('lint:fix script already exists'));
    process.exit(1);
  }
  if (scripts['lint:format']) {
    console.log(colorRed('lint:format script already exists'));
    process.exit(1);
  }
  scripts['prepare'] = 'panda build';
  scripts['check'] = 'panda check';
  scripts['type'] = 'panda type';
  scripts['lint:fix'] = 'panda lint:fix';
  scripts['lint:format'] = 'panda lint:format';

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

run();
