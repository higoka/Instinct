import jsx from 'acorn-jsx';
import scss from 'rollup-plugin-scss';
import image from '@rollup/plugin-image';
import themePackage from './package.json';
import commonJS from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import resolveDependencies from '@rollup/plugin-node-resolve';
import blockPeerDependencies from 'rollup-plugin-peer-deps-external';

export default {
  inlineDynamicImports: true,
  preserveModules: false,
  input: "src/index.ts",
  output: [
    {
      file: themePackage.main,
      format: "cjs",
      sourcemap: false,
    },
    {
      file: themePackage.module,
      format: "esm",
      sourcemap: false,
    }
  ],
  acornInjectPlugins: [jsx()],
  plugins: [
    // Prevents peer dependencies from being bundled
    blockPeerDependencies(),

    // Resolves node_module dependencies and bundles them
    resolveDependencies({
      browser: true,
      preferBuiltins: true,
    }),

    // Bundle CSS and SASS files
    scss({
      output: './build/admin.css',
      failOnError: true,
    }),

    // Bundle image files
    image(),

    // Bundle into CommonJS format
    commonJS({
      sourceMap: false,
    }),

    // Transpile and bundle Typescript
    typescript({
      sourceMap: false,
      include: [
        './src/**/*.(ts|tsx)',
        '../frontend/src/**/*.(ts|tsx)',
        '../interface/src/**/*.ts',
        '../interface-rp/src/**/*.ts'
      ],
      jsx: 'preserve',
      declaration: false,
    }),
  ],
  external: id => Object.keys(themePackage.dependencies).includes(id)
};