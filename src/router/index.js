import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ViewProduct from '@/components/Admin/ViewProduct'
import AddProduct from '@/components/Admin/AddProduct'
import Profile from '@/components/User/Profile'
import Signup from '@/components/User/Signup'
import Signin from '@/components/User/Signin'
import Product from '@/components/Admin/Product'
import FloorPlans from '@/components/User/FloorPlans'
import Graphs from '@/components/Admin/Graphs'
import ManageUsers from '@/components/Admin/ManageUsers'
import ViewFloorPlans from '@/components/Admin/ViewFloorPlans'
import ConfirmAccount from '@/components/Admin/ConfirmAccount'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/ViewFloorPlans',
      name: 'ViewFloorPlans',
      component: ViewFloorPlans
    },
    {
      path: '/ManageUsers',
      name: 'ManageUsers',
      component: ManageUsers,
      beforeEnter: AuthGuard
    },
    {
      path: '/Graphs',
      name: 'Graphs',
      component: Graphs
    },
    {
      path: '/FloorPlans',
      name: 'FloorPlans',
      component: FloorPlans
    },
    {
      path: '/ConfirmAccount',
      name: 'ConfirmAccount',
      component: ConfirmAccount
    },
    {
      path: '/ViewProduct',
      name: 'ViewProduct',
      component: ViewProduct,
      beforeEnter: AuthGuard
    },
    {
      path: '/AddProduct',
      name: 'AddProduct',
      component: AddProduct,
      beforeEnter: AuthGuard
    },
    {
      path: '/Product/:id',
      name: 'Product',
      props: true,
      component: Product
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    }
  ],
  mode: 'history'
})
