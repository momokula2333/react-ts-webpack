'use strict';

process.env.NODE_ENV = 'production';

const chalk = require('chalk');
const fs = require('fs-extra');
const webpack = require('webpack');
const config = require('../config/webpack.config.prod');
const paths = require('../config/paths');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const FileSizeReporter = require('react-dev-utils/FileSizeReporter');
const measureFileSizesBeforeBuild = FileSizeReporter.measureFileSizesBeforeBuild;
const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild;

// Print out errors
function printErrors(summary, errors) {
  console.log(chalk.red(summary));
  console.log();
  errors.forEach(err => {
    console.log(err.message || err);
    console.log();
  });
}

// First, read the current file sizes in build directory.
// This lets us display how much they changed later.
measureFileSizesBeforeBuild(paths.buildDir).then(previousFileSizes => {
  // Remove all content but keep the directory so that
  // if you're in it, you don't end up in Trash
  fs.emptyDirSync(paths.buildDir);

  // Start the webpack build
  build(previousFileSizes);

  // Merge with the public folder
  // copyPublicFolder();
});

function build(previousFileSizes) {
  const start = Date.now();
  webpack(config).run((err, stats) => {
    'use strict';
    if (err) {
      printErrors('failed to compile.', [err]);
      process.exit(1);
    }

    if (stats.compilation.errors.length) {
      printErrors('failed to compile.', stats.compilation.errors);
      process.exit(1);
    }

    if (stats.compilation.warnings.length) {
      printErrors('compiled with following warnings:', stats.compilation.warnings);
    }

    console.log('Compiled successfully in', (Date.now() - start).toFixed(2), 'ms');

    console.log('File sizes after gzip:');
    console.log();
    printFileSizesAfterBuild(stats, previousFileSizes, paths.buildDir);
    console.log();
  });
}
