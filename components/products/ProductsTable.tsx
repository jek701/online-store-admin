import React, {useEffect} from "react"
import {Button, Col, Popconfirm, Row, Table, TableProps, Tag} from "antd"
import {Product} from "types/product"
import {ColumnsType} from "antd/es/table"
import AddProductModule from "./AddProductModule"
import {useDeleteProductMutation} from "../../features/products/productApi"
import ChangeProductModal from "./ChangeProductInfoModule"
import moment from "moment"

interface IndexProps {
    products: Product[]
    loading: boolean
    success: boolean
}

const Index: React.FC<IndexProps> = ({products, loading, success}) => {
    const [active, setActive] = React.useState(false)
    const [updateActive, setUpdateActive] = React.useState(false)
    const [chosenProduct, setChosenProduct] = React.useState<Product | null>(null)
    const [removeProduct, {isSuccess}] = useDeleteProductMutation()

    useEffect(() => {
        if (isSuccess) {
            window.location.reload()
        }
    }, [isSuccess])

    const removeDuplicates = (arr: string[]) => {
        return arr.filter((item, index) => arr.indexOf(item) === index)
    }

    const deleteProduct = (value: Product) => {
        removeProduct(value._id)
    }

    if (loading) {
        return <div>
            Loading...
        </div>
    }

    if (success && products) {
        // Get all possible tags from data and create an array of unique tags
        const tags = products.map((i: Product) => i.tags).join().split(",")

        const columns: ColumnsType<Product> = [
            {
                title: "ID",
                dataIndex: "_id",
                key: "_id",
                fixed: "left"
            },
            {
                title: "Название",
                dataIndex: "name",
                key: "name",
                ellipsis: true
            },
            {
                title: "Описание",
                dataIndex: "description",
                key: "description",
                ellipsis: true
            },
            {
                title: "Цена",
                dataIndex: "price",
                key: "price",
                render: (price: string) => {
                    return price !== "undefined" ? price + " BYN" : "-"
                }
            },
            {
                title: "Скидочная цена",
                dataIndex: "salePrice",
                key: "salePrice",
                render: (salePrice: string) => {
                    return salePrice !== "undefined" ? salePrice + " BYN" : "-"
                }
            },
            {
                title: "Доступность",
                dataIndex: "isAvailable",
                key: "isAvailable",
                filters: [
                    {
                        text: "Доступен",
                        value: true
                    },
                    {
                        text: "Недоступен",
                        value: false
                    }
                ],
                // @ts-ignore
                onFilter: (value: boolean, record) => record.isAvailable === value, filterSearch: true,
                render: (isAvailable: boolean) => {
                    return isAvailable ? <Tag color={"green"}>Доступен</Tag> : <Tag color={"red"}>Недоступен</Tag>
                }
            },
            {
                title: "Теги",
                dataIndex: "tags",
                key: "tags",
                filters: removeDuplicates(tags)?.map((i: string) => ({text: i, value: i})),
                // @ts-ignore
                onFilter: (value: string, record) => record.tags.includes(value), filterSearch: true,
                render: (_, {tags}) => (
                    <>
                        {tags?.split(",").map((tag: string) => {
                            return (
                                <Tag
                                    style={{margin: "2px"}}
                                    key={tag}
                                    color={"lightgrey"}
                                >
                                    {tag.toUpperCase()}
                                </Tag>
                            )
                        })}
                    </>
                ),
                ellipsis: true
            },
            {
                title: "Создан",
                dataIndex: "created_at",
                key: "created_at",
                render: (created_at: string) => {
                    return moment(created_at).format("DD.MM.YYYY HH:mm")
                }
            },
            {
                title: "Обновлен",
                dataIndex: "updated_at",
                key: "updated_at",
                render: (updated_at: string) => {
                    return moment(updated_at).format("DD.MM.YYYY HH:mm")
                }
            },
            {
                title: "Action",
                key: "operation",
                fixed: "right",
                width: 100,
                render: (value: Product) => {
                    return (
                        <div>
                            <Popconfirm title={"Вы уверены?"} onConfirm={() => deleteProduct(value)}>
                                <Button
                                    style={{padding: "5px"}}
                                    type={"primary"}
                                    danger
                                >
                                    Удалить
                                </Button>
                            </Popconfirm>
                            <Button
                                onClick={() => {
                                    setChosenProduct(value)
                                    setUpdateActive(true)
                                }}
                                style={{marginTop: "10px", padding: "5px"}}
                                type={"primary"}
                            >
                                Изменить
                            </Button>
                        </div>
                    )
                }
            }
        ]

        const onChange: TableProps<Product>["onChange"] = (pagination, filters, sorter, extra) => {
            console.log("params", pagination, filters, sorter, extra)
        }

        return <>
            <Row>
                <Col>
                    <Table
                        scroll={{x: 1300}}
                        dataSource={products}
                        columns={columns}
                        onChange={onChange}
                    />
                    <Button style={{position: "absolute", right: 0, bottom: "-30px", width: "max-content"}} block={true}
                            onClick={() => setActive(true)}>Добавить продукт</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <AddProductModule setActive={setActive} active={active} tags={removeDuplicates(tags)}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    {chosenProduct && <ChangeProductModal setActive={setUpdateActive} active={updateActive}
                                                          tags={removeDuplicates(tags)} product={chosenProduct}/>}
                </Col>
            </Row>
            <br/>
            <br/>
        </>
    } else {
        return <div>
            Error
        </div>
    }
}

export default Index