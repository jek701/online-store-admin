import {createAsyncThunk} from "@reduxjs/toolkit"
import {DOMAIN_API} from "utils/api"

interface CategoryRelationAddType {
    category_id: string
    product_id: string
}

export const categoryRelationAdd = createAsyncThunk<string, CategoryRelationAddType>(
    "admin/category/relation/add",
    async (data) => {
        try {
            const response = await fetch(DOMAIN_API + "/category/relation", {
                method: "post",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            return await response.json()
        } catch (e) {
            // @ts-ignore
            return e.message
        }
    }
)

export default categoryRelationAdd