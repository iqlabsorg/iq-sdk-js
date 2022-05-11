import { buildConfig, buildPluginsSection } from '../../../rollup.config';
import pkg from './package.json';
import copy from 'rollup-plugin-copy'

const plugins = buildPluginsSection();
plugins.push(
  copy({
    targets: [
      // copy typechain declarations files
      { src: 'src/contracts/*.d.ts', dest: 'dist/cjs' },
      { src: 'src/contracts/*.d.ts', dest: 'dist/esm' },
    ]
  })
);

export default buildConfig({ pkg, plugins });
