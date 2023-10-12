import Axios from 'axios';
import SyncStorage from 'sync-storage';

const axios = Axios.create({
    headers: { "Content-Type": "application/json", 'Bypass-Tunnel-Reminder': '121' },
})

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    const token = SyncStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

export default axios