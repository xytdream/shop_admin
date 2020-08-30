import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../layout/home.vue'
import Login from '../components/login.vue'
import Welcome from '../components/welcome.vue'
import Users from '../views/user/users.vue'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome',name: 'welcome', component: Welcome },
      { path: '/users',name: 'users', component: Users }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 挂在路由导航守卫
router.beforeEach((to,from,next) =>{
  //如果用户访问的是login页面，直接放行
  if(to.path === '/login') return next()
  //获取token
  const tokenStr = window.sessionStorage.getItem('token')
  //如果token不存在，强制跳转至login页面
  if(!tokenStr) return next('/login')

  //token存在,直接放行
  next()

})

export default router
