const replace = require('@rollup/plugin-replace');

module.exports = {
  // This function will run for each entry/format/env combination
  rollup(config, options) {

    // see: https://github.com/formium/tsdx/issues/981#issuecomment-789920054
    config.plugins = config.plugins.map(p =>
      p.name === 'replace'
        ? replace({
          'process.env.NODE_ENV': JSON.stringify(options.env),
          preventAssignment: true,
        })
        : p
    );

    return config;
  },
};
