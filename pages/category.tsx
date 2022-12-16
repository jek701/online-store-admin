import React from "react"
import {useGetCategoryQuery} from "../features/categories/categoryApi"
import CategoryTable from "../components/category/CategoryTable"

const Index = ({}) => {
    // @ts-ignore
    const {data, isLoading, isSuccess} = useGetCategoryQuery()
    return <CategoryTable categories={data} loading={isLoading} success={isSuccess}/>
}

export default Index