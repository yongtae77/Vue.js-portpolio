import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProfileView from '../views/ProfileView.vue'
import MainView from '../views/MainView.vue'
import LocationView from '../views/LocationView.vue'
import ProfileEditView from '../views/ProfileEditView.vue'
import ShopListView from '../views/ShopListView.vue'
import ShopDetailView from '../views/ShopDetailView.vue'
import MenuDetialView from '../views/MenuDetialView.vue'
import WaitingListView from '../views/WaitingListView.vue'
import WaitingDetailView from '../views/WaitingDetailView.vue'
import CartView from '../views/CartView.vue'
import PostView from '../views/PostView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: "/login",
    name: 'login',
    component: LoginView
  },
  {
    path: "/register",
    name: 'register',
    component: RegisterView
  },
  {
    path: "/profile",
    name: 'profile',
    component: ProfileView
  },
  {
    path: "/profileEdit",
    name: 'profileEdit',
    component: ProfileEditView
  },
  {
    path: '/main',
    name: 'main',
    component: MainView
  },
  {
    path: '/location',
    name: 'location',
    component: LocationView
  },
  {
    path: "/shopList",
    name: 'shopList',
    component: ShopListView
  },
  {
    path: '/shopDetail/:id',
    name: 'shopDetail',
    component: ShopDetailView
  },
  {
    path: '/menuDetail/:shopId/:menuId',
    name: 'menuDetail',
    component: MenuDetialView
  },
  {
    path: '/waitingList',
    name: 'waitingList',
    component: WaitingListView
  },
  {
    path: '/waitingDetail',
    name: 'waitingDetail',
    component: WaitingDetailView
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView
  },
  {
    path: '/post/:orderId',
    name: 'post',
    component: PostView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
