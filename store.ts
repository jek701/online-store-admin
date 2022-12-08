import {configureStore, combineReducers} from "@reduxjs/toolkit"
import {useDispatch as useStoreDispatch} from "react-redux"
import {productApi} from "./features/products/productApi"

// Список reducers
export const reducer = combineReducers({
    [productApi.reducerPath]: productApi.reducer,
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
        getDefaultMiddleware({immutableCheck: false}).concat(productApi.middleware)
})
