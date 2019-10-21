import axios from "axios";

const api = axios.create({
    baseURL: "http://consulta.iconexlog.com.br/soscar"
});

export default api;
