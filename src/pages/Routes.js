import React from 'react'
import universal from 'react-universal-component'

const UniversalComponent = (page, path) => {
  if(!path) return universal(import(`./${page}`), {
    onLoad(module, info, props, context) {
      if (module.reducers) {
        context.store.injectReducers(module.reducers)
      }
    }
  })
  return universal(import(`${path}${page}`), {
    onLoad(module, info, props, context) {
      if (module.reducers) {
        context.store.injectReducers(module.reducers)
      }
    }
  })
}

export default [
  {
    component: UniversalComponent('Account'),
    path: '/account',
    routes: [
      {
        component: UniversalComponent('Main', './Account/'),
        path: '/account',
        routes: [
          {
            component: UniversalComponent('CreateDeposit', './Account/Main/'),
            path: '/account',
            exact: true
          },
          {
            component: UniversalComponent('Deposits', './Account/Main/'),
            path: '/account/deposit-list'
          },
          {
            component: UniversalComponent('Charge', './Account/Main/'),
            path: '/account/charge'
          },
          {
            component: UniversalComponent('ChargeHistory', './Account/Main/'),
            path: '/account/charge-history'
          },
          {
            component: UniversalComponent('PayOffRequest', './Account/Main/'),
            path: '/account/create-payoff-request'
          },
          {
            component: UniversalComponent('PayOffHistory', './Account/Main/'),
            path: '/account/payoff-history'
          },
          {
            component: UniversalComponent('PartnerLinks', './Account/Main/'),
            path: '/account/partner-links'
          },
          {
            component: UniversalComponent('PartnerStatistic', './Account/Main/'),
            path: '/account/partner-statistic'
          }
        ]
      }
    ]
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
        component: UniversalComponent('ReferalPage'),
        path: '/ref/:username'
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
        path: '/news',
        exact: true
      },
      {
        component: UniversalComponent('About'),
        path: '/about'
      },
      {
        component: UniversalComponent('HowTo'),
        path: '/how-to-start'
      },
      {
        component: UniversalComponent('ForInvestors'),
        path: '/for-investors'
      },
      {
        component: UniversalComponent('ForPartners'),
        path: '/for-partners'
      },
      {
        component: UniversalComponent('Faq'),
        path: '/faq'
      },
      {
        component: UniversalComponent('Contacts'),
        path: '/contacts'
      },
      {
        component: UniversalComponent('Agreement'),
        path: '/agreement'
      },
      {
        component: UniversalComponent('NewsModal'),
        path: '/news/:slug'
      },
      {
        component: UniversalComponent('PaymentSuccess'),
        path: '/payment-success'
      },
      {
        component: UniversalComponent('PaymentFail'),
        path: '/payment-fail'
      }
    ]
  }
]