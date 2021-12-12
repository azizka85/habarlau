const { transformSync } = require('esbuild');

module.exports = {
  process(src, filename, config, options) {
    const result = transformSync(src, {
      format: 'cjs',
      loader: 'ts'
    });

    return result.code;
  }
};
