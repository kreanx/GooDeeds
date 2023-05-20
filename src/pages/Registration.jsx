import React from "react"
import {Form, Input, Button, message} from "antd"

function Registration() {
    const [form] = Form.useForm()

    const onFinish = (values) => {
        console.log("Received values:", values)
        const {username, password} = values

        // Получение списка пользователей из localStorage
        const storedUsers = JSON.parse(localStorage.getItem("users")) || []

        // Проверка, что пользователь с таким именем уже не существует
        const existingUser = storedUsers.find(
            (user) => user.username === username
        )
        if (existingUser) {
            message.error("Пользователь с таким именем уже существует")
            return
        }

        // Добавление нового пользователя в список
        storedUsers.push({username, password})

        // Сохранение списка пользователей в localStorage
        localStorage.setItem("users", JSON.stringify(storedUsers))

        message.success("Регистрация успешно завершена")
    }

    return (
        <div style={{width: "300px", margin: "0 auto"}}>
            <h1>Страница регистрации</h1>
            <Form form={form} onFinish={onFinish}>
                <Form.Item
                    name="username"
                    label="Имя пользователя"
                    rules={[
                        {required: true, message: "Введите имя пользователя"},
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Пароль"
                    rules={[{required: true, message: "Введите пароль"}]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Зарегистрироваться
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Registration
