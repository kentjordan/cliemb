import axios from "axios";
import { jwtDecode } from "jwt-decode";
const customAxios = axios.create({ baseURL: `${process.env.protocol}://${process.env.rest_hostname}` })

function isJWTExpired(jwt_exp: number) {
    return jwt_exp <= Math.ceil(Date.now() / 1000)
}

customAxios.interceptors.request.use(async (value) => {

    const access_token = value.headers['Authorization']?.toString().split(' ').at(1);

    // Validate if AT is expired, if so, then refresh the token
    if (access_token) {

        const decodedToken = jwtDecode(access_token);

        // If a valid decoded token and jwt is expired, then refresh the token:
        if (decodedToken.exp !== undefined && isJWTExpired(decodedToken.exp)) {

            const res = await customAxios.get('auth/refresh', { withCredentials: true });

            // Replace the old ones to a new access token before sending to the auth'd routes
            value.headers.Authorization = `Bearer ${res.data.access_token}`;

        }

    }

    return value;
}, (error) => {
    return error;
})

export default customAxios;