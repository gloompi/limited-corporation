import React from 'react'
import universal from 'react-universal-component'

const UniversalComponent = (page) => universal(import(`./${page}`), {
  onLoad(module, info, props, context) {
    if (module.reducers) {
      context.store.injectReducers(module.reducers)
    }
  }
})

requireAuth = (nextState, replaceState) => {
  if (!auth.loggedIn())
    replaceState({ nextPathname: nextState.location.pathname }, '/sign-in')
}

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
        component: UniversalComponent('Account'),
        path: '/account',
        onEnter: requireAuth
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