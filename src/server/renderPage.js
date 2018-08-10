function render (prodEnv = false, { assets, styleTags, markup }) {
  return `<!doctype html>
    <html lang="en">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <title>venue-fix</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="//cdnjs.cloudflare.com/ajax/libs/bootswatch/4.1.3/cosmo/bootstrap.min.css" rel="stylesheet" />

        ${assets.client.css ? `<link rel="stylesheet" href="${assets.client.css}">` : ''}
        <script src="${assets.client.js}" defer ${prodEnv ? 'crossorigin' : ''}></script>
        ${styleTags}
    </head>
    <body>
        <div id="root">${markup}</div>
    </body>
</html>`
}

export default render
