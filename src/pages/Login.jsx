import React, {useEffect} from "react"
import {Form, Input, Button, message} from "antd"
import {useNavigate, useLocation} from "react-router-dom"

function Login() {
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const location = useLocation()

    const onFinish = (values) => {
        console.log("Received values:", values)
        const username = values.username
        const password = values.password

        // Получение списка пользователей из localStorage
        const storedUsers = JSON.parse(localStorage.getItem("users")) || []

        // Проверка введенных учетных данных
        const authenticatedUser = storedUsers.find(
            (user) => user.username === username && user.password === password
        )

        if (authenticatedUser) {
            // Сохранение информации о входе
            localStorage.setItem("username", username)
            localStorage.setItem("isLogged", "true")

            const {from} = location.state || {from: {pathname: "/"}}
            navigate(from)
        } else {
            message.error("Неверные учетные данные")
        }
    }

    useEffect(() => {
        if (localStorage.getItem("isLogged") === "true") {
            // Пользователь уже авторизован, перенаправление на главную страницу
            navigate("/")
        }
    }, [navigate])

    return (
        <div style={{width: "300px", margin: "0 auto"}}>
            <h1>Страница входа</h1>
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
                        Авторизация
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login
