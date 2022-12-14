import React, {useEffect} from "react"
import {Button, Form, Input, InputNumber, Select, SelectProps, Switch} from "antd"
import {Product} from "../../types/product"
import jss from "jss"
import preset from "jss-preset-default"
import {useGetProductByIdQuery, useUpdateProductMutation} from "../../features/products/productApi"

interface ChangeProductModalProps {
    active: boolean
    setActive: (active: boolean) => void
    product: Product
    tags: string[]
}

const ChangeProductModal: React.FC<ChangeProductModalProps> = ({product, active, setActive, tags}) => {
    const [form] = Form.useForm()
    // Set form values to current product values

    const {data, isSuccess} = useGetProductByIdQuery(product._id)
    const [updateProduct, {isSuccess: updateSuccess}] = useUpdateProductMutation()

    form.setFieldsValue({
        _id: data?._id,
        name: data?.name,
        description: data?.description,
        price: data?.price,
        salePrice: data?.salePrice,
        manufacturer: data?.manufacturer,
        tags: data?.tags.split(","),
        images: data?.images.split(","),
        created_at: data?.created_at,
        isAvailable: data?.isAvailable === "true"
    })

    const onFinish = (values: Product) => {
        // console.log(values)
        updateProduct(values)
    }

    useEffect(() => {
        if (updateSuccess) {
            setActive(false)
            window.location.reload()
        }
    }, [updateSuccess])

    jss.setup(preset())
    const styles = {
        popUp: {
            position: "fixed",
            top: "50px",
            bottom: "50px",
            overflowY: "scroll",
            left: "50%",
            transform: "translateX(-50%)",
            maxWidth: "500px",
            width: "100%",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            transition: "all 0.3s ease",
            opacity: active ? 1 : 0,
            pointerEvents: active ? "all" : "none",
            // Remove scrollbars
            "&::-webkit-scrollbar": {
                display: "none"
            }
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
            color: "red",
            textAlign: "center"
        },
        title: {
            textAlign: "center",
            marginBottom: "25px"
        }
    }
    const {classes} = jss.createStyleSheet(styles).attach()

    const options: SelectProps["options"] = []
    for (let i = 0; i < tags.length; i++) {
        options.push({
            value: tags[i],
            label: tags[i]
        })
    }

    if (isSuccess) {
        return <>
            <div onClick={() => setActive(false)} className={classes.bg}></div>
            <div className={classes.popUp}>
                <h2 className={classes.title}>
                    ???????????????? ??????????????
                </h2>
                <Form
                    form={form}
                    name="basic"
                    initialValues={{remember: true}}
                    onFinish={(values) => onFinish(values)}
                >
                    <Form.Item
                        label="ID"
                        name="_id"
                    >
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item
                        label="???????????????? ??????????????????"
                        name="name"
                        rules={[{required: true, message: "?????????????? ???????????????? ????????????????", type: "string"}]}
                    >
                        <Input value={data.name} placeholder={"?????????????? ???????????????? ????????????????"}/>
                    </Form.Item>

                    <Form.Item
                        label="???????????????? ????????????????"
                        name="description"
                        rules={[{required: true, message: "?????????????? ???????????????? ????????????????", type: "string"}]}
                    >
                        <Input value={product.description} placeholder={"?????????????? ???????????????? ????????????????"}/>
                    </Form.Item>

                    <Form.Item
                        label="????????"
                        name="price"
                        rules={[{required: true, message: "?????????????? ????????!"}]}
                    >
                        <InputNumber value={data} placeholder={"?????????????? ????????"} controls={false}/>
                    </Form.Item>

                    <Form.Item
                        label="?????????????????? ????????"
                        name="salePrice"
                        rules={[{required: false}]}
                    >
                        <InputNumber placeholder={"?????????????? ?????????????????? ????????"} controls={false}/>
                    </Form.Item>

                    <Form.Item
                        label="??????????????????????????"
                        name="manufacturer"
                        rules={[{required: true, message: "?????????????? ??????????????????????????", type: "string"}]}
                    >
                        <Input placeholder={"?????????????? ??????????????????????????"}/>
                    </Form.Item>

                    <Form.Item
                        label="????????"
                        name="tags"
                        rules={[{required: false, type: "array"}]}
                    >
                        <Select
                            mode="tags"
                            style={{width: "100%"}}
                            placeholder="?????????????? ????????"
                            options={options}
                        />
                    </Form.Item>

                    <Form.Item
                        label="??????????????????????"
                        name="images"
                        rules={[{
                            required: true,
                            message: "?????????????? ???????? ???? ???????? ??????????????????????! ?????????????? ???????????? ???? ??????????????????????",
                            type: "array"
                        }]}
                    >
                        <Select
                            mode="tags"
                            style={{width: "100%"}}
                            placeholder="?????????????? ???????????? ???? ??????????????????????"
                        />
                    </Form.Item>

                    <Form.Item
                        label={"????????????"}
                        name={"created_at"}
                    >
                        <Input disabled/>
                    </Form.Item>

                    <Form.Item
                        label="??????????????????????"
                        name="isAvailable"
                    >
                        <Switch />
                    </Form.Item>

                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    } else {
        return <></>
    }
}

export default ChangeProductModal