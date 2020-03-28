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
  const pkg = JSON.parse(await utils.promisify(fs.readFile)(path.resolve(__dirname, paths.electron, 'package.json'), 'utf-8'));
  return pkg.productName;
}

module.exports = async function installDeps() {
  const spinner = ora('Installing dependencies').start();
  const existDistFolder = await utils.promisify(fs.exists)(PACKAGING_PATH);
  if (!existDistFolder) {
    spinner.stop();
    console.error(chalk.bold.red('You must package app before'));
    process.exit(1);
  }
  const appName = await getAppName();
  const pkgs = await utils.promisify(glob)(path.join(PACKAGING_PATH, `${appName}*/**/package.json`));
  const pkg = pkgs[0];
  const pkgPath = path.dirname(pkg);
  await utils.promisify(exec)('npm install --only=prod', { cwd: pkgPath });
  spinner.succeed();
};
