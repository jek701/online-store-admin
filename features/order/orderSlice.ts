import {createEntityAdapter, createSlice} from "@reduxjs/toolkit"
import {fetchOrderItems} from "./fetchOrderItems"
import {OrderItem} from "../../types/Order"
import {StoreState} from "../../store"
import {useSelector} from "react-redux"

export const OrderItemsAdapter = createEntityAdapter()

export interface StateProps {
    loading: boolean;
    orderItems: OrderItem[] | null;
}

const initialState = OrderItemsAdapter.getInitialState<StateProps>({
    loading: false,
    orderItems: null
})

const orderItemsSlice = createSlice({
    name: "order-items",
    initialState,
    reducers: {},
    extraReducers: builder => {
        // Получить список отзывов
        builder.addCase(fetchOrderItems.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchOrderItems.fulfilled, (state, action) => {
            state.loading = false
            state.orderItems = action.payload
        })
        builder.addCase(fetchOrderItems.rejected, state => {
            state.loading = false
        })
    }
})

export default orderItemsSlice.reducer

export const useGetFeedbackTableFilter = () => useSelector((state: StoreState) => state.orderItems)