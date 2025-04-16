import axios from 'axios';

//const userInfo = localStorage.getItem('userInfo');


//const notSetTokenLocations = ['/login', '/register', '/confirmation-email', '/'];


//const token = userInfo ? !notSetTokenLocations.includes(location.pathname) ? 'Bearer '+ JSON.parse(userInfo).accessToken : '' : '';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:5173/api',
    // headers: {
    //     Authorization: token
    // }
});