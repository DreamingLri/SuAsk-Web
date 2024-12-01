import axios from 'axios'

const request = axios.create({
    baseURL: 'http://localhost:8080', // 默认向 8080 端口发送请求
    timeout: 5000,
})

// request.interceptors.request.use(
//     (config) => {
//         // 从 localStorage 中获取 JWT
//         const token = localStorage.getItem('jwt');
//         if (token) {
//             // 将 token 添加到 Authorization 头部
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// request.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     async (error) => {
//         const originalRequest = error.config;
//         if (error.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;
//             try {
//                 const refreshToken = localStorage.getItem('refreshToken');
//                 if (refreshToken) {
//                     // 发送请求刷新 token
//                     const res = await axios.post('http://localhost:8080/refresh', {
//                         refreshToken: refreshToken,
//                     });
//                     if (res.status === 200) {
//                         // 将新的 token 和 refreshToken 保存到 localStorage 中
//                         localStorage.setItem('jwt', res.data.jwt);
//                         localStorage.setItem('refreshToken', res.data.refreshToken);
//                         // 将原始请求重新发送
//                         return request(originalRequest);
//                     }
//                 }
//             } catch (refreshError) {
//                 console.log('刷新 token 失败', refreshError);
//                 // 刷新 token 失败，跳转到登录页面
//                 window.location.href = '/login';
//             }
//         }
//         return Promise.reject(error);
//     }
// )


export default request
