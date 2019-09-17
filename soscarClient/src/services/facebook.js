import axios from "axios";


const facebook = axios.create({
    baseURL: `https://graph.facebook.com/v4.0`
});
export default facebook;
