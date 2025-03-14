import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
})

export const claimCoupon = async () => {
    try {
        const response = await api.get("/coupons/claim")
        return {
            success: true,
            data: response.data
        }
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || "Error claiming coupon"
        }
    }
}

export const checkAdminApi = async () => {
    try {
        const response = await api.get('/admin/setup/check-admin');
        return {
            success: true,
            data: response.data
        }
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || "Error in checking admin api"
        }
    }
}

export const createAdminApi = async (username, password) => {
    try {
        const response = await api.post("/admin/setup/create-admin",{
            username, 
            password
        })
        return {
            success: true,
            data: response.data
        }
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || "Error in creating admin api"
        }
    }
}

export const loginAdmin = async(username, password) => {
    try {
        const response = await api.post("/admin/login", {
            username,
            password
        })
        return {
            success: true,
            data: response.data
        }
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || "Error in loggin as admin"
        }
    }
}
