import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Shopcar = () => import('../views/shopcar/Shopcar')
const Center = () => import('../views/center/Center')
const Detail = () => import('../views/detail/Detail')
//1.安装插件
Vue.use(VueRouter)

//2.创建路由对象
const routes = [
  {
    path:'',
    redirect: './home'
  },
  {
    path:'/home',
    component: Home
  },
  {
    path:'/category',
    component: Category
  },
  {
    path:'/shopcar',
    component: Shopcar
  },
  {
    path:'/center',
    component: Center
  },
  {
    path:'/detail/:iid',
    component: Detail
  }
]
const router = new VueRouter({
  routes,
  mode:'history'
})

export default router