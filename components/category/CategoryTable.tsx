import React, {useState} from "react"
import {Category} from "../../types/product"
import {Col, Modal, Row, Table} from "antd"

interface CategoryTableProps {
    categories: Category[]
    loading: boolean
    success: boolean
}

const CategoryTable: React.FC<CategoryTableProps> = ({categories, success, loading}) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleOk = () => {
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }
    const columns = [
        {
            title: "ID",
            dataIndex: "_id",
            key: "_id"
        },
        {
            title: "Название",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Действия",
            dataIndex: "actions",
            key: "actions",
            render: () => (
                <span>
                    <a onClick={() => {
                        showModal()
                    }}>
                        Подробнее
                    </a>
                </span>
            )
        }
    ]

    if (loading) {
        return <div>
            Loading...
        </div>
    }
    if (success && categories) {
        return <>
            <Row style={{display: "flex", alignItems: "center", justifyContent: "center", padding: "25px"}}>
                <Col span={22}>
                    <Table dataSource={categories} columns={columns} pagination={false}/>
                </Col>
            </Row>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

            </Modal>
        </>
    }
    return <div>
        No data
    </div>
}

export default CategoryTable