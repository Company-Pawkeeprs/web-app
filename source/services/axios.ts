import axios from "axios";
import { getCookie } from "~/utils/cookies-utils";

export function getAPIClient(ctx?: any) {
    const token = getCookie('pawkeepr.token', ctx)

    const api = axios.create({
        baseURL: process.env.API_URL,
    })

    api.defaults.headers['Content-Type'] = 'application/json';

    if (token) {
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
    }

    return api;
}