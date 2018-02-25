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
    component: UniversalComponent('Account'),
    path: '/account'
  },
  {
    component: UniversalComponent('App'),
    routes: [
      {
        component: UniversalComponent('Home'),
        path: '/',
        exact: true
      },
      {
        component: UniversalComponent('SignIn'),
        path: '/sign-in'
      },
      {
        component: UniversalComponent('SignUp'),
        path: '/sign-up'
      },
      {
        component: UniversalComponent('News'),
        path: '/news'
      }
    ]
  }
]