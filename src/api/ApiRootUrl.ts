import axios from "axios";

const local = "http://localhost:8081/api/v1/"

const api = axios.create({
    baseURL: local
});

export default api;