import axios from "axios";

const API_URL = `http://localhost:${5000 || 3000}/api`

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

