import {combineReducers, configureStore} from "@reduxjs/toolkit"
import {useDispatch as useStoreDispatch} from "react-redux"
import {productApi} from "./features/products/productApi"
import {categoryApi} from "./features/categories/categoryApi"
import {orderApi} from "./features/order/orderApi"
import orderItems from "features/order/orderSlice"

// Список reducers
export const reducer = combineReducers({
    orderItems,
    [productApi.reducerPath]: productApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer
})
// Типизация state
export type StoreState = ReturnType<typeof reducer>
// Типизация dispatch
export type AppDispatch = typeof store.dispatch

// Типизация App Thunk
export interface AppThunkProps {
    dispatch: AppDispatch;
    state: StoreState;
    extra?: unknown;
    rejectValue?: unknown;
}

// Настройка dispatch
export const useDispatch = () => useStoreDispatch<AppDispatch>()
// Настройка store
export const store = configureStore({
    reducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({immutableCheck: false}).concat(productApi.middleware, categoryApi.middleware, orderApi.middleware)
})
