import React from "react"
import {useGetProductQuery} from "../features/products/productApi"
import ProductsTable from "../components/products/ProductsTable"

const Index = ({}) => {
    // @ts-ignore
    const {data, isLoading, isSuccess} = useGetProductQuery()
    return <ProductsTable products={data} loading={isLoading} success={isSuccess} />
}

export default Index