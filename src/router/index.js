import Vue from 'vue'
import Router from 'vue-router'
import header from '@/components/header/header'
import home from '@/components/home/home'
import index from '@/components/index/index'
import investgationService from '@/components/investgationService/investgationService'
import investgationProject from '@/components/investgationProject/investgationProject'
import investgationQuestion from '@/components/investgationQuestion/investgationQuestion'
import integrationCenter from '@/components/integrationCenter/integrationCenter'
import integrationUse from '@/components/integrationUse/integrationUse'
import integrationRule from '@/components/integrationRule/integrationRule'
import integrationQuestion from '@/components/integrationQuestion/integrationQuestion'
import proDetail from '@/components/proDetail/proDetail'
import integrationHistory from '@/components/integrationHistory/integrationHistory'
import aboutUs from '@/components/aboutUs/aboutUs'
import companyIntr from '@/components/companyIntr/companyIntr'
import privacyStatement from '@/components/privacyStatement/privacyStatement'
import feedback from '@/components/feedback/feedback'
import forgetPwd from '@/components/forgetPwd/forgetPwd'
import resetPwd from '@/components/resetPwd/resetPwd'
import resetSuccess from '@/components/resetSuccess/resetSuccess'
import register from '@/components/register/register'
import phoneVerification from '@/components/phoneVerification/phoneVerification'
import perfectInformation from '@/components/perfectInformation/perfectInformation'
import orderSure from '@/components/orderSure/orderSure'
import orderPhysical from '@/components/orderPhysical/orderPhysical'
import orderCash from '@/components/orderCash/orderCash'
import orderPhonepays from '@/components/orderPhonepays/orderPhonepays'
import personalCenter from '@/components/personalCenter/personalCenter'
import basicData from '@/components/basicData/basicData'
import address from '@/components/address/address'
import relatedRecord from '@/components/relatedRecord/relatedRecord'
import joinRecord from '@/components/joinRecord/joinRecord'
import dhRecord from '@/components/dhRecord/dhRecord'
import jfRecord from '@/components/jfRecord/jfRecord'
import personalIndex from '@/components/personalIndex/personalIndex'
import verifyPhone from '@/components/verifyPhone/verifyPhone'
import verifyZyz from '@/components/verifyZyz/verifyZyz'
import editPass from '@/components/editPass/editPass'
import noticeList from '@/components/noticeList/noticeList'
import noticeDetail from '@/components/noticeDetail/noticeDetail'
import welcomeAnser from '@/components/welcomeAnser/welcomeAnser'
//import loginDialog from '@/components/loginDialog/loginDialog'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home,
      children: [{
        path: '/index',
        name: 'index',
        component: index
      },
      {
        path: '/noticeList',
        name: 'noticeList',
        component: noticeList
      },
      {
        path: '/noticeDetail',
        name: 'noticeDetail',
        component: noticeDetail
      },
      {
        path: '/register',
        name: 'register',
        component: register
      },
      {
        path: '/phoneVerification',
        name: 'phoneVerification',
        component: phoneVerification
      },
      {
        path: '/perfectInformation',
        name: 'perfectInformation',
        component: perfectInformation
      },
      {
        path: '/orderPhysical',
        name: 'orderPhysical',
        component: orderPhysical
      },
      {
        path: '/orderCash',
        name: 'orderCash',
        component: orderCash
      },
      {
        path: '/orderPhonepays',
        name: 'orderPhonepays',
        component: orderPhonepays
      },
      {
        path: '/forgetPwd',
        name: 'forgetPwd',
        component: forgetPwd
      },
      {
        path: '/resetPwd',
        name: 'resetPwd',
        component: resetPwd
      },
      {
        path: '/resetSuccess',
        name: 'resetSuccess',
        component: resetSuccess
      },
      {
        path: '/welcomeAnser',
        name: 'welcomeAnser',
        component: welcomeAnser
      },
      {
        path: '/investgationService',
        name: 'investgationService',
        component: investgationService,
        children: [{
          path: '/investgationProject',
          name: 'investgationProject',
          component: investgationProject
        },
        {
          path: '/investgationQuestion',
          name: 'investgationQuestion',
          component: investgationQuestion
        },
        {
          path: '/', redirect: '/investgationProject'
        }]
      },
      {
        path: '/personalCenter',
        name: 'personalCenter',
        component: personalCenter,
        children: [{
          path: '/personalIndex',
          name: 'personalIndex',
          component: personalIndex
        },
        {
          path: '/basicData',
          name: 'basicData',
          component: basicData
        },
        {
          path: '/verifyZyz',
          name: 'verifyZyz',
          component: verifyZyz
        },
        {
          path: '/verifyPhone',
          name: 'verifyPhone',
          component: verifyPhone
        },
        {
          path: '/editPass',
          name: 'editPass',
          component: editPass
        },
        {
          path: '/address',
          name: 'address',
          component: address
        },
        {
          path: '/relatedRecord',
          name: 'relatedRecord',
          component: relatedRecord,
          children:[{
            path: '/joinRecord',
            name: 'joinRecord',
            component: joinRecord
          },
          {
            path: '/dhRecord',
            name: 'dhRecord',
            component: dhRecord
          },
          {
            path: '/jfRecord',
            name: 'jfRecord',
            component: jfRecord
          },
          {
          path: '/', redirect: '/joinRecord'
          }]
        },
        {
          path: '/', redirect: '/personalIndex'
        }]
      },
      {
        path: '/integrationCenter',
        name: 'integrationCenter',
        component: integrationCenter,
        children: [{
          path: '/integrationUse',
          name: 'integrationUse',
          component: integrationUse
        },
        {
          path: '/integrationRule',
          name: 'integrationRule',
          component: integrationRule
        },
        {
          path: '/integrationQuestion',
          name: 'integrationQuestion',
          component: integrationQuestion
        },
        {
          path: '/proDetail',
          name: 'proDetail',
          component: proDetail
        },
        {
          path: '/integrationHistory',
          name: 'integrationHistory',
          component: integrationHistory
        },
        {
          path: '/', redirect: '/integrationUse'
        }]
      },
      {
        path: '/aboutUs',
        name: 'aboutUs',
        component: aboutUs,
        children: [{
          path: '/companyIntr',
          name: 'companyIntr',
          component: companyIntr
        },
        {
          path: '/privacyStatement',
          name: 'privacyStatement',
          component: privacyStatement
        },
        {
          path: '/feedback',
          name: 'feedback',
          component: feedback
        },
        {
          path: '/', redirect: '/companyIntr'
        }]
      },
      {
        path: '/', redirect: '/index'
      }]
    },
    {
      path: '/header',
      name: 'header',
      component: header
    },
    {
      path: '/', redirect: '/home'
    }
  ]
})
