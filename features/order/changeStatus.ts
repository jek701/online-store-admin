import {createAsyncThunk} from "@reduxjs/toolkit"
import {OrderItem} from "../../types/Order"

type ReturnedType = OrderItem[]

interface ArgProps {
    status: string
    order_id: string
}

export const ChangeOrderStatus = createAsyncThunk<ReturnedType, ArgProps>(
    "admin/changeOrderStatus",
    async (data) => {
        const response = await fetch(`http://127.0.0.1:8787/order/status`, {
            method: "put",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        return await response.json()
    }
)
