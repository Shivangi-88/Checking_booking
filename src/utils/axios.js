import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000', // Backend base URL
});

export default instance;
