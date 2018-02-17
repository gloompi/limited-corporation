import React from 'react'
import universal from 'react-universal-component'
import {Route} from 'react-router-dom'

const UniversalComponent = universal(({ page }) => import(`./${page}`), {
  onLoad(module, info, props, context) {
    if (module.reducers) {
      context.store.injectReducers(module.reducers)
    }
  }
})

export default [
  {
    component: universal(import('./App/index.js')),
    routes: [
      {
        component: universal(import('./Home')),
        path: '/',
        exact: true
      },
      {
        component: universal(import('./News')),
        path: '/news'
      }
    ]
  }
]
