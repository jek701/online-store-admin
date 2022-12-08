import React, {useEffect, useState} from "react"
import {Button, Form, Input, InputNumber, Select, SelectProps, Switch} from "antd"
import {Product} from "../../types/product"
import jss from "jss"
import preset from "jss-preset-default"
import {useCreateProductMutation} from "../../features/products/productApi"

interface AddProductModuleProps {
    tags: string[]
    active: boolean
    setActive: (active: boolean) => void
}

const AddProductModule: React.FC<AddProductModuleProps> = ({tags, active, setActive}) => {
    const [form] = Form.useForm()
    const [errorText, setErrorText] = useState(false)
    const [createProduct, {isSuccess}] = useCreateProductMutation()
    form.setFieldValue("created_at", new Date().toString())

    jss.setup(preset())
    const styles = {
        popUp: {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "500px",
            width: "100%",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            transition: "all 0.3s ease",
            opacity: active ? 1 : 0,
            pointerEvents: active ? "all" : "none"
        },
        bg: {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
            backdropFilter: "blur(5px)",
            transition: "all 0.3s ease",
            opacity: active ? 1 : 0,
            pointerEvents: active ? "all" : "none"
        },
        errorText: {
            display: errorText ? "block" : "none",
            color: "red",
            textAlign: "center"
        },
        title: {
            textAlign: "center",
            marginBottom: "25px"
        }
    }
    const {classes} = jss.createStyleSheet(styles).attach()

    const onFinish = async (values: Product) => {
        createProduct({
            _id: values._id,
            name: values.name,
            description: values.description,
            price: values.price,
            salePrice: values.salePrice,
            tags: values.tags,
            images: values.images,
            isAvailable: values.isAvailable,
            manufacturer: values.manufacturer,
            created_at: new Date().toString()
        })
    }

    useEffect(() => {
        if (isSuccess) {
            setActive(false)
            setErrorText(false)
            form.resetFields()
            window.location.reload()
        }
    }, [isSuccess])

    const options: SelectProps["options"] = []
    for (let i = 0; i < tags.length; i++) {
        options.push({
            value: tags[i],
            label: tags[i]
        })
    }

    return <>
        <div onClick={() => setActive(false)} className={classes.bg}></div>
        <div className={classes.popUp}>
            <h2 className={classes.title}>
                Добавить продукт
            </h2>
            <Form
                form={form}
                name="basic"
                initialValues={{remember: true}} onFinish={(values) => onFinish(values)}
            >
                <Form.Item
                    label="Название продукции"
                    name="name"
                    rules={[{required: true, message: "Укажите название продукта", type: "string"}]}
                >
                    <Input placeholder={"Укажите название продукта"}/>
                </Form.Item>

                <Form.Item
                    label="Описание продукта"
                    name="description"
                    rules={[{required: true, message: "Укажите описание продукта", type: "string"}]}
                >
                    <Input placeholder={"Укажите описание продукта"}/>
                </Form.Item>

                <Form.Item
                    label="Цена"
                    name="price"
                    rules={[{required: true, message: "Указать цену!"}]}
                >
                    <InputNumber placeholder={"Укажите цену"} controls={false}/>
                </Form.Item>

                <Form.Item
                    label="Скидочная цена"
                    name="salePrice"
                    rules={[{required: false}]}
                >
                    <InputNumber placeholder={"Укажите скидочную цену"} controls={false}/>
                </Form.Item>

                <Form.Item
                    label="Производитель"
                    name="manufacturer"
                    rules={[{required: true, message: "Укажите производителя", type: "string"}]}
                >
                    <Input placeholder={"Укажите производителя"}/>
                </Form.Item>

                <Form.Item
                    label="Теги"
                    name="tags"
                    rules={[{required: false, type: "array"}]}
                >
                    <Select
                        mode="tags"
                        style={{width: "100%"}}
                        placeholder="Указать теги"
                        options={options}
                    />
                </Form.Item>

                <Form.Item
                    label="Изображения"
                    name="images"
                    rules={[{
                        required: true,
                        message: "Указать хотя бы одно изображение! Укажите ссылку на изображение",
                        type: "array"
                    }]}
                >
                    <Select
                        mode="tags"
                        style={{width: "100%"}}
                        placeholder="Укажите ссылкы на изображения"
                    />
                </Form.Item>

                <Form.Item
                    label="Создан"
                    name="created_at"
                >
                    <Input disabled/>
                </Form.Item>

                <Form.Item
                    label="Доступен"
                    name="isAvailable"
                >
                    <Switch/>
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
                <p className={classes.errorText}>Error, please try again!</p>
            </Form>
        </div>
    </>
}

export default AddProductModule