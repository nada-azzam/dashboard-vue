const BASE_URL = "https://reqres.in";
const API_URL = BASE_URL + "/api";
const USER = "/users";
const SIGN_IN = "/login";
const SIGN_UP = "/register";
const UNKNOWN = "/unknown";

export default {
    BASE_URL: BASE_URL,
    API_URL: API_URL,
    SIGN_IN_ENDPOINT: API_URL + SIGN_IN,
    SIGN_UP_ENDPOINT: API_URL + SIGN_UP,
    USER_ENDPOINT: API_URL + USER,
    UNKNOWN_ENDPOINT: API_URL + UNKNOWN,

}