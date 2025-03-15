import axios from "axios";

const API_URL = ${import.meta.env.VITE_API_URL};

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
})

export const claimCoupon = async () => {
    try {
        const response = await api.get("/api/coupons/claim")
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

export const getAllCouponsApi = async () => {
    try {
        const response = await api.get("/api/admin/coupons")
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
        const response = await api.get('/api/admin/setup/check-admin');
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
        const response = await api.post("/api/admin/setup/create-admin",{
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
        const response = await api.post("/api/admin/login", {
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

export const addCoupon = async(newCoupon) => {
    try {
        const response = await api.post("/api/admin/coupons", newCoupon)
        return {
            success: true,
            data: response.data
        }
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || "Error in adding coupon"
        }
    }
}

export const updateCouponApi = async(newCoupon, id) => {
    try {
        const response = await api.put(`/api/admin/coupons/${id}`, newCoupon)
        return {
            success: true,
            data: response.data
        }
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || "Error in updating coupon"
        }
    }
}

export const deleteCouponApi = async(id) => {
    try {
        const response = await api.delete(`/api/admin/coupons/${id}`)
        return {
            success: true,
            data: response.data
        }
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || "Error in updating coupon"
        }
    }
}

export const getClaimLogsApi = async () => {
    try {
        const response = await api.get("/api/admin/claims")
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