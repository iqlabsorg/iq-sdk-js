import ts from "rollup-plugin-ts";
import del from 'rollup-plugin-delete';
import { terser } from "rollup-plugin-terser";
import { builtinModules } from "module";

const isProd = process.env.BUILD === 'production';
if (isProd) console.info("Building for production!")

export const buildExternalSection = (pkg) => [
  ...builtinModules,
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.devDependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {})
];

export const buildPluginsSection = (pkg) => [
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
  isProd && terser()
]

export const buildOutputSection = (pkg) => {
  return [
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
  ]
}

export const buildConfig = ({ pkg, input, output, plugins, external }) => {
  return {
    input: input ?? "src/index.ts",
    output: output ?? buildOutputSection(pkg),
    plugins: plugins ?? buildPluginsSection(pkg),
    external: external ?? buildExternalSection(pkg)
  }
}
