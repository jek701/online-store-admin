import {createAsyncThunk} from "@reduxjs/toolkit"
import {Product} from "../../types/product"

type ReturnedType = Product

export const RemoveProduct = createAsyncThunk<ReturnedType, string>(
    "removeProduct",
    async (id) => {
        try {
            const response = await fetch( `http://127.0.0.1:8787/product/${id}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }
            })
            if (response.ok) return await response.json()
            else return response.text()
        } catch (e) {
            if (e instanceof Error) return e.message
        }
    }
)

export default RemoveProduct