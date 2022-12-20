import React from "react"
import {useGetProductQuery} from "../features/products/productApi"
import ProductsTable from "../components/products/ProductsTable"
import Link from "next/link"
import {ArrowRightOutlined} from "@ant-design/icons"

const Index = ({}) => {
    // @ts-ignore
    const {data, isLoading, isSuccess} = useGetProductQuery()
    return (
        <div style={{maxWidth: "1180px", margin: "25px auto"}}>
            <Link style={{color: "#1677ff"}} href={"/"}>Перейти к заказам <ArrowRightOutlined /></Link><br/><br/>
            <ProductsTable products={data} loading={isLoading} success={isSuccess} />
        </div>
    )
}

export default Index