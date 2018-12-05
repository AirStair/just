#!/usr/bin/env node

try {
  const localCmd = require.resolve('just-task/lib/cli.js', { paths: [process.cwd()] });
  require(localCmd);
} catch (e) {
  console.error('Please install a local copy of just-task.');
}