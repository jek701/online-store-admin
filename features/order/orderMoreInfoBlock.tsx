import React, {useEffect} from "react"
import {useGetOrderByOrderIdQuery} from "./orderApi"
import {createUseStyles} from "react-jss"
import {Button, Descriptions, Dropdown, MenuProps, Popconfirm, Space} from "antd"
import {useDispatch} from "../../store"
import {fetchOrderItems} from "./fetchOrderItems"
import {useGetFeedbackTableFilter} from "./orderSlice"
import {OrderItem} from "../../types/Order"
import moment from "moment"
import {DownOutlined} from "@ant-design/icons"
import {ChangeOrderStatus} from "./changeStatus"
import {numberFormat} from "../../utils/numberFormat"
import {russianStatus} from "../../utils/returnRussianStatus"
import {useRouter} from "next/router"

interface OrderMoreInfoBlockProps {
    id: string
    setActive: (val: string | undefined) => void
}

const OrderMoreInfoBlock: React.FC<OrderMoreInfoBlockProps> = ({id, setActive}) => {
    const {data, isLoading, isSuccess} = useGetOrderByOrderIdQuery(id)
    const dispatch = useDispatch()
    const orderItems = useGetFeedbackTableFilter()
    const router = useRouter()

    useEffect(() => {
        dispatch(fetchOrderItems(id))
    }, [])

    const useStyles = createUseStyles({
        mainWrapper: {
            position: "fixed",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 100
        },
        background: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.2)",
            backdropFilter: "blur(5px)",
            zIndex: 50
        },
        table: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            height: "80%",
            backgroundColor: "white",
            zIndex: 100,
            borderRadius: 28,
            overflowY: "scroll",
            boxShadow: "0 0 25px rgba(0,0,0,0.2)",
            padding: 20,
            "&::-webkit-scrollbar": {
                display: "none"
            }
        }
    })
    const classes = useStyles()

    // @ts-ignore
    const changeStatus = ({status, order_id}) => {
        // @ts-ignore
        dispatch(ChangeOrderStatus({status, order_id}))
        window.location.reload()
    }

    const items: MenuProps["items"] = [
        {
            key: "waiting",
            label: (
                <Popconfirm
                    title="Вы уверены, что хотите изменить статус заказа?"
                    onConfirm={() => changeStatus({status: "waiting", order_id: id})}
                    onCancel={() => console.log("cancel")}
                    okText="Да"
                    cancelText="Нет"
                >
                    <p>{russianStatus("waiting")}</p>
                </Popconfirm>
            )
        },
        {
            key: "cancelled",
            label: (
                <Popconfirm
                    title="Вы уверены, что хотите изменить статус заказа?"
                    onConfirm={() => changeStatus({status: "cancelled", order_id: id})}
                    onCancel={() => console.log("cancel")}
                    okText="Да"
                    cancelText="Нет"
                >
                    <p>{russianStatus("cancelled")}</p>
                </Popconfirm>
            )
        },
        {
            key: "delivered",
            label: (
                <Popconfirm
                    title="Вы уверены, что хотите удалить эту задачу?"
                    onConfirm={() => changeStatus({status: "delivered", order_id: id})}
                    onCancel={() => console.log("cancel")}
                    okText="Да"
                    cancelText="Нет"
                >
                    <p>{russianStatus("delivered")}</p>
                </Popconfirm>
            )
        },
        {
            key: "readyForDelivery",
            label: (
                <Popconfirm
                    title="Вы уверены, что хотите изменить статус заказа?"
                    onConfirm={() => changeStatus({status: "readyForDelivery", order_id: id})}
                    onCancel={() => console.log("cancel")}
                    okText="Да"
                    cancelText="Нет"
                >
                    <p>{russianStatus("readyForDelivery")}</p>
                </Popconfirm>
            )
        },
        {
            key: "readyForPickup",
            label: (
                <Popconfirm
                    title="Вы уверены, что хотите изменить статус заказа?"
                    onConfirm={() => changeStatus({status: "readyForPickup", order_id: id})}
                    okText="Да"
                    cancelText="Нет"
                >
                    <p>{russianStatus("readyForPickup")}</p>
                </Popconfirm>
            )
        },
        {
            key: "closed",
            label: (
                <Popconfirm
                    title="Are you sure to delete this task?"
                    onConfirm={() => changeStatus({status: "closed", order_id: id})}
                    onCancel={() => console.log("cancel")}
                    okText="Да"
                    cancelText="Нет"
                >
                    <p>{russianStatus("closed")}</p>
                </Popconfirm>
            )
        }
    ]

    if (isLoading) {
        return <div className={classes.mainWrapper}>
            Loading...
        </div>
    }
    if (isSuccess && data) {
        return <div className={classes.mainWrapper}>
            <div onClick={() => setActive(undefined)} className={classes.background}></div>
            <div className={classes.table}>
                <Space direction="vertical" size="middle" style={{width: "100%"}}>
                    <Descriptions bordered column={6} layout="vertical" title="Информация о заказе">
                        <Descriptions.Item label="ID">{data._id}</Descriptions.Item>
                        <Descriptions.Item label="Адрес"><Button onClick={() => router.push(`https://yandex.ru/maps/?pt=${data.delivery_address.split(",")[1]},${data.delivery_address.split(",")[0]}&z=18&l=map`)}>Посмотреть на карте</Button></Descriptions.Item>
                        <Descriptions.Item label="Метод оплаты">{data.payment_type}</Descriptions.Item>
                        <Descriptions.Item label="Сумма">{data.total_price} BYN</Descriptions.Item>
                        <Descriptions.Item label="Статус">
                            <Dropdown menu={{items}}>
                                <p>
                                    <Space>
                                        {russianStatus(data.status)}
                                        <DownOutlined/>
                                    </Space>
                                </p>
                            </Dropdown>
                        </Descriptions.Item>
                        <Descriptions.Item
                            label="Дата">{moment(data.order_date).format("DD.MM.YYYY, HH:MM")}</Descriptions.Item>
                    </Descriptions>
                    <Descriptions bordered column={4} layout="vertical" title="Информация о заказчике">
                        <Descriptions.Item label="Имя:">{data.user_name}</Descriptions.Item>
                        <Descriptions.Item label="Номер телефона:">{numberFormat(data.user_number)}</Descriptions.Item>
                        <Descriptions.Item label="Адрес:">{data.delivery_address}</Descriptions.Item>
                    </Descriptions>
                    <h4>Информация о заказанных продуктах</h4>
                    {orderItems && orderItems.orderItems && orderItems.orderItems.map((order: OrderItem) => {
                        return <Descriptions bordered column={4} layout="vertical" key={order.product_id}>
                            <Descriptions.Item label="ID">{order.product_id}</Descriptions.Item>
                            <Descriptions.Item label="Название">{order.name}</Descriptions.Item>
                            <Descriptions.Item label="Количество">{order.quantity.low}</Descriptions.Item>
                            {/*<Descriptions.Item label="Цена">{order.price.low}</Descriptions.Item>*/}
                        </Descriptions>
                    })}
                </Space>
            </div>
        </div>
    }
    return <div>
        Error
    </div>
}

export default OrderMoreInfoBlock