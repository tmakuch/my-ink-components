import * as esbuild from 'esbuild';
import { execSync } from 'child_process';
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = join(__dirname, 'dist');
const isWin = process.platform === 'win32';
const appName = 'terminal';
const exe = isWin ? `${appName}.exe` : appName;
const outExe = join(dist, exe);

if (existsSync(dist)) rmSync(dist, { recursive: true });
mkdirSync(dist);

// react-devtools-core is an optional ink dep used only in dev mode
const stubOptionalModules = {
  name: 'stub-optional',
  setup(build) {
    build.onResolve({ filter: /react-devtools-core/ }, () => ({
      path: 'react-devtools-core',
      namespace: 'stub',
    }));
    build.onLoad({ filter: /.*/, namespace: 'stub' }, () => ({
      contents: 'export default {}; export const connectToDevTools = () => {};',
      loader: 'js',
    }));
  },
};

console.log('\n> Bundle with esbuild');
await esbuild.build({
  entryPoints: ['index.jsx'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  jsx: 'automatic',
  minify: true,
  plugins: [stubOptionalModules],
  banner: {
    js: `import { createRequire } from 'module';\nconst require = createRequire(process.execPath);\n`,
  },
  outfile: join(dist, 'bundle.mjs'),
});

console.log('\n> Wrap ESM bundle in CJS shell');
const esmContent = readFileSync(join(dist, 'bundle.mjs'), 'utf8');
const base64 = Buffer.from(esmContent).toString('base64');
const cjsShell = `"use strict";
import("data:text/javascript;base64,${base64}").catch(e => {
  process.stderr.write(String(e) + "\\n");
  process.exit(1);
});
`;
writeFileSync(join(dist, 'bundle.cjs'), cjsShell);


writeFileSync(
  join(dist, 'sea-config.json'),
  JSON.stringify({
    main: 'dist/bundle.cjs',
    output: 'dist/sea-prep.blob',
    disableExperimentalSEAWarning: true,
  }, null, 2)
);

console.log('\n> Generate SEA blob');
execSync('node --experimental-sea-config dist/sea-config.json', { stdio: 'inherit' });

console.log(`\n> Copy node binary → dist/${exe}`);
copyFileSync(process.execPath, outExe);

console.log(`\n> Inject blob into ${exe}`);
const FUSE = 'NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2';
const postject = join(__dirname, 'node_modules', '.bin', isWin ? 'postject.cmd' : 'postject');
execSync(
  `"${postject}" "${outExe}" NODE_SEA_BLOB dist/sea-prep.blob --sentinel-fuse ${FUSE}`,
  { stdio: 'inherit' }
);

console.log(`\nDone — dist/${exe}`);
