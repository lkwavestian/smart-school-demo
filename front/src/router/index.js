import {
    createRouter,
    createWebHashHistory
} from 'vue-router'
import Login from '../views/Login.vue'
import Mainbox from '../views/Mainbox.vue'
import NotFound from '../views/notfound/NotFound.vue'
import routesConfig from './config'
import { useRouterStore } from '../src/store/useRouterStore'

const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/mainbox',
        name:'mainbox',
        component: Mainbox
    }
]


const router = createRouter({
    history: createWebHashHistory(),
    routes
})

//路由拦截
router.beforeEach((to, from, next) => {

    const {isGetterRouter} = useRouterStore()

    if (to.name === 'login') {
        next()
    } else {
        if (!localStorage.getItem('token')) {
            next({
                path: '/login'
            })
        } else {
            //动态配置路由
            if(!isGetterRouter) {
                configRoute()
                next({
                    path: to.fullPath
                })
            }
           else {
                next()
           }
        }
    }
})

const configRoute = () => {
    const {changeRouter} = useRouterStore()
    routesConfig.forEach(item => {
        // console.log('item :>> ', item);
        router.addRoute('mainbox', item)
    });

    //加重定向
    router.addRoute('mainbox', {
        path: '/',
        redirect: '/index'
    })

    //404
    router.addRoute('mainbox', {
        path: '/:pathMath(.*)*',
        name: 'not found',
        component: NotFound
    })

    changeRouter(true)
}

export default router
