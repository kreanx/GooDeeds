import React, {useState, useEffect} from "react"
import {Button, Card, Form, Input} from "antd"
import {useNavigate} from "react-router-dom"

function Advertisements() {
    const [advertisements, setAdvertisements] = useState([])
    const [myAdvertisements, setMyAdvertisements] = useState([])
    const [favoriteAdvertisements, setFavoriteAdvertisements] = useState([])
    const loggedInUser = localStorage.getItem("username")
    const [loggedIn, setLoggedIn] = useState(
        localStorage.getItem("isLogged") == "true"
    )
    const navigate = useNavigate()

    useEffect(() => {
        setLoggedIn(localStorage.getItem("isLogged") == "true")
    })

    if (!loggedIn) navigate("/")
    useEffect(() => {
        const storedAdvertisements =
            JSON.parse(localStorage.getItem("advertisements")) || []
        setAdvertisements(storedAdvertisements)

        const storedMyAdvertisements =
            JSON.parse(localStorage.getItem("myAdvertisements")) || []
        setMyAdvertisements(storedMyAdvertisements)

        const storedFavoriteAdvertisements =
            JSON.parse(localStorage.getItem("favoriteAdvertisements")) || []
        setFavoriteAdvertisements(storedFavoriteAdvertisements)
    }, [])

    const addToFavorites = (ad) => {
        const updatedFavorites = [
            ...favoriteAdvertisements,
            {...ad, favoriteUsername: loggedInUser},
        ]
        setFavoriteAdvertisements(updatedFavorites)
        localStorage.setItem(
            "favoriteAdvertisements",
            JSON.stringify(updatedFavorites)
        )
    }

    const removeFromFavorites = (ad) => {
        const updatedFavorites = favoriteAdvertisements.filter(
            (favAd) =>
                favAd.title !== ad.title ||
                favAd.username !== ad.username ||
                favAd.favoriteUsername !== ad.favoriteUsername
        )
        setFavoriteAdvertisements(updatedFavorites)
        localStorage.setItem(
            "favoriteAdvertisements",
            JSON.stringify(updatedFavorites)
        )
    }

    const onFinish = (values) => {
        console.log("Received values:", values)
        const newAdvertisement = {
            title: values.title,
            description: values.description,
            username: loggedInUser,
            isForeign: false,
        }

        setAdvertisements([...advertisements, newAdvertisement])
        localStorage.setItem(
            "advertisements",
            JSON.stringify([...advertisements, newAdvertisement])
        )

        setMyAdvertisements([...myAdvertisements, newAdvertisement])
        localStorage.setItem(
            "myAdvertisements",
            JSON.stringify([...myAdvertisements, newAdvertisement])
        )
    }

    return (
        <div
            style={{
                width: "500px",
                margin: "40px auto 0",
                backgroundColor: "#f5f5f5",
                padding: "20px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                borderRadius: "5px",
            }}
        >
            <h1
                style={{
                    marginBottom: "20px",
                    color: "#1890ff",
                    fontSize: "24px",
                    textAlign: "center",
                }}
            >
                Страница объявлений
            </h1>
            <Form onFinish={onFinish}>
                <Form.Item
                    name="title"
                    label="Заголовок"
                    rules={[
                        {
                            required: true,
                            message: "Введите заголовок объявления",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Описание"
                    rules={[
                        {
                            required: true,
                            message: "Введите описание объявления",
                        },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Опубликовать
                    </Button>
                </Form.Item>
            </Form>

            <h2
                style={{
                    marginBottom: "10px",
                    fontSize: "18px",
                    color: "#1890ff",
                }}
            >
                Список объявлений:
            </h2>
            {advertisements.map((ad, index) => (
                <Card
                    key={index}
                    title={`Заголовок:  ${ad.title}`}
                    style={{
                        marginBottom: "20px",
                        borderRadius: "5px",
                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                        padding: "10px",
                    }}
                >
                    <p>Описание: {ad.description}</p>
                    {ad.username === loggedInUser ? (
                        <span style={{color: "#999999"}}>Свое объявление</span>
                    ) : !favoriteAdvertisements.some(
                          (favAd) =>
                              favAd.title === ad.title &&
                              favAd.username === ad.username &&
                              favAd.favoriteUsername === loggedInUser
                      ) ? (
                        <Button onClick={() => addToFavorites(ad)}>
                            Добавить в избранное
                        </Button>
                    ) : (
                        <>
                            <h2
                                style={{
                                    color: "#1890ff",
                                    fontSize: "14px",
                                    textAlign: "left",
                                }}
                            >
                                Объявление уже в избранном!
                            </h2>
                        </>
                    )}
                </Card>
            ))}
        </div>
    )
}

export default Advertisements
