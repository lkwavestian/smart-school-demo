/*
 * @作者: kerwin
 */
import axios from 'axios'
import { ElLoading } from 'element-plus'
let loadingInstance = null
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    // console.log("请求发出之前")
    loadingInstance = ElLoading.service({ fullscreen: true })

    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    loadingInstance.close()


    const {authorization} = response.headers
    authorization && localStorage.setItem("token",authorization)
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    loadingInstance.close()
    const  {status} = error.response
    if(status === 401){
        localStorage.removeItem("token")
        window.location.href="#/login"
    } 
    return Promise.reject(error);
  });
