const { transformSync } = require('esbuild');

module.exports = {
  process(src, filename, config, options) {
    const result = transformSync(src, {
      format: 'cjs',
      loader: 'ts',
      sourcemap: true,
      sourcefile: filename,
      sourcesContent: false
    });

    return {
      code: result.code,
      map: result.map
    };
  }
};
