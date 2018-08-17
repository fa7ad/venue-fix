const nodeExternals = require('webpack-node-externals')

module.exports = {
  modify (defaultConfig, { target, dev }, webpack) {
    const config = defaultConfig
    config.plugins.push(
      new webpack.ProvidePlugin({
        React: 'react',
        PropTypes: 'prop-types',
        styled: ['styled-components', 'default']
      })
    )

    if (target === 'node') {
      // https://github.com/jaredpalmer/razzle/issues/689#issuecomment-401702873
      config.externals = [
        nodeExternals({
          whitelist: [
            dev ? 'webpack/hot/poll?300' : null,
            /\.(eot|woff|woff2|ttf|otf)$/,
            /\.(svg|png|jpg|jpeg|gif|ico)$/,
            /\.(mp4|mp3|ogg|swf|webp)$/,
            /\.(css|scss|sass|sss|less)$/,
            /react-images-upload/
          ].filter(x => x)
        })
      ]
    }

    return config
  }
}
