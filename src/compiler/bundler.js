const fs = require('fs');
const esbuild = require('esbuild');
const sass = require('sass');

async function build(version, dev) {
  fs.rmSync(`./public/dist/${version}`, {
    recursive: true,
    force: true
  });

  const clientResult = await esbuild.build({
    entryPoints: [
      './src/client/main.ts',
      './src/client/views/layouts/main-layout.ts',
      './src/client/views/pages/home-page.ts',
      './src/client/views/pages/sign-in-page.ts',
      './src/client/views/pages/sign-up-page.ts'
    ],
    outdir: `./public/dist/${version}/js`,
    format: 'esm',
    target: 'esnext',
    bundle: true,
    splitting: true,
    sourcemap: dev,
    minify: !dev
  });
  
  console.log('client - ', clientResult);

  const styles = sass.compile('./src/client/styles/main.scss', {
    style: !dev ? 'compressed' : undefined,
    sourceMap: dev,
    loadPaths: ['node_modules/']
  });

  const dirPath = `./public/dist/${version}/css`;

  fs.mkdirSync(dirPath, {
    recursive: true
  });

  fs.writeFileSync(
    `${dirPath}/main.css`, 
    styles.css, {
      flag: 'w+'
    }
  );

  console.log('styles - compiled');

  fs.rmSync('./dist', {
    recursive: true,
    force: true
  });

  const serverResult = await esbuild.build({
    entryPoints: [
      './src/server/main.ts'
    ],
    outdir: './dist',
    loader: {
      '.hbs': 'text'
    },
    format: 'cjs',
    platform: 'node',
    bundle: true,
    minify: !dev
  });

  console.log('server - ', serverResult);  
}

module.exports = {
  build
};
