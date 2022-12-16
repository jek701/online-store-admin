import {createAsyncThunk} from "@reduxjs/toolkit"
import {OrderItem} from "../../types/Order"

type ReturnedType = OrderItem[]

export const fetchOrderItems = createAsyncThunk<ReturnedType, string>(
    "admin/payment-methods/fetch",
    async (id) => {
        const response = await fetch(`http://127.0.0.1:8787/order/items/${id}`, {
            method: "get",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        })
        return await response.json()
    }
)
