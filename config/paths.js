const path = require('path');
const base = path.join(__dirname, '../');

const srcDir = path.join(base, 'src');
const buildDir = path.join(base, 'build');

module.exports = {
  srcDir,
  buildDir,
  publicDir: path.join(base, 'public'),
  appPackageJson: path.join(base, 'package.json'),
  nodeModulesDir: path.join(base, 'node_modules'),
  appEntry: path.join(srcDir, 'index.tsx'),
  appHtml: path.join(srcDir, 'index.html'),
  buildHtml: path.join(buildDir, 'index.html'),
};
