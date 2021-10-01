import baseConfig from '../../../rollup.config';
import copy from 'rollup-plugin-copy'

baseConfig.plugins.push(
  copy({
    targets: [
      // copy typechain declarations files
      { src: 'src/contracts/*.d.ts', dest: 'dist' },
    ]
  })
);

export default baseConfig;
