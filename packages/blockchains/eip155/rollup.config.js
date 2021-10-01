import { buildConfig, buildPluginsSection } from '../../../rollup.config';
import pkg from './package.json';
import copy from 'rollup-plugin-copy'

const plugins = buildPluginsSection(pkg);
plugins.push(
  copy({
    targets: [
      // copy typechain declarations files
      { src: 'src/contracts/*.d.ts', dest: 'dist' },
    ]
  })
);

export default buildConfig({ pkg, plugins });
