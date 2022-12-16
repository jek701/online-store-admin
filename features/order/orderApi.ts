import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {Order} from "../../types/Order"

export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://127.0.0.1:8787"}),
    endpoints: builder => ({
        getOrders: builder.query<Order[], string>({
            query: () => "order"
        }),
        getOrderByOrderId: builder.query<Order, string>({
            query: (id: string) => `order/byorder/${id}`
        }),
        getAllOrderedProducts: builder.query({
            query: (id: string) => `order/items/${id}`
        }),
        getOrderByUserId: builder.query({
            query: (id: string) => `order/byuser/${id}`
        })
    })
})

export const {
    useGetOrdersQuery,
    useGetOrderByOrderIdQuery,
    useGetAllOrderedProductsQuery,
    useGetOrderByUserIdQuery
} = orderApi