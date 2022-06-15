import axios from 'axios';
const instance = axios.create({
    baseURL: '/api',
    timeout: 1000,
  });
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    console.log(config,'config')
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

export default axios