/*
 * @作者: kerwin
 */
import {createRouter,createWebHashHistory} from 'vue-router'
import Mainbox from '../views/Mainbox.vue'
import Login from '../views/Login.vue'
import NotFound from '../views/notfound/NotFound.vue'
import RoutesConfig from './config'
import { useRouterStore } from '../store/useRouterStore'
import { useUserStore } from '../store/useUserStore'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const routes = [
    {
        path:"/login",
        name:"login",
        component:Login
    },
    {
        path:"/mainbox",
        name:"mainbox",
        component:Mainbox
    }
]
const router = createRouter({
    history:createWebHashHistory(),
    routes:routes
})
//路由拦截
router.beforeEach((to,from ,next)=>{
    //开始进度条
    NProgress.start();

    const {isGetterRouter,
        } = useRouterStore()
    const {user}  = useUserStore()
    if(to.name==="login"){
        next()
    }else{
        if(!user.role){

            next({
                path:"/login"
            })
        }else{
            //动态配置路由
            if(!isGetterRouter){
                router.removeRoute("mainbox")
                ConfigRouter()
                next({
                    path:to.fullPath
                })
            }else{
                next()
            }
            
        }
    }
   
})

const ConfigRouter = ()=>{
    console.log("导入路由配置")
    const {changeRouter
    } = useRouterStore()

    router.addRoute({
        path:"/mainbox",
        name:"mainbox",
        component:Mainbox
    })

    RoutesConfig.forEach(item=>{
        // console.log(item)
        // 权限匹配() && router.addRoute("mainbox",item)
        checkPermission(item) && router.addRoute("mainbox",item)
    })
    //加重定向
    router.addRoute("mainbox",{
        path:"/",
        redirect:"/index"
    })
    //404匹配
    router.addRoute("mainbox",{
        path:"/:pathMatch(.*)*",
        name:"not found",
        component:NotFound
    })
    //改变状态true
    changeRouter(true)
}

const checkPermission = ({path})=>{
    const {user:{role:{rights}}} = useUserStore()
    // console.log(rights)
    return rights.includes(path)
}

router.afterEach(()=>{
    //结束进度条
    NProgress.done()
})


export default router