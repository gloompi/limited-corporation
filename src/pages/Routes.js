import React from 'react'
import universal from 'react-universal-component'

const UniversalComponent = (page) => universal(import(`./${page}`), {
  onLoad(module, info, props, context) {
    if (module.reducers) {
      context.store.injectReducers(module.reducers)
    }
  }
})

export default [
  {
    component: UniversalComponent('App'),
    routes: [
      {
        component: UniversalComponent('Home'),
        path: '/',
        exact: true
      },
      {
        component: UniversalComponent('News'),
        path: '/news'
      }
    ]
  }
]
