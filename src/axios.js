import axios from 'axios';

const instance = axios.create({
    baseURL: "..." // API url (cloud function)
});

export default instance;