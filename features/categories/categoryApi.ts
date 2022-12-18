import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {Category} from "types/product"

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://127.0.0.1:8787"}),
    endpoints: builder => ({
        getCategory: builder.query({
            query: () => "category"
        }),
        getCategoryById: builder.query({
            query: (id: string) => `category/${id}`
        }),
        // Delete a category
        deleteCategory: builder.mutation({
            query: (id: string) => ({
                url: `category/${id}`,
                method: "DELETE"
            })
        }),
        // Create a category
        createCategory: builder.mutation({
            query: (category: Category) => ({
                url: "category",
                method: "POST",
                body: category
            })
        }),
        // Update a category
        updateCategory: builder.mutation({
            query: (category: Category) => ({
                url: `category/${category._id}`,
                method: "PUT",
                body: category
            })
        }),
        // Get related product
        getRelatedProducts: builder.query({
            query: (id: string) => `category/relation/${id}`
        })
    })
})

export const {
    useGetCategoryQuery,
    useGetCategoryByIdQuery,
    useDeleteCategoryMutation,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useGetRelatedProductsQuery
} = categoryApi