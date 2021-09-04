import path from "path";
import pkg from '@iqprotocol/eip155/package.json';
import ts from "rollup-plugin-ts";
import del from 'rollup-plugin-delete';

const external = (id) => !id.startsWith('.') && !path.isAbsolute(id);

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
      }
    }
  })
];

export default {
  input,
  output: [
    {
      file: pkg.module,
      format: "esm",
    },
    {
      file: pkg.main,
      format: "cjs",
    }
  ],
  plugins,
  external
};
