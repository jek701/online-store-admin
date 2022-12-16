import {createAsyncThunk} from "@reduxjs/toolkit"

export const getProductCategory = createAsyncThunk<string, string>(
    "admin/product/category",
    async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8787/product/category/${id}`, {
                method: "get",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            })
            return await response.json()
        } catch (e) {
            // @ts-ignore
            return e.message
        }
    }
)

export default getProductCategory