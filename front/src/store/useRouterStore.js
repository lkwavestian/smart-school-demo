/*
 * @作者: kerwin
 */
import {defineStore} from 'pinia'
import {ref} from 'vue'
export const useRouterStore = defineStore("router",()=>{
    const isGetterRouter = ref(false)
    function changeRouter(value){
        isGetterRouter.value = value
    }
    return {
        isGetterRouter,
        changeRouter
    }
})