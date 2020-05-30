const fs = require('fs');
const path = require('path');
const utils = require('util');
const { exec } = require('child_process');
const glob = require('glob');
const ora = require('ora');
const chalk = require('chalk');

const paths = require('./paths');

const PACKAGING_FOLDER = 'out';
const PACKAGING_PATH = path.resolve(__dirname, paths.electron, PACKAGING_FOLDER);

async function getAppName() {
  const pkg = JSON.parse(
    await utils.promisify(fs.readFile)(path.resolve(__dirname, paths.electron, 'package.json'), 'utf-8'),
  );
  return pkg.productName;
}

async function getPathPkgMonoRepo(names) {
  const pathPkgs = await utils.promisify(glob)(path.join(__dirname, paths.packages, `*/package.json`));
  let pkgs = await Promise.all(pathPkgs.map((p) => utils.promisify(fs.readFile)(p, 'utf-8')));
  pkgs = pkgs.map((p) => JSON.parse(p));
  return names.map((name) => {
    const index = pkgs.findIndex((p) => p.name === name);
    return pathPkgs[index];
  });
}

async function modifyPackage(pathPkg) {
  const pkg = JSON.parse(await utils.promisify(fs.readFile)(pathPkg, 'utf-8'));
  const monoRepoName = pkg.name.split('/')[0];
  const dependencies = Object.keys(pkg.dependencies || {});
  const monoRepoDeps = dependencies.filter((dep) => dep.includes(monoRepoName));
  if (!monoRepoDeps.length) {
    return;
  }
  const pathMonoRepoDeps = await getPathPkgMonoRepo(monoRepoDeps);
  await Promise.all(pathMonoRepoDeps.map(async (p, index) => {
    const pkgPath = path.dirname(p);
    await utils.promisify(exec)('npm install --only=prod', { cwd: pkgPath });
    await utils.promisify(exec)('npm build', { cwd: pkgPath });
    await utils.promisify(exec)('npm pack', { cwd: pkgPath });
    const tgz = (await utils.promisify(glob)(path.join(pkgPath, `*.tgz`)))[0];
    if (!tgz) {
      throw Error('Something went wrong building the package');
    }
    pkg.dependencies[monoRepoDeps[index]] = tgz;
    return;
  }));
  return utils.promisify(fs.writeFile)(pathPkg, JSON.stringify(pkg), 'utf-8')
}

module.exports = async function installDeps() {
  const spinner = ora('Installing dependencies').start();

  try {
    const existDistFolder = await utils.promisify(fs.exists)(PACKAGING_PATH);
    if (!existDistFolder) {
      throw Error('You must package app before');
    }

    const appName = await getAppName();
    const pkgs = await utils.promisify(glob)(path.join(PACKAGING_PATH, `${appName}*/**/package.json`));
    const pkg = pkgs[0];
    await modifyPackage(pkg);
    const pkgPath = path.dirname(pkg);
    await utils.promisify(exec)('npm install --only=prod', { cwd: pkgPath });
    spinner.succeed();
  } catch (error) {
    spinner.fail();
    console.error(chalk.bold.red(error));
    process.exit(1);
  }
};
