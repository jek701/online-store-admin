import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {Product} from "../../types/product"

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://127.0.0.1:8787"}),
    endpoints: builder => ({
        getProduct: builder.query({
            query: () => "product"
        }),
        getProductById: builder.query({
            query: (id: string) => `product/${id}`
        }),
        // Delete a product
        deleteProduct: builder.mutation({
            query: (id: string) => ({
                url: `product/${id}`,
                method: "DELETE"
            })
        }),
        // Create a product
        createProduct: builder.mutation({
            query: (product: Product) => ({
                url: "product",
                method: "POST",
                body: product
            })
        }),
        // Update a product
        updateProduct: builder.mutation({
            query: (product: Product) => ({
                url: `product/${product._id}`,
                method: "PUT",
                body: product
            })
        })
    })
})

export const {useGetProductQuery, useDeleteProductMutation, useCreateProductMutation, useGetProductByIdQuery, useUpdateProductMutation} = productApi