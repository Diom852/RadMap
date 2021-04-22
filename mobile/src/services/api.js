import axios from 'axios'

const api = axios.create({
    baseURL:'http://200.0.0.107:5000',
})

export default api;