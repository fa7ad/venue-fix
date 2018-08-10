module.exports = {
  modify (defaultConfig, { target, dev }, webpack) {
    const config = defaultConfig
    config.plugins.push(new webpack.ProvidePlugin({
      React: 'react',
      PropTypes: 'prop-types',
      styled: 'styled-components'
    }))
    return config
  }
}
