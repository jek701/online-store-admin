import {useGetOrdersQuery} from "../features/order/orderApi"
import React, {useRef, useState} from "react"
import {Button, Input, InputRef, Space, Table, Tag} from "antd"
import {Order} from "../types/Order"
import {FilterConfirmProps} from "antd/es/table/interface"
import {ColumnsType, ColumnType} from "antd/es/table"
import {ArrowRightOutlined, SearchOutlined} from "@ant-design/icons"
import Highlighter from "react-highlight-words"
import {numberFormat} from "../utils/numberFormat"
import {returnStatusColor} from "../utils/returnStatusColor"
import {russianStatus} from "../utils/returnRussianStatus"
import moment from "moment"
import OrderMoreInfoBlock from "../features/order/orderMoreInfoBlock"
import Link from "next/link"

const Index = () => {
    // @ts-ignore
    const {data, isLoading, isSuccess} = useGetOrdersQuery()
    const [orderId, setOrderId] = React.useState<string | undefined>(undefined)

    const [searchText, setSearchText] = useState("")
    const [searchedColumn, setSearchedColumn] = useState("")
    const searchInput = useRef<InputRef>(null)

    type DataIndex = keyof Order;

    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex
    ) => {
        confirm()
        setSearchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
    }

    const handleReset = (clearFilters: () => void) => {
        clearFilters()
        setSearchText("")
    }

    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<Order> => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters, close}) => (
            <div style={{padding: 8}} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{marginBottom: 8, display: "block"}}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{width: 90}}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{width: 90}}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({closeDropdown: false})
                            setSearchText((selectedKeys as string[])[0])
                            setSearchedColumn(dataIndex)
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close()
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{color: filtered ? "#1890ff" : undefined}}/>
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100)
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{backgroundColor: "#ffc069", padding: 0}}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            )
    })

    // Create columns for table
    const columns: ColumnsType<Order> = [
        {
            title: "ID",
            dataIndex: "_id",
            key: "_id"
        },
        {
            title: "????????????????",
            dataIndex: "user_name",
            key: "user_name"
        },
        {
            title: "??????????????",
            dataIndex: "user_number",
            key: "user_number",
            ...getColumnSearchProps("user_number"),
            render: (text) => <p>{numberFormat(text)}</p>
        },
        {
            title: "??????????",
            dataIndex: "delivery_address",
            key: "delivery_address"
        },
        {
            title: "??????????",
            dataIndex: "total_price",
            key: "total_price",
            render: (text) => <span>{text} BYN</span>
        },
        {
            title: "????????????",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                return <Tag color={returnStatusColor(status)}>{russianStatus(status)}</Tag>
            },
            filters: [
                {
                    text: russianStatus("waiting"),
                    value: "waiting"
                },
                {
                    text: russianStatus("readyForDelivery"),
                    value: "readyForDelivery"
                },
                {
                    text: russianStatus("readyForPickup"),
                    value: "readyForPickup"
                },
                {
                    text: russianStatus("delivered"),
                    value: "delivered"
                },
                {
                    text: russianStatus("closed"),
                    value: "closed"
                },
                {
                    text: russianStatus("cancelled"),
                    value: "cancelled"
                }
            ],
            // @ts-ignore
            onFilter: (value: string, record) => record.status === value,
            filterSearch: true

        },
        {
            title: "???????? ????????????????",
            dataIndex: "order_date",
            key: "order_date",
            render: (date) => {
                return moment(date).format("DD.MM.YYYY HH:mm")
            }
        },
        {
            title: "????????????????",
            dataIndex: "actions",
            key: "actions",
            render: (_, record) => {
                return <Button type={"primary"} onClick={() => setOrderId(record._id)}>More</Button>
            }
        }
    ]

    if (isLoading) {
        return <div>
            Loading...
        </div>
    }
    if (isSuccess && data) {
        return <div style={{maxWidth: "1180px", margin: "25px auto"}}>
            <Link style={{color: "#1677ff"}} href={"/product"}>?????????????? ?? ???????????????????????????? ?????????????????? <ArrowRightOutlined /></Link><br/><br/>
            <Table dataSource={data} columns={columns}/>
            {orderId && <OrderMoreInfoBlock setActive={setOrderId} id={orderId}/>}
        </div>
    }
    return <div>
        Error
    </div>
}

export default Index
