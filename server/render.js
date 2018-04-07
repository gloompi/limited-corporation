import React from 'react'
import { renderToString } from 'react-dom/server'
import { flushChunkNames } from 'react-universal-component/server'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { Helmet } from 'react-helmet'
import flushChunks from 'webpack-flush-chunks'
import serialize from 'serialize-javascript'
import PropTypes from 'prop-types'

import Routes from '../src/pages/Routes'
import configureStore from '../src/configureStore'

export default ({ clientStats }) => (req, res) => {
  const store = configureStore()
  const initialState = store.getState()
  const context = {}
  const app = renderToString(
    <Provider store={ store }>
      <StaticRouter location={ req.path } context={ context }>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>
  )
  const chunkNames = flushChunkNames()
  const helmet = Helmet.renderStatic()

  const {
    js,
    styles,
    cssHash,
    scripts,
    stylesheets
  } = flushChunks(clientStats, { chunkNames })

  console.log('PATH', req.path)
  console.log('DYNAMIC CHUNK NAMES RENDERED', chunkNames)
  console.log('SCRIPTS SERVED', scripts)
  console.log('STYLESHEETS SERVED', stylesheets)

  if(context.url) {
    return res.send(301, context.url)
  }
  res.send(
    `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
          ${styles}
          <meta name="theme-color" content="#ffffff">
          <!--Start of Zendesk Chat Script-->
          <script type="text/javascript">
          window.$zopim||(function(d,s){var z=$zopim=function(c){z._.push(c)},$=z.s=
          d.createElement(s),e=d.getElementsByTagName(s)[0];z.set=function(o){z.set.
          _.push(o)};z._=[];z.set._=[];$.async=!0;$.setAttribute("charset","utf-8");
          $.src="https://v2.zopim.com/?5bWBygUl0Ee8vHr55QhWuX7ScZnMSMgl";z.t=+new Date;$.
          type="text/javascript";e.parentNode.insertBefore($,e)})(document,"script");
          </script>
          <!--End of Zendesk Chat Script-->
        </head>
        <body>
          <script>
            window.__INITIAL_STATE__ = ${initialState}
          </script>
          <div id="root">${app}</div>
          ${cssHash}
          ${js}
        </body>
      </html>`
  )
}