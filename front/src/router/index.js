import {
    createRouter,
    createWebHashHistory
} from 'vue-router'
import Login from '../views/Login.vue'
import Mainbox from '../views/Mainbox.vue'
import NotFound from '../views/notfound/NotFound.vue'
import routesConfig from './config'
import useRouterStore from '../store/useRouterStore'
import useUserStore from '../store/useUserStore'

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
    const {user} = useUserStore()

    if (to.name === 'login') {
        next()
    } else {
        if (!user.role) {
            next({
                path: '/login'
            })
        } else {
            //动态配置路由
            if(!isGetterRouter) {
                router.removeRoute('mainbox')
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
    router.addRoute({
        path: '/mainbox',
        name:'mainbox',
        component: Mainbox
    })
    routesConfig.forEach(item => {
        checkPermission(item) && router.addRoute('mainbox', item)
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

const checkPermission = ({path}) => {
    const { user } = useUserStore()
    let currentUserRights = user.role.rights
    // console.log('currentUserRights.includes ', currentUserRights.includes(path);
    console.log('currentUserRights.includes', currentUserRights.includes(path))
    return currentUserRights.includes(path)
}

export default router
