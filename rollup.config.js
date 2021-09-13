import pkg from '@iqprotocol/eip155/package.json';
import ts from "rollup-plugin-ts";
import del from 'rollup-plugin-delete';
import { builtinModules } from "module";

const external = [
  ...builtinModules,
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.devDependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {})
];

const input = "src/index.ts";
const plugins = [
  del({ targets: 'dist/*' }),
  ts({
    tsconfig: "tsconfig.build.json",
    hook: {
      outputPath: (path, kind) => {
        // by default rollup-plugin-ts would generate d.ts file for each output and create duplicates
        // this is to ensure single declaration file
        if (kind === 'declaration') {
          return pkg.typings;
        }
        if (kind === 'declarationMap') {
          return `${pkg.typings}.map`;
        }
      }
    }
  }),

];

export default {
  input,
  output: [
    {
      file: pkg.module,
      format: "esm",
      sourcemap: true,
    },
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
    }
  ],
  plugins,
  external
};
